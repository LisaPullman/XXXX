#!/bin/bash

# 监控系统部署脚本
# 部署Prometheus、Grafana、AlertManager等监控组件

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置
MONITORING_COMPOSE_FILE="docker-compose.monitoring.yml"
GRAFANA_PASSWORD="${GRAFANA_PASSWORD:-admin123}"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查依赖..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose 未安装"
        exit 1
    fi
    
    log_success "依赖检查完成"
}

# 创建监控配置文件
create_monitoring_configs() {
    log_info "创建监控配置文件..."
    
    # 创建AlertManager配置
    mkdir -p monitoring
    cat > monitoring/alertmanager.yml << 'EOF'
global:
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alerts@inner-cosmos.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'

receivers:
  - name: 'web.hook'
    webhook_configs:
      - url: 'http://localhost:5001/webhook'
        send_resolved: true

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'dev', 'instance']
EOF

    # 创建Blackbox配置
    cat > monitoring/blackbox.yml << 'EOF'
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
      valid_status_codes: []
      method: GET
      follow_redirects: true
      preferred_ip_protocol: "ip4"

  http_post_2xx:
    prober: http
    timeout: 5s
    http:
      method: POST
      headers:
        Content-Type: application/json
      body: '{}'

  tcp_connect:
    prober: tcp
    timeout: 5s

  icmp:
    prober: icmp
    timeout: 5s
EOF

    # 创建Loki配置
    cat > monitoring/loki-config.yml << 'EOF'
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 127.0.0.1
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
    final_sleep: 0s
  chunk_idle_period: 1h
  max_chunk_age: 1h
  chunk_target_size: 1048576
  chunk_retain_period: 30s

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

storage_config:
  boltdb_shipper:
    active_index_directory: /loki/boltdb-shipper-active
    cache_location: /loki/boltdb-shipper-cache
    shared_store: filesystem
  filesystem:
    directory: /loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: false
  retention_period: 0s
EOF

    # 创建Promtail配置
    cat > monitoring/promtail-config.yml << 'EOF'
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          __path__: /var/log/*log

  - job_name: inner-cosmos
    static_configs:
      - targets:
          - localhost
        labels:
          job: inner-cosmos
          __path__: /app/logs/*.log
EOF

    log_success "监控配置文件创建完成"
}

# 部署监控服务
deploy_monitoring() {
    log_info "部署监控服务..."
    
    # 停止现有监控服务
    docker-compose -f "$MONITORING_COMPOSE_FILE" down 2>/dev/null || true
    
    # 启动监控服务
    GRAFANA_PASSWORD="$GRAFANA_PASSWORD" docker-compose -f "$MONITORING_COMPOSE_FILE" up -d
    
    log_success "监控服务部署完成"
}

# 等待服务启动
wait_for_services() {
    log_info "等待服务启动..."
    
    local services=("prometheus:9090" "grafana:3000" "alertmanager:9093")
    
    for service in "${services[@]}"; do
        local name="${service%:*}"
        local port="${service#*:}"
        
        log_info "等待 $name 服务启动..."
        
        for i in {1..30}; do
            if curl -f "http://localhost:$port" &>/dev/null; then
                log_success "$name 服务已启动"
                break
            fi
            
            if [ $i -eq 30 ]; then
                log_error "$name 服务启动超时"
                return 1
            fi
            
            sleep 2
        done
    done
    
    log_success "所有服务启动完成"
}

# 配置Grafana
configure_grafana() {
    log_info "配置Grafana..."
    
    # 等待Grafana完全启动
    sleep 10
    
    # 添加Prometheus数据源
    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Prometheus",
            "type": "prometheus",
            "url": "http://prometheus:9090",
            "access": "proxy",
            "isDefault": true
        }' \
        "http://admin:$GRAFANA_PASSWORD@localhost:3000/api/datasources" || true
    
    # 添加Loki数据源
    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Loki",
            "type": "loki",
            "url": "http://loki:3100",
            "access": "proxy"
        }' \
        "http://admin:$GRAFANA_PASSWORD@localhost:3000/api/datasources" || true
    
    log_success "Grafana配置完成"
}

# 显示访问信息
show_access_info() {
    log_info "监控系统访问信息:"
    echo "================================"
    echo "Prometheus: http://localhost:9090"
    echo "Grafana: http://localhost:3000"
    echo "  用户名: admin"
    echo "  密码: $GRAFANA_PASSWORD"
    echo "AlertManager: http://localhost:9093"
    echo "Node Exporter: http://localhost:9100"
    echo "cAdvisor: http://localhost:8080"
    echo "================================"
}

# 健康检查
health_check() {
    log_info "执行健康检查..."
    
    local failed=0
    
    # 检查Prometheus
    if curl -f http://localhost:9090/-/healthy &>/dev/null; then
        log_success "Prometheus: 健康"
    else
        log_error "Prometheus: 不健康"
        failed=1
    fi
    
    # 检查Grafana
    if curl -f http://localhost:3000/api/health &>/dev/null; then
        log_success "Grafana: 健康"
    else
        log_error "Grafana: 不健康"
        failed=1
    fi
    
    # 检查AlertManager
    if curl -f http://localhost:9093/-/healthy &>/dev/null; then
        log_success "AlertManager: 健康"
    else
        log_error "AlertManager: 不健康"
        failed=1
    fi
    
    if [ $failed -eq 0 ]; then
        log_success "所有监控服务健康检查通过"
    else
        log_error "部分监控服务健康检查失败"
        return 1
    fi
}

# 显示帮助信息
show_help() {
    echo "监控系统部署脚本"
    echo ""
    echo "使用方法:"
    echo "  $0 [操作]"
    echo ""
    echo "操作:"
    echo "  deploy    - 部署监控系统"
    echo "  stop      - 停止监控服务"
    echo "  restart   - 重启监控服务"
    echo "  logs      - 查看日志"
    echo "  health    - 健康检查"
    echo "  status    - 查看服务状态"
    echo "  help      - 显示帮助信息"
}

# 主函数
main() {
    case "${1:-deploy}" in
        "deploy")
            check_dependencies
            create_monitoring_configs
            deploy_monitoring
            wait_for_services
            configure_grafana
            health_check
            show_access_info
            ;;
        "stop")
            log_info "停止监控服务..."
            docker-compose -f "$MONITORING_COMPOSE_FILE" down
            log_success "监控服务已停止"
            ;;
        "restart")
            log_info "重启监控服务..."
            docker-compose -f "$MONITORING_COMPOSE_FILE" restart
            log_success "监控服务已重启"
            ;;
        "logs")
            docker-compose -f "$MONITORING_COMPOSE_FILE" logs -f
            ;;
        "health")
            health_check
            ;;
        "status")
            docker-compose -f "$MONITORING_COMPOSE_FILE" ps
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"

#!/bin/bash

# 内在宇宙项目部署脚本
# 使用方法: ./deploy.sh [环境] [操作]
# 环境: dev, staging, production
# 操作: build, deploy, restart, logs, stop

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
PROJECT_NAME="inner-cosmos"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env.production"

# 函数定义
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
        log_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
    
    log_success "依赖检查完成"
}

# 检查环境变量文件
check_env_file() {
    if [ ! -f "$ENV_FILE" ]; then
        log_error "环境变量文件 $ENV_FILE 不存在"
        log_info "请复制 .env.production 并配置相应的环境变量"
        exit 1
    fi
    
    # 检查关键环境变量
    source "$ENV_FILE"
    
    if [ -z "$MONGODB_URI" ]; then
        log_error "MONGODB_URI 未配置"
        exit 1
    fi
    
    if [ -z "$JWT_SECRET" ]; then
        log_error "JWT_SECRET 未配置"
        exit 1
    fi
    
    log_success "环境变量检查完成"
}

# 构建前端
build_frontend() {
    log_info "构建前端应用..."
    
    # 安装依赖
    npm ci
    
    # 构建生产版本
    npm run build
    
    log_success "前端构建完成"
}

# 构建Docker镜像
build_images() {
    log_info "构建Docker镜像..."
    
    docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache
    
    log_success "Docker镜像构建完成"
}

# 部署应用
deploy() {
    log_info "部署应用..."
    
    # 停止现有容器
    docker-compose -f "$DOCKER_COMPOSE_FILE" down
    
    # 启动新容器
    docker-compose -f "$DOCKER_COMPOSE_FILE" --env-file "$ENV_FILE" up -d
    
    # 等待服务启动
    log_info "等待服务启动..."
    sleep 30
    
    # 检查服务状态
    check_health
    
    log_success "应用部署完成"
}

# 健康检查
check_health() {
    log_info "检查服务健康状态..."
    
    # 检查后端API
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        log_success "后端服务正常"
    else
        log_error "后端服务异常"
        return 1
    fi
    
    # 检查前端
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log_success "前端服务正常"
    else
        log_error "前端服务异常"
        return 1
    fi
    
    log_success "所有服务健康检查通过"
}

# 查看日志
show_logs() {
    log_info "显示应用日志..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" logs -f --tail=100
}

# 重启服务
restart() {
    log_info "重启服务..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" restart
    log_success "服务重启完成"
}

# 停止服务
stop() {
    log_info "停止服务..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" down
    log_success "服务已停止"
}

# 清理资源
cleanup() {
    log_info "清理Docker资源..."
    
    # 清理未使用的镜像
    docker image prune -f
    
    # 清理未使用的容器
    docker container prune -f
    
    # 清理未使用的网络
    docker network prune -f
    
    log_success "清理完成"
}

# 备份数据
backup() {
    log_info "备份数据..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # 备份上传文件
    if [ -d "uploads" ]; then
        cp -r uploads "$BACKUP_DIR/"
        log_success "文件备份完成"
    fi
    
    # 备份日志
    if [ -d "logs" ]; then
        cp -r logs "$BACKUP_DIR/"
        log_success "日志备份完成"
    fi
    
    log_success "数据备份完成: $BACKUP_DIR"
}

# 显示帮助信息
show_help() {
    echo "内在宇宙项目部署脚本"
    echo ""
    echo "使用方法:"
    echo "  $0 [操作]"
    echo ""
    echo "操作:"
    echo "  build     - 构建前端和Docker镜像"
    echo "  deploy    - 部署应用"
    echo "  restart   - 重启服务"
    echo "  stop      - 停止服务"
    echo "  logs      - 查看日志"
    echo "  health    - 健康检查"
    echo "  cleanup   - 清理Docker资源"
    echo "  backup    - 备份数据"
    echo "  help      - 显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 build"
    echo "  $0 deploy"
    echo "  $0 logs"
}

# 主函数
main() {
    case "${1:-help}" in
        "build")
            check_dependencies
            check_env_file
            build_frontend
            build_images
            ;;
        "deploy")
            check_dependencies
            check_env_file
            build_frontend
            build_images
            deploy
            ;;
        "restart")
            check_dependencies
            restart
            ;;
        "stop")
            check_dependencies
            stop
            ;;
        "logs")
            check_dependencies
            show_logs
            ;;
        "health")
            check_health
            ;;
        "cleanup")
            check_dependencies
            cleanup
            ;;
        "backup")
            backup
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"

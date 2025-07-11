#!/bin/bash

# SSL证书配置脚本
# 使用Let's Encrypt免费SSL证书

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置变量
DOMAIN=""
EMAIL=""
WEBROOT_PATH="/var/www/html"
SSL_DIR="./ssl"

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

# 显示帮助信息
show_help() {
    echo "SSL证书配置脚本"
    echo ""
    echo "使用方法:"
    echo "  $0 -d <域名> -e <邮箱> [选项]"
    echo ""
    echo "选项:"
    echo "  -d, --domain    域名 (必需)"
    echo "  -e, --email     邮箱地址 (必需)"
    echo "  -w, --webroot   网站根目录 (默认: /var/www/html)"
    echo "  -s, --ssl-dir   SSL证书目录 (默认: ./ssl)"
    echo "  -h, --help      显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 -d inner-cosmos.com -e admin@inner-cosmos.com"
    echo "  $0 -d inner-cosmos.com -e admin@inner-cosmos.com -w /opt/inner-cosmos/public"
}

# 解析命令行参数
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -d|--domain)
                DOMAIN="$2"
                shift 2
                ;;
            -e|--email)
                EMAIL="$2"
                shift 2
                ;;
            -w|--webroot)
                WEBROOT_PATH="$2"
                shift 2
                ;;
            -s|--ssl-dir)
                SSL_DIR="$2"
                shift 2
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                log_error "未知参数: $1"
                show_help
                exit 1
                ;;
        esac
    done

    # 验证必需参数
    if [[ -z "$DOMAIN" ]]; then
        log_error "域名参数是必需的"
        show_help
        exit 1
    fi

    if [[ -z "$EMAIL" ]]; then
        log_error "邮箱参数是必需的"
        show_help
        exit 1
    fi
}

# 检查系统依赖
check_dependencies() {
    log_info "检查系统依赖..."

    # 检查是否为root用户
    if [[ $EUID -ne 0 ]]; then
        log_error "此脚本需要root权限运行"
        exit 1
    fi

    # 检查操作系统
    if [[ ! -f /etc/os-release ]]; then
        log_error "无法确定操作系统版本"
        exit 1
    fi

    source /etc/os-release
    log_info "操作系统: $PRETTY_NAME"

    # 更新包管理器
    if command -v apt-get &> /dev/null; then
        apt-get update
    elif command -v yum &> /dev/null; then
        yum update -y
    else
        log_error "不支持的包管理器"
        exit 1
    fi

    log_success "系统依赖检查完成"
}

# 安装Certbot
install_certbot() {
    log_info "安装Certbot..."

    if command -v certbot &> /dev/null; then
        log_info "Certbot已安装"
        return
    fi

    if command -v apt-get &> /dev/null; then
        apt-get install -y certbot python3-certbot-nginx
    elif command -v yum &> /dev/null; then
        yum install -y certbot python3-certbot-nginx
    else
        log_error "无法安装Certbot"
        exit 1
    fi

    log_success "Certbot安装完成"
}

# 验证域名解析
verify_domain() {
    log_info "验证域名解析..."

    # 获取域名IP
    DOMAIN_IP=$(dig +short "$DOMAIN" | tail -n1)
    
    if [[ -z "$DOMAIN_IP" ]]; then
        log_error "无法解析域名 $DOMAIN"
        exit 1
    fi

    # 获取服务器公网IP
    SERVER_IP=$(curl -s ifconfig.me)
    
    if [[ "$DOMAIN_IP" != "$SERVER_IP" ]]; then
        log_warning "域名IP ($DOMAIN_IP) 与服务器IP ($SERVER_IP) 不匹配"
        log_warning "请确保DNS记录正确配置"
        read -p "是否继续? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    log_success "域名解析验证完成"
}

# 创建SSL目录
create_ssl_dir() {
    log_info "创建SSL证书目录..."

    mkdir -p "$SSL_DIR"
    chmod 755 "$SSL_DIR"

    log_success "SSL目录创建完成: $SSL_DIR"
}

# 获取SSL证书
obtain_certificate() {
    log_info "获取SSL证书..."

    # 停止可能占用80端口的服务
    systemctl stop nginx 2>/dev/null || true
    systemctl stop apache2 2>/dev/null || true

    # 使用standalone模式获取证书
    certbot certonly \
        --standalone \
        --non-interactive \
        --agree-tos \
        --email "$EMAIL" \
        -d "$DOMAIN" \
        -d "www.$DOMAIN"

    if [[ $? -eq 0 ]]; then
        log_success "SSL证书获取成功"
    else
        log_error "SSL证书获取失败"
        exit 1
    fi
}

# 复制证书文件
copy_certificates() {
    log_info "复制证书文件..."

    CERT_PATH="/etc/letsencrypt/live/$DOMAIN"
    
    if [[ ! -d "$CERT_PATH" ]]; then
        log_error "证书目录不存在: $CERT_PATH"
        exit 1
    fi

    # 复制证书文件
    cp "$CERT_PATH/fullchain.pem" "$SSL_DIR/cert.pem"
    cp "$CERT_PATH/privkey.pem" "$SSL_DIR/key.pem"

    # 设置权限
    chmod 644 "$SSL_DIR/cert.pem"
    chmod 600 "$SSL_DIR/key.pem"

    log_success "证书文件复制完成"
}

# 设置自动续期
setup_auto_renewal() {
    log_info "设置证书自动续期..."

    # 创建续期脚本
    cat > /etc/cron.daily/certbot-renew << 'EOF'
#!/bin/bash
certbot renew --quiet --post-hook "systemctl reload nginx"
EOF

    chmod +x /etc/cron.daily/certbot-renew

    # 测试续期
    certbot renew --dry-run

    if [[ $? -eq 0 ]]; then
        log_success "自动续期设置完成"
    else
        log_warning "自动续期测试失败，请手动检查"
    fi
}

# 验证证书
verify_certificate() {
    log_info "验证SSL证书..."

    # 检查证书文件
    if [[ ! -f "$SSL_DIR/cert.pem" ]] || [[ ! -f "$SSL_DIR/key.pem" ]]; then
        log_error "证书文件不存在"
        exit 1
    fi

    # 检查证书有效性
    openssl x509 -in "$SSL_DIR/cert.pem" -text -noout > /dev/null

    if [[ $? -eq 0 ]]; then
        log_success "SSL证书验证通过"
        
        # 显示证书信息
        EXPIRY_DATE=$(openssl x509 -in "$SSL_DIR/cert.pem" -noout -enddate | cut -d= -f2)
        log_info "证书过期时间: $EXPIRY_DATE"
    else
        log_error "SSL证书验证失败"
        exit 1
    fi
}

# 主函数
main() {
    log_info "开始SSL证书配置..."

    parse_args "$@"
    check_dependencies
    install_certbot
    verify_domain
    create_ssl_dir
    obtain_certificate
    copy_certificates
    setup_auto_renewal
    verify_certificate

    log_success "SSL证书配置完成!"
    log_info "证书文件位置:"
    log_info "  - 证书: $SSL_DIR/cert.pem"
    log_info "  - 私钥: $SSL_DIR/key.pem"
    log_info ""
    log_info "请重启Web服务器以应用新证书"
}

# 执行主函数
main "$@"

#!/bin/bash

# 服务器安全配置脚本
# 配置防火墙、SSH安全、系统安全等

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# 检查root权限
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "此脚本需要root权限运行"
        exit 1
    fi
}

# 更新系统
update_system() {
    log_info "更新系统包..."
    
    if command -v apt-get &> /dev/null; then
        apt-get update && apt-get upgrade -y
        apt-get install -y ufw fail2ban unattended-upgrades
    elif command -v yum &> /dev/null; then
        yum update -y
        yum install -y firewalld fail2ban
    else
        log_error "不支持的包管理器"
        exit 1
    fi
    
    log_success "系统更新完成"
}

# 配置防火墙
setup_firewall() {
    log_info "配置防火墙..."
    
    if command -v ufw &> /dev/null; then
        # Ubuntu/Debian - UFW
        ufw --force reset
        ufw default deny incoming
        ufw default allow outgoing
        
        # 允许SSH
        ufw allow ssh
        
        # 允许HTTP/HTTPS
        ufw allow 80/tcp
        ufw allow 443/tcp
        
        # 允许应用端口
        ufw allow 3001/tcp comment "Inner Cosmos API"
        
        # 启用防火墙
        ufw --force enable
        
        log_success "UFW防火墙配置完成"
        
    elif command -v firewall-cmd &> /dev/null; then
        # CentOS/RHEL - firewalld
        systemctl start firewalld
        systemctl enable firewalld
        
        # 配置规则
        firewall-cmd --permanent --add-service=ssh
        firewall-cmd --permanent --add-service=http
        firewall-cmd --permanent --add-service=https
        firewall-cmd --permanent --add-port=3001/tcp
        
        # 重载配置
        firewall-cmd --reload
        
        log_success "firewalld防火墙配置完成"
    else
        log_warning "未找到支持的防火墙工具"
    fi
}

# 配置SSH安全
setup_ssh_security() {
    log_info "配置SSH安全..."
    
    # 备份原配置
    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
    
    # SSH安全配置
    cat > /etc/ssh/sshd_config.d/security.conf << 'EOF'
# SSH安全配置
Protocol 2
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
PrintMotd no
ClientAliveInterval 300
ClientAliveCountMax 2
MaxAuthTries 3
MaxSessions 2
LoginGraceTime 60
EOF

    # 重启SSH服务
    systemctl restart sshd
    
    log_success "SSH安全配置完成"
    log_warning "请确保已配置SSH密钥，否则可能无法登录"
}

# 配置Fail2Ban
setup_fail2ban() {
    log_info "配置Fail2Ban..."
    
    # 创建自定义配置
    cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

    # 启动Fail2Ban
    systemctl enable fail2ban
    systemctl start fail2ban
    
    log_success "Fail2Ban配置完成"
}

# 配置自动更新
setup_auto_updates() {
    log_info "配置自动安全更新..."
    
    if command -v apt-get &> /dev/null; then
        # Ubuntu/Debian
        cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

        cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

        systemctl enable unattended-upgrades
        
    elif command -v yum &> /dev/null; then
        # CentOS/RHEL
        yum install -y yum-cron
        
        sed -i 's/apply_updates = no/apply_updates = yes/' /etc/yum/yum-cron.conf
        
        systemctl enable yum-cron
        systemctl start yum-cron
    fi
    
    log_success "自动更新配置完成"
}

# 系统加固
system_hardening() {
    log_info "系统安全加固..."
    
    # 禁用不必要的服务
    services_to_disable=("telnet" "rsh" "rlogin" "vsftpd")
    for service in "${services_to_disable[@]}"; do
        if systemctl is-enabled "$service" &>/dev/null; then
            systemctl disable "$service"
            systemctl stop "$service"
            log_info "已禁用服务: $service"
        fi
    done
    
    # 设置文件权限
    chmod 644 /etc/passwd
    chmod 600 /etc/shadow
    chmod 644 /etc/group
    chmod 600 /etc/gshadow
    
    # 内核参数优化
    cat > /etc/sysctl.d/99-security.conf << 'EOF'
# 网络安全参数
net.ipv4.ip_forward = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1
net.ipv4.tcp_syncookies = 1

# 性能优化
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.core.netdev_max_backlog = 5000
fs.file-max = 65535
EOF

    sysctl -p /etc/sysctl.d/99-security.conf
    
    log_success "系统加固完成"
}

# 创建监控用户
create_monitor_user() {
    log_info "创建监控用户..."
    
    # 创建应用用户
    if ! id "inner-cosmos" &>/dev/null; then
        useradd -r -s /bin/false -d /opt/inner-cosmos inner-cosmos
        log_success "创建用户: inner-cosmos"
    fi
    
    # 创建目录
    mkdir -p /opt/inner-cosmos
    chown inner-cosmos:inner-cosmos /opt/inner-cosmos
    
    log_success "监控用户配置完成"
}

# 配置日志轮转
setup_log_rotation() {
    log_info "配置日志轮转..."
    
    cat > /etc/logrotate.d/inner-cosmos << 'EOF'
/opt/inner-cosmos/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 inner-cosmos inner-cosmos
    postrotate
        docker-compose -f /opt/inner-cosmos/docker-compose.yml restart backend
    endscript
}
EOF

    log_success "日志轮转配置完成"
}

# 显示安全状态
show_security_status() {
    log_info "安全配置状态:"
    echo "================================"
    
    # 防火墙状态
    if command -v ufw &> /dev/null; then
        echo "防火墙状态: $(ufw status | head -1)"
    elif command -v firewall-cmd &> /dev/null; then
        echo "防火墙状态: $(firewall-cmd --state)"
    fi
    
    # Fail2Ban状态
    if systemctl is-active fail2ban &>/dev/null; then
        echo "Fail2Ban: 运行中"
    else
        echo "Fail2Ban: 未运行"
    fi
    
    # SSH配置
    echo "SSH Root登录: $(grep PermitRootLogin /etc/ssh/sshd_config | awk '{print $2}')"
    echo "SSH密码认证: $(grep PasswordAuthentication /etc/ssh/sshd_config | awk '{print $2}')"
    
    echo "================================"
}

# 主函数
main() {
    log_info "开始服务器安全配置..."
    
    check_root
    update_system
    setup_firewall
    setup_ssh_security
    setup_fail2ban
    setup_auto_updates
    system_hardening
    create_monitor_user
    setup_log_rotation
    
    log_success "服务器安全配置完成!"
    show_security_status
    
    log_warning "重要提醒:"
    log_warning "1. 请确保已配置SSH密钥"
    log_warning "2. 请测试SSH连接正常"
    log_warning "3. 建议重启服务器以应用所有配置"
}

# 执行主函数
main "$@"

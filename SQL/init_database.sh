#!/bin/bash

# 内在宇宙数据库初始化脚本
# 用于创建MongoDB数据库、集合和索引

echo "🚀 开始初始化内在宇宙数据库..."

# 数据库配置
DB_NAME="inner_cosmos"
MONGO_URI=${MONGODB_URI:-"mongodb://localhost:27017"}
MONGO_HOST=${MONGO_HOST:-"localhost"}
MONGO_PORT=${MONGO_PORT:-27017}
MONGO_USERNAME=${MONGO_USERNAME:-""}
MONGO_PASSWORD=${MONGO_PASSWORD:-""}

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 错误处理
set -e

error_exit() {
    echo -e "${RED}❌ 错误: $1${NC}" >&2
    exit 1
}

success_msg() {
    echo -e "${GREEN}✅ $1${NC}"
}

info_msg() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# 检查MongoDB连接
check_mongodb_connection() {
    info_msg "检查MongoDB连接..."
    
    if [ -n "$MONGO_USERNAME" ] && [ -n "$MONGO_PASSWORD" ]; then
        mongo_cmd="mongosh $MONGO_URI --username $MONGO_USERNAME --password $MONGO_PASSWORD --authenticationDatabase admin"
    else
        mongo_cmd="mongosh $MONGO_URI"
    fi
    
    if ! $mongo_cmd --eval "db.adminCommand('ping')" &> /dev/null; then
        error_exit "无法连接到MongoDB，请检查连接配置"
    fi
    
    success_msg "MongoDB连接成功"
}

# 创建数据库和集合
create_database() {
    info_msg "创建数据库: $DB_NAME"
    
    $mongo_cmd --eval "
        use $DB_NAME;
        
        // 创建集合
        db.createCollection('users');
        db.createCollection('test_results');
        db.createCollection('ai_analyses');
        db.createCollection('user_sessions');
        db.createCollection('system_configs');
        
        print('✅ 数据库和集合创建成功');
    "
}

# 创建索引
create_indexes() {
    info_msg "创建数据库索引..."
    
    $mongo_cmd --eval "
        use $DB_NAME;
        
        // 用户表索引
        db.users.createIndex({ email: 1 }, { unique: true });
        db.users.createIndex({ username: 1 }, { unique: true });
        db.users.createIndex({ 'status.isActive': 1, createdAt: -1 });
        db.users.createIndex({ 'profile.birthDate': 1 });
        db.users.createIndex({ 'status.isActive': 1, 'status.lastLoginAt': -1, 'status.isPremium': 1 });
        
        // 测试结果表索引
        db.test_results.createIndex({ userId: 1, testType: 1, completedAt: -1 });
        db.test_results.createIndex({ testType: 1, 'status.isCompleted': 1 });
        db.test_results.createIndex({ 'result.mbti.type': 1 });
        db.test_results.createIndex({ 'result.astrology.sunSign': 1 });
        db.test_results.createIndex({ userId: 1, testType: 1, 'status.isCompleted': 1, completedAt: -1 });
        
        // AI分析表索引
        db.ai_analyses.createIndex({ userId: 1, createdAt: -1 });
        db.ai_analyses.createIndex({ testResultId: 1 });
        db.ai_analyses.createIndex({ analysisType: 1, createdAt: -1 });
        db.ai_analyses.createIndex({ analysisType: 1, model: 1, 'quality.confidence': -1 });
        
        // 用户会话表索引
        db.user_sessions.createIndex({ userId: 1, 'status.isActive': 1 });
        db.user_sessions.createIndex({ sessionType: 1, createdAt: -1 });
        
        // 系统配置表索引
        db.system_configs.createIndex({ configType: 1, 'status.isActive': 1 });
        
        print('✅ 数据库索引创建成功');
    "
}

# 插入系统配置数据
insert_system_configs() {
    info_msg "插入系统配置数据..."
    
    $mongo_cmd --eval "
        use $DB_NAME;
        
        // 插入MBTI配置
        db.system_configs.insertOne({
            configType: 'mbti',
            name: 'MBTI测试配置',
            version: '1.0.0',
            config: {
                mbti: {
                    scoring: {
                        thresholds: {
                            strong: 60,
                            moderate: 30,
                            slight: 0
                        }
                    }
                }
            },
            status: {
                isActive: true,
                isDefault: true,
                environment: 'production'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        // 插入AI配置
        db.system_configs.insertOne({
            configType: 'ai',
            name: 'AI分析配置',
            version: '1.0.0',
            config: {
                ai: {
                    models: [{
                        name: 'gpt-3.5-turbo',
                        maxTokens: 2000,
                        temperature: 0.7
                    }],
                    prompts: {
                        personality: '基于用户的MBTI测试结果，请提供详细的性格分析...',
                        career: '根据用户的性格特征，推荐适合的职业方向...',
                        relationship: '分析用户在人际关系中的表现特点...'
                    }
                }
            },
            status: {
                isActive: true,
                isDefault: true,
                environment: 'production'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        print('✅ 系统配置数据插入成功');
    "
}

# 创建管理员用户
create_admin_user() {
    info_msg "创建管理员用户..."
    
    ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@inner-cosmos.com"}
    ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123456"}
    
    # 注意：实际部署时需要使用加密的密码
    $mongo_cmd --eval "
        use $DB_NAME;
        
        // 检查是否已存在管理员用户
        const existingAdmin = db.users.findOne({ email: '$ADMIN_EMAIL' });
        if (existingAdmin) {
            print('ℹ️  管理员用户已存在，跳过创建');
        } else {
            db.users.insertOne({
                email: '$ADMIN_EMAIL',
                username: 'admin',
                password: '$ADMIN_PASSWORD', // 注意：实际使用时需要加密
                avatar: '',
                profile: {
                    gender: 'other',
                    birthDate: null,
                    birthTime: null,
                    birthLocation: null
                },
                preferences: {
                    language: 'zh-CN',
                    timezone: 'Asia/Shanghai',
                    notifications: {
                        email: true,
                        daily: false,
                        analysis: false
                    },
                    privacy: {
                        profileVisible: false,
                        shareResults: false,
                        allowAnalytics: true
                    }
                },
                status: {
                    isActive: true,
                    isEmailVerified: true,
                    isPremium: true,
                    subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1年
                    lastLoginAt: new Date(),
                    loginCount: 0
                },
                security: {
                    loginAttempts: 0,
                    lockUntil: null,
                    passwordResetToken: null,
                    passwordResetExpiry: null,
                    emailVerificationToken: null,
                    refreshTokens: []
                },
                metadata: {
                    registrationSource: 'system',
                    userAgent: 'System',
                    ipAddress: '127.0.0.1',
                    referrer: 'direct'
                },
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            print('✅ 管理员用户创建成功');
            print('📧 管理员邮箱: $ADMIN_EMAIL');
            print('🔑 管理员密码: $ADMIN_PASSWORD');
        }
    "
}

# 验证数据库初始化
verify_database() {
    info_msg "验证数据库初始化结果..."
    
    $mongo_cmd --eval "
        use $DB_NAME;
        
        // 检查集合
        const collections = db.listCollectionNames();
        print('📋 数据库集合:', collections.join(', '));
        
        // 检查用户数量
        const userCount = db.users.countDocuments();
        print('👥 用户数量:', userCount);
        
        // 检查索引
        const userIndexes = db.users.getIndexes();
        print('🔍 用户表索引数量:', userIndexes.length);
        
        // 检查系统配置
        const configCount = db.system_configs.countDocuments();
        print('⚙️  系统配置数量:', configCount);
        
        print('✅ 数据库初始化验证完成');
    "
}

# 清理函数
cleanup() {
    info_msg "清理临时文件..."
    # 清理临时文件（如果有）
    success_msg "清理完成"
}

# 主函数
main() {
    echo "==========================================="
    echo "      内在宇宙数据库初始化脚本 v1.0      "
    echo "==========================================="
    echo ""
    
    # 检查参数
    if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        echo "用法: $0 [选项]"
        echo ""
        echo "选项:"
        echo "  --help, -h          显示帮助信息"
        echo "  --clean             清理现有数据库"
        echo "  --verify-only       仅验证数据库状态"
        echo ""
        echo "环境变量:"
        echo "  MONGODB_URI         MongoDB连接URI"
        echo "  MONGO_HOST          MongoDB主机地址"
        echo "  MONGO_PORT          MongoDB端口"
        echo "  MONGO_USERNAME      MongoDB用户名"
        echo "  MONGO_PASSWORD      MongoDB密码"
        echo "  ADMIN_EMAIL         管理员邮箱"
        echo "  ADMIN_PASSWORD      管理员密码"
        echo ""
        exit 0
    fi
    
    # 清理选项
    if [ "$1" = "--clean" ]; then
        info_msg "清理现有数据库..."
        $mongo_cmd --eval "
            use $DB_NAME;
            db.dropDatabase();
            print('🗑️  数据库已清理');
        "
        success_msg "数据库清理完成"
        exit 0
    fi
    
    # 仅验证选项
    if [ "$1" = "--verify-only" ]; then
        check_mongodb_connection
        verify_database
        exit 0
    fi
    
    # 执行初始化步骤
    check_mongodb_connection
    create_database
    create_indexes
    insert_system_configs
    create_admin_user
    verify_database
    cleanup
    
    echo ""
    echo "🎉 数据库初始化完成！"
    echo ""
    echo "📊 数据库信息:"
    echo "   - 数据库名称: $DB_NAME"
    echo "   - 连接地址: $MONGO_URI"
    echo "   - 管理员邮箱: ${ADMIN_EMAIL:-'admin@inner-cosmos.com'}"
    echo ""
    echo "🔄 下一步:"
    echo "   1. 配置应用程序的数据库连接"
    echo "   2. 启动后端服务"
    echo "   3. 运行数据库迁移（如果需要）"
    echo ""
    echo "💡 提示: 请妥善保管管理员账户信息！"
}

# 执行主函数
main "$@"
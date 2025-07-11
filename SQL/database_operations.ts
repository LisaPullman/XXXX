// 数据库操作示例和最佳实践
// 内在宇宙项目数据库操作指南

import { 
  User, 
  TestResult, 
  AIAnalysis, 
  UserSession, 
  SystemConfig,
  IUser,
  ITestResult,
  IAIAnalysis
} from './models';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { logger } from '../server/src/utils/logger';

// ===========================================
// 用户操作示例
// ===========================================

export class UserService {
  /**
   * 创建新用户
   * @param userData 用户数据
   * @returns 创建的用户对象
   */
  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      // 1. 验证输入数据
      const { email, username, password } = userData;
      if (!email || !username || !password) {
        throw new Error('Missing required fields');
      }

      // 2. 检查用户是否已存在
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });
      
      if (existingUser) {
        throw new Error('User already exists');
      }

      // 3. 加密密码
      const hashedPassword = await bcrypt.hash(password, 12);

      // 4. 创建用户
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        preferences: {
          language: 'zh-CN',
          timezone: 'Asia/Shanghai',
          notifications: {
            email: true,
            daily: false,
            analysis: true
          },
          privacy: {
            profileVisible: true,
            shareResults: false,
            allowAnalytics: true
          }
        },
        status: {
          isActive: true,
          isEmailVerified: false,
          isPremium: false,
          loginCount: 0
        },
        security: {
          loginAttempts: 0,
          refreshTokens: []
        }
      });

      const savedUser = await newUser.save();
      
      // 5. 记录日志
      logger.info('User created successfully', { 
        userId: savedUser._id,
        email: savedUser.email 
      });

      return savedUser;

    } catch (error) {
      logger.error('Error creating user', { error: error.message });
      throw error;
    }
  }

  /**
   * 用户登录
   * @param email 邮箱
   * @param password 密码
   * @returns 用户对象
   */
  static async authenticateUser(email: string, password: string): Promise<IUser | null> {
    try {
      // 1. 查找用户
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new Error('User not found');
      }

      // 2. 检查账户状态
      if (!user.status.isActive) {
        throw new Error('Account is deactivated');
      }

      // 3. 检查账户锁定状态
      if (user.security.lockUntil && user.security.lockUntil > new Date()) {
        throw new Error('Account is locked');
      }

      // 4. 验证密码
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // 增加登录失败次数
        user.security.loginAttempts += 1;
        
        // 如果失败次数超过5次，锁定账户30分钟
        if (user.security.loginAttempts >= 5) {
          user.security.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
        }
        
        await user.save();
        throw new Error('Invalid password');
      }

      // 5. 更新登录信息
      user.security.loginAttempts = 0;
      user.security.lockUntil = undefined;
      user.status.lastLoginAt = new Date();
      user.status.loginCount += 1;
      
      await user.save();

      logger.info('User authenticated successfully', { 
        userId: user._id,
        email: user.email 
      });

      return user;

    } catch (error) {
      logger.error('Authentication error', { error: error.message, email });
      throw error;
    }
  }

  /**
   * 更新用户档案
   * @param userId 用户ID
   * @param profileData 档案数据
   * @returns 更新后的用户对象
   */
  static async updateUserProfile(userId: string, profileData: any): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { 
          $set: { 
            'profile': profileData,
            'updatedAt': new Date()
          }
        },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error('User not found');
      }

      logger.info('User profile updated', { userId, profileData });
      return user;

    } catch (error) {
      logger.error('Error updating user profile', { error: error.message, userId });
      throw error;
    }
  }

  /**
   * 获取用户统计信息
   * @param userId 用户ID
   * @returns 用户统计信息
   */
  static async getUserStats(userId: string) {
    try {
      const [testCount, aiAnalysisCount, sessionCount] = await Promise.all([
        TestResult.countDocuments({ userId, 'status.isCompleted': true }),
        AIAnalysis.countDocuments({ userId }),
        UserSession.countDocuments({ userId })
      ]);

      const latestTest = await TestResult.findOne({ userId })
        .sort({ completedAt: -1 })
        .select('testType completedAt result');

      return {
        totalTests: testCount,
        totalAnalyses: aiAnalysisCount,
        totalSessions: sessionCount,
        latestTest
      };

    } catch (error) {
      logger.error('Error getting user stats', { error: error.message, userId });
      throw error;
    }
  }
}

// ===========================================
// 测试结果操作示例
// ===========================================

export class TestResultService {
  /**
   * 创建新的测试结果
   * @param testData 测试数据
   * @returns 创建的测试结果
   */
  static async createTestResult(testData: Partial<ITestResult>): Promise<ITestResult> {
    try {
      // 1. 验证必需字段
      if (!testData.userId || !testData.testType) {
        throw new Error('Missing required fields');
      }

      // 2. 生成会话ID
      const sessionId = `${testData.testType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 3. 创建测试结果
      const testResult = new TestResult({
        ...testData,
        sessionId,
        startedAt: new Date(),
        status: {
          isCompleted: false,
          isPublic: false,
          isArchived: false,
          shareCount: 0,
          viewCount: 0
        }
      });

      const savedResult = await testResult.save();
      
      logger.info('Test result created', { 
        testResultId: savedResult._id,
        userId: testData.userId,
        testType: testData.testType
      });

      return savedResult;

    } catch (error) {
      logger.error('Error creating test result', { error: error.message });
      throw error;
    }
  }

  /**
   * 完成测试并计算结果
   * @param testResultId 测试结果ID
   * @param answers 用户答案
   * @returns 完成的测试结果
   */
  static async completeTest(testResultId: string, answers: any[]): Promise<ITestResult> {
    try {
      const testResult = await TestResult.findById(testResultId);
      if (!testResult) {
        throw new Error('Test result not found');
      }

      // 1. 计算测试结果
      let calculatedResult = {};
      
      if (testResult.testType === 'mbti') {
        calculatedResult = this.calculateMBTIResult(answers);
      } else if (testResult.testType === 'astrology') {
        calculatedResult = this.calculateAstrologyResult(answers);
      }

      // 2. 更新测试结果
      testResult.testData.questions = answers;
      testResult.result = calculatedResult;
      testResult.completedAt = new Date();
      testResult.status.isCompleted = true;
      testResult.testData.completionRate = 1.0;

      const savedResult = await testResult.save();

      logger.info('Test completed', { 
        testResultId,
        testType: testResult.testType,
        userId: testResult.userId
      });

      return savedResult;

    } catch (error) {
      logger.error('Error completing test', { error: error.message, testResultId });
      throw error;
    }
  }

  /**
   * 计算MBTI结果
   * @param answers 用户答案
   * @returns MBTI结果
   */
  private static calculateMBTIResult(answers: any[]) {
    const dimensions = { EI: 0, SN: 0, TF: 0, JP: 0 };
    
    answers.forEach(answer => {
      const { dimension, selectedOption, weight = 1 } = answer;
      if (dimension && selectedOption) {
        const score = selectedOption === 'A' ? -weight : weight;
        dimensions[dimension] += score;
      }
    });

    // 确定MBTI类型
    const type = 
      (dimensions.EI >= 0 ? 'E' : 'I') +
      (dimensions.SN >= 0 ? 'S' : 'N') +
      (dimensions.TF >= 0 ? 'T' : 'F') +
      (dimensions.JP >= 0 ? 'J' : 'P');

    // 计算置信度
    const confidence = Math.min(
      (Math.abs(dimensions.EI) + Math.abs(dimensions.SN) + 
       Math.abs(dimensions.TF) + Math.abs(dimensions.JP)) / 100, 
      1.0
    );

    return {
      mbti: {
        type,
        dimensions,
        confidence,
        description: `您的性格类型是${type}`
      }
    };
  }

  /**
   * 计算星座结果
   * @param userProfile 用户档案
   * @returns 星座结果
   */
  private static calculateAstrologyResult(userProfile: any) {
    const { birthDate } = userProfile;
    if (!birthDate) {
      throw new Error('Birth date is required for astrology analysis');
    }

    // 简化的星座计算
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    
    const zodiacSigns = [
      { name: '水瓶座', start: [1, 20], end: [2, 18] },
      { name: '双鱼座', start: [2, 19], end: [3, 20] },
      { name: '白羊座', start: [3, 21], end: [4, 19] },
      { name: '金牛座', start: [4, 20], end: [5, 20] },
      { name: '双子座', start: [5, 21], end: [6, 21] },
      { name: '巨蟹座', start: [6, 22], end: [7, 22] },
      { name: '狮子座', start: [7, 23], end: [8, 22] },
      { name: '处女座', start: [8, 23], end: [9, 22] },
      { name: '天秤座', start: [9, 23], end: [10, 23] },
      { name: '天蝎座', start: [10, 24], end: [11, 22] },
      { name: '射手座', start: [11, 23], end: [12, 21] },
      { name: '摩羯座', start: [12, 22], end: [1, 19] }
    ];

    const sunSign = zodiacSigns.find(sign => {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (startMonth === endMonth) {
        return month === startMonth && day >= startDay && day <= endDay;
      } else {
        return (month === startMonth && day >= startDay) || 
               (month === endMonth && day <= endDay);
      }
    });

    return {
      astrology: {
        sunSign: sunSign?.name || '未知',
        element: this.getZodiacElement(sunSign?.name),
        quality: this.getZodiacQuality(sunSign?.name),
        rulingPlanet: this.getRulingPlanet(sunSign?.name),
        traits: this.getZodiacTraits(sunSign?.name),
        compatibility: this.getCompatibility(sunSign?.name),
        luckyNumbers: this.getLuckyNumbers(sunSign?.name),
        luckyColors: this.getLuckyColors(sunSign?.name)
      }
    };
  }

  // 辅助方法（简化实现）
  private static getZodiacElement(sign: string): string {
    const elements = {
      '白羊座': 'fire', '狮子座': 'fire', '射手座': 'fire',
      '金牛座': 'earth', '处女座': 'earth', '摩羯座': 'earth',
      '双子座': 'air', '天秤座': 'air', '水瓶座': 'air',
      '巨蟹座': 'water', '天蝎座': 'water', '双鱼座': 'water'
    };
    return elements[sign] || 'unknown';
  }

  private static getZodiacQuality(sign: string): string {
    // 简化实现
    return 'cardinal';
  }

  private static getRulingPlanet(sign: string): string {
    // 简化实现
    return 'Unknown';
  }

  private static getZodiacTraits(sign: string): string[] {
    // 简化实现
    return ['积极', '热情', '勇敢'];
  }

  private static getCompatibility(sign: string): string[] {
    // 简化实现
    return ['狮子座', '射手座'];
  }

  private static getLuckyNumbers(sign: string): number[] {
    // 简化实现
    return [1, 8, 17];
  }

  private static getLuckyColors(sign: string): string[] {
    // 简化实现
    return ['红色', '橙色'];
  }

  /**
   * 获取用户的测试历史
   * @param userId 用户ID
   * @param testType 测试类型（可选）
   * @param limit 限制数量
   * @returns 测试历史
   */
  static async getUserTestHistory(userId: string, testType?: string, limit: number = 10) {
    try {
      const query: any = { userId, 'status.isCompleted': true };
      if (testType) {
        query.testType = testType;
      }

      const tests = await TestResult.find(query)
        .sort({ completedAt: -1 })
        .limit(limit)
        .select('testType result completedAt status');

      return tests;

    } catch (error) {
      logger.error('Error getting test history', { error: error.message, userId });
      throw error;
    }
  }
}

// ===========================================
// AI分析操作示例
// ===========================================

export class AIAnalysisService {
  /**
   * 创建AI分析
   * @param analysisData 分析数据
   * @returns 创建的分析结果
   */
  static async createAIAnalysis(analysisData: Partial<IAIAnalysis>): Promise<IAIAnalysis> {
    try {
      const analysis = new AIAnalysis({
        ...analysisData,
        requestedAt: new Date(),
        usage: {
          viewCount: 0,
          shareCount: 0,
          likeCount: 0
        }
      });

      const savedAnalysis = await analysis.save();
      
      logger.info('AI analysis created', { 
        analysisId: savedAnalysis._id,
        userId: analysisData.userId,
        type: analysisData.analysisType
      });

      return savedAnalysis;

    } catch (error) {
      logger.error('Error creating AI analysis', { error: error.message });
      throw error;
    }
  }

  /**
   * 获取分析统计信息
   * @param analysisType 分析类型
   * @returns 统计信息
   */
  static async getAnalysisStats(analysisType?: string) {
    try {
      const matchStage = analysisType ? { analysisType } : {};
      
      const stats = await AIAnalysis.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalAnalyses: { $sum: 1 },
            avgConfidence: { $avg: '$quality.confidence' },
            avgRating: { $avg: '$usage.rating' },
            totalViews: { $sum: '$usage.viewCount' },
            totalShares: { $sum: '$usage.shareCount' },
            avgProcessingTime: { $avg: '$technical.processingTime' },
            totalTokens: { $sum: '$technical.tokenCount' },
            totalCost: { $sum: '$technical.cost' }
          }
        }
      ]);

      return stats[0] || {};

    } catch (error) {
      logger.error('Error getting analysis stats', { error: error.message });
      throw error;
    }
  }
}

// ===========================================
// 批量操作示例
// ===========================================

export class BatchOperations {
  /**
   * 批量更新用户状态
   * @param userIds 用户ID列表
   * @param status 状态更新
   * @returns 更新结果
   */
  static async batchUpdateUserStatus(userIds: string[], status: any) {
    try {
      const result = await User.updateMany(
        { _id: { $in: userIds } },
        { $set: { status, updatedAt: new Date() } }
      );

      logger.info('Batch user status update', { 
        userIds,
        status,
        modifiedCount: result.modifiedCount
      });

      return result;

    } catch (error) {
      logger.error('Error in batch user status update', { error: error.message });
      throw error;
    }
  }

  /**
   * 批量删除过期数据
   * @param days 过期天数
   * @returns 删除结果
   */
  static async cleanupExpiredData(days: number = 30) {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() - days);

      const [sessionsResult, testsResult] = await Promise.all([
        // 删除过期的非活跃会话
        UserSession.deleteMany({
          'status.isActive': false,
          updatedAt: { $lt: expiryDate }
        }),
        // 删除未完成的测试
        TestResult.deleteMany({
          'status.isCompleted': false,
          startedAt: { $lt: expiryDate }
        })
      ]);

      logger.info('Cleanup expired data', {
        expiredSessions: sessionsResult.deletedCount,
        expiredTests: testsResult.deletedCount,
        expiryDate
      });

      return {
        expiredSessions: sessionsResult.deletedCount,
        expiredTests: testsResult.deletedCount
      };

    } catch (error) {
      logger.error('Error cleaning up expired data', { error: error.message });
      throw error;
    }
  }
}

// ===========================================
// 聚合查询示例
// ===========================================

export class AnalyticsService {
  /**
   * 获取用户活跃度统计
   * @param period 时间段（天）
   * @returns 活跃度统计
   */
  static async getUserActivityStats(period: number = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - period);

      const pipeline = [
        {
          $match: {
            'status.lastLoginAt': { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$status.lastLoginAt' },
              month: { $month: '$status.lastLoginAt' },
              day: { $dayOfMonth: '$status.lastLoginAt' }
            },
            activeUsers: { $sum: 1 },
            newUsers: {
              $sum: {
                $cond: {
                  if: { $gte: ['$createdAt', startDate] },
                  then: 1,
                  else: 0
                }
              }
            }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
        }
      ];

      return await User.aggregate(pipeline);

    } catch (error) {
      logger.error('Error getting user activity stats', { error: error.message });
      throw error;
    }
  }

  /**
   * 获取MBTI类型分布
   * @returns MBTI类型分布
   */
  static async getMBTIDistribution() {
    try {
      const pipeline = [
        {
          $match: {
            testType: 'mbti',
            'status.isCompleted': true
          }
        },
        {
          $group: {
            _id: '$result.mbti.type',
            count: { $sum: 1 },
            avgConfidence: { $avg: '$result.mbti.confidence' }
          }
        },
        {
          $sort: { count: -1 }
        }
      ];

      return await TestResult.aggregate(pipeline);

    } catch (error) {
      logger.error('Error getting MBTI distribution', { error: error.message });
      throw error;
    }
  }
}

// ===========================================
// 事务操作示例
// ===========================================

export class TransactionService {
  /**
   * 创建用户和初始测试（事务）
   * @param userData 用户数据
   * @param testData 测试数据
   * @returns 创建结果
   */
  static async createUserWithInitialTest(userData: any, testData: any) {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();

      // 1. 创建用户
      const user = new User({
        ...userData,
        password: await bcrypt.hash(userData.password, 12)
      });
      
      const savedUser = await user.save({ session });

      // 2. 创建初始测试
      const testResult = new TestResult({
        ...testData,
        userId: savedUser._id,
        sessionId: `initial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        startedAt: new Date()
      });
      
      const savedTest = await testResult.save({ session });

      // 3. 提交事务
      await session.commitTransaction();
      
      logger.info('User and initial test created successfully', {
        userId: savedUser._id,
        testId: savedTest._id
      });

      return { user: savedUser, test: savedTest };

    } catch (error) {
      // 回滚事务
      await session.abortTransaction();
      logger.error('Error creating user with initial test', { error: error.message });
      throw error;
    } finally {
      session.endSession();
    }
  }
}

// ===========================================
// 性能优化示例
// ===========================================

export class PerformanceOptimization {
  /**
   * 带缓存的查询
   * @param key 缓存键
   * @param queryFn 查询函数
   * @param ttl 缓存时间（秒）
   * @returns 查询结果
   */
  static async cachedQuery(key: string, queryFn: Function, ttl: number = 3600) {
    // 这里假设有Redis缓存
    // const cached = await redis.get(key);
    // if (cached) {
    //   return JSON.parse(cached);
    // }

    const result = await queryFn();
    
    // await redis.setex(key, ttl, JSON.stringify(result));
    
    return result;
  }

  /**
   * 分页查询优化
   * @param model Mongoose模型
   * @param query 查询条件
   * @param options 分页选项
   * @returns 分页结果
   */
  static async paginatedQuery(model: any, query: any, options: any) {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      model.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(), // 使用lean()提高性能
      model.countDocuments(query)
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    };
  }
}

// ===========================================
// 导出所有服务
// ===========================================

export {
  UserService,
  TestResultService,
  AIAnalysisService,
  BatchOperations,
  AnalyticsService,
  TransactionService,
  PerformanceOptimization
};

// 使用示例
/*
// 创建用户
const newUser = await UserService.createUser({
  email: 'user@example.com',
  username: 'testuser',
  password: 'password123'
});

// 创建测试
const testResult = await TestResultService.createTestResult({
  userId: newUser._id,
  testType: 'mbti',
  testVersion: '1.0.0'
});

// 完成测试
const completedTest = await TestResultService.completeTest(testResult._id, answers);

// 创建AI分析
const aiAnalysis = await AIAnalysisService.createAIAnalysis({
  userId: newUser._id,
  testResultId: completedTest._id,
  analysisType: 'personality',
  prompt: 'Analyze personality',
  model: 'gpt-3.5-turbo'
});
*/
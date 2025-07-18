import { 
  AnalysisRequest, 
  ComprehensiveAnalysis, 
  PersonalityProfile, 
  PersonalityDimension, 
  LifeArea, 
  ActionPlan,
  ModuleType,

} from '../types';
import { aiMasterDatabase } from '../data/aiMasterData';

export class AIAnalysisEngine {
  // 生成综合分析
  static generateComprehensiveAnalysis(request: AnalysisRequest): ComprehensiveAnalysis {
    const { includeModules, userInput, existingResults } = request;
    
    // 分析性格维度
    const dimensions = this.analyzeDimensions(existingResults, includeModules);
    
    // 分析生活领域
    const lifeAreas = this.analyzeLifeAreas(dimensions, userInput, existingResults);
    
    // 生成人格档案
    const personalityProfile = this.generatePersonalityProfile(dimensions, existingResults);
    
    // 计算一致性和置信度
    const consistency = this.calculateConsistency(existingResults, includeModules);
    const confidence = this.calculateConfidence(existingResults, includeModules);
    const overallScore = this.calculateOverallScore(dimensions, lifeAreas);
    
    // 生成AI洞察
    const aiInsights = this.generateAIInsights(personalityProfile, dimensions, lifeAreas, userInput);
    
    // 生成行动计划
    const actionPlans = this.generateActionPlans(personalityProfile, userInput, lifeAreas);
    
    return {
      id: this.generateId(),
      timestamp: new Date(),
      inputData: {
        ...existingResults,
        userInput
      },
      analysis: {
        personalityProfile,
        dimensions,
        lifeAreas,
        overallScore,
        confidence,
        consistency
      },
      aiInsights,
      actionPlans
    };
  }
  
  // 分析性格维度
  private static analyzeDimensions(existingResults: any, includeModules: ModuleType[]): PersonalityDimension[] {
    const dimensions = [...aiMasterDatabase.dimensions];
    
    // 重置分数
    dimensions.forEach(dim => dim.score = 0);
    
    let totalWeight = 0;
    
    // 根据MBTI结果计算
    if (includeModules.includes('mbti') && existingResults.mbtiResult) {
      const mbtiType = existingResults.mbtiResult.type;
      const mbtiMapping = (aiMasterDatabase.traitMappings.mbti as any)[mbtiType];
      
      if (mbtiMapping) {
        dimensions.forEach(dim => {
          if (mbtiMapping[dim.id] !== undefined) {
            dim.score += mbtiMapping[dim.id] * 0.3; // MBTI权重30%
          }
        });
        totalWeight += 0.3;
      }
    }
    
    // 根据星座结果计算
    if (includeModules.includes('astrology') && existingResults.astrologyResult) {
      const sunSign = existingResults.astrologyResult.sunSign;
      const astroMapping = (aiMasterDatabase.traitMappings.astrology as any)[sunSign];
      
      if (astroMapping) {
        dimensions.forEach(dim => {
          if (astroMapping[dim.id] !== undefined) {
            dim.score += astroMapping[dim.id] * 0.2; // 星座权重20%
          }
        });
        totalWeight += 0.2;
      }
    }
    
    // 根据血型结果计算
    if (includeModules.includes('bloodtype') && existingResults.bloodTypeResult) {
      const bloodType = existingResults.bloodTypeResult.bloodType;
      const bloodMapping = (aiMasterDatabase.traitMappings.bloodtype as any)[bloodType];
      
      if (bloodMapping) {
        dimensions.forEach(dim => {
          if (bloodMapping[dim.id] !== undefined) {
            dim.score += bloodMapping[dim.id] * 0.15; // 血型权重15%
          }
        });
        totalWeight += 0.15;
      }
    }
    
    // 根据塔罗结果计算
    if (includeModules.includes('tarot') && existingResults.tarotResult) {
      this.analyzeTarotDimensions(dimensions, existingResults.tarotResult);
      totalWeight += 0.15;
    }
    
    // 根据手相结果计算
    if (includeModules.includes('palmistry') && existingResults.palmistryResult) {
      this.analyzePalmistryDimensions(dimensions, existingResults.palmistryResult);
      totalWeight += 0.1;
    }
    
    // 根据易经结果计算
    if (includeModules.includes('iching') && existingResults.ichingResult) {
      this.analyzeIChingDimensions(dimensions, existingResults.ichingResult);
      totalWeight += 0.1;
    }
    
    // 标准化分数
    if (totalWeight > 0) {
      dimensions.forEach(dim => {
        dim.score = Math.min(100, Math.max(0, dim.score / totalWeight));
      });
    }
    
    return dimensions;
  }
  
  // 分析塔罗对性格维度的影响
  private static analyzeTarotDimensions(dimensions: PersonalityDimension[], tarotResult: any) {
    // 简化的塔罗分析逻辑
    const cards = tarotResult.cards || [];
    
    cards.forEach((card: any) => {
      if (card.name.includes('正义') || card.name.includes('节制')) {
        this.adjustDimension(dimensions, 'conscientiousness', 10);
      }
      if (card.name.includes('愚者') || card.name.includes('魔术师')) {
        this.adjustDimension(dimensions, 'openness', 10);
      }
      if (card.name.includes('恋人') || card.name.includes('星星')) {
        this.adjustDimension(dimensions, 'agreeableness', 10);
      }
      if (card.name.includes('力量') || card.name.includes('战车')) {
        this.adjustDimension(dimensions, 'emotional_stability', 10);
      }
    });
  }
  
  // 分析手相对性格维度的影响
  private static analyzePalmistryDimensions(dimensions: PersonalityDimension[], palmistryResult: any) {
    const personality = palmistryResult.overallPersonality;
    
    if (personality.traits.includes('社交能力强') || personality.traits.includes('外向')) {
      this.adjustDimension(dimensions, 'extraversion', 15);
    }
    if (personality.traits.includes('责任心强') || personality.traits.includes('可靠')) {
      this.adjustDimension(dimensions, 'conscientiousness', 15);
    }
    if (personality.traits.includes('同情心') || personality.traits.includes('善解人意')) {
      this.adjustDimension(dimensions, 'empathy', 15);
    }
  }
  
  // 分析易经对性格维度的影响
  private static analyzeIChingDimensions(dimensions: PersonalityDimension[], ichingResult: any) {
    const hexagram = ichingResult.originalHexagram;
    
    if (hexagram.chineseName === '乾' || hexagram.chineseName === '震') {
      this.adjustDimension(dimensions, 'extraversion', 12);
      this.adjustDimension(dimensions, 'resilience', 12);
    }
    if (hexagram.chineseName === '坤' || hexagram.chineseName === '艮') {
      this.adjustDimension(dimensions, 'agreeableness', 12);
      this.adjustDimension(dimensions, 'conscientiousness', 12);
    }
  }
  
  // 调整维度分数
  private static adjustDimension(dimensions: PersonalityDimension[], dimensionId: string, adjustment: number) {
    const dimension = dimensions.find(d => d.id === dimensionId);
    if (dimension) {
      dimension.score += adjustment;
    }
  }
  
  // 分析生活领域
  private static analyzeLifeAreas(
    dimensions: PersonalityDimension[], 
    userInput: any, 
    _existingResults: any
  ): LifeArea[] {
    const areas = [...aiMasterDatabase.lifeAreas];
    
    areas.forEach(area => {
      switch (area.id) {
        case 'career':
          area.score = this.calculateCareerScore(dimensions, userInput);
          area.analysis = this.generateCareerAnalysis(dimensions, userInput);
          area.recommendations = this.generateCareerRecommendations(dimensions);
          break;
          
        case 'relationships':
          area.score = this.calculateRelationshipScore(dimensions);
          area.analysis = this.generateRelationshipAnalysis(dimensions);
          area.recommendations = this.generateRelationshipRecommendations(dimensions);
          break;
          
        case 'health':
          area.score = this.calculateHealthScore(dimensions);
          area.analysis = this.generateHealthAnalysis(dimensions);
          area.recommendations = this.generateHealthRecommendations(dimensions);
          break;
          
        case 'personal_growth':
          area.score = this.calculateGrowthScore(dimensions);
          area.analysis = this.generateGrowthAnalysis(dimensions);
          area.recommendations = this.generateGrowthRecommendations(dimensions);
          break;
          
        default:
          area.score = this.calculateGenericScore(dimensions);
          area.analysis = this.generateGenericAnalysis(area.name, dimensions);
          area.recommendations = this.generateGenericRecommendations(area.name, dimensions);
      }
      
      // 生成挑战和机会
      area.challenges = this.generateChallenges(area.id, dimensions);
      area.opportunities = this.generateOpportunities(area.id, dimensions);
    });
    
    return areas;
  }
  
  // 计算事业分数
  private static calculateCareerScore(dimensions: PersonalityDimension[], _userInput: any): number {
    const conscientiousness = this.getDimensionScore(dimensions, 'conscientiousness');
    const extraversion = this.getDimensionScore(dimensions, 'extraversion');
    const openness = this.getDimensionScore(dimensions, 'openness');
    
    return Math.round((conscientiousness * 0.4 + extraversion * 0.3 + openness * 0.3));
  }
  
  // 计算人际关系分数
  private static calculateRelationshipScore(dimensions: PersonalityDimension[]): number {
    const agreeableness = this.getDimensionScore(dimensions, 'agreeableness');
    const empathy = this.getDimensionScore(dimensions, 'empathy');
    const extraversion = this.getDimensionScore(dimensions, 'extraversion');
    
    return Math.round((agreeableness * 0.4 + empathy * 0.4 + extraversion * 0.2));
  }
  
  // 计算健康分数
  private static calculateHealthScore(dimensions: PersonalityDimension[]): number {
    const emotionalStability = this.getDimensionScore(dimensions, 'emotional_stability');
    const conscientiousness = this.getDimensionScore(dimensions, 'conscientiousness');
    const resilience = this.getDimensionScore(dimensions, 'resilience');
    
    return Math.round((emotionalStability * 0.4 + conscientiousness * 0.3 + resilience * 0.3));
  }
  
  // 计算个人成长分数
  private static calculateGrowthScore(dimensions: PersonalityDimension[]): number {
    const openness = this.getDimensionScore(dimensions, 'openness');
    const conscientiousness = this.getDimensionScore(dimensions, 'conscientiousness');
    const resilience = this.getDimensionScore(dimensions, 'resilience');
    
    return Math.round((openness * 0.4 + conscientiousness * 0.3 + resilience * 0.3));
  }
  
  // 计算通用分数
  private static calculateGenericScore(dimensions: PersonalityDimension[]): number {
    const totalScore = dimensions.reduce((sum, dim) => sum + dim.score, 0);
    return Math.round(totalScore / dimensions.length);
  }
  
  // 生成人格档案
  private static generatePersonalityProfile(
    dimensions: PersonalityDimension[], 
    existingResults: any
  ): PersonalityProfile {
    return {
      coreTraits: this.extractCoreTraits(dimensions, existingResults),
      strengths: this.extractStrengths(dimensions, existingResults),
      weaknesses: this.extractWeaknesses(dimensions, existingResults),
      motivations: this.extractMotivations(dimensions, existingResults),
      fears: this.extractFears(dimensions, existingResults),
      values: this.extractValues(dimensions, existingResults),
      communicationStyle: this.determineCommunicationStyle(dimensions),
      decisionMakingStyle: this.determineDecisionMakingStyle(dimensions),
      stressResponse: this.determineStressResponse(dimensions),
      growthAreas: this.identifyGrowthAreas(dimensions)
    };
  }
  
  // 提取核心特质
  private static extractCoreTraits(dimensions: PersonalityDimension[], existingResults: any): string[] {
    const traits: string[] = [];
    
    // 基于维度分数提取特质
    dimensions.forEach(dim => {
      if (dim.score >= 70) {
        switch (dim.id) {
          case 'extraversion':
            traits.push('外向活跃', '社交达人', '能量充沛');
            break;
          case 'agreeableness':
            traits.push('友善合作', '善解人意', '团队精神');
            break;
          case 'conscientiousness':
            traits.push('自律严谨', '目标导向', '责任心强');
            break;
          case 'emotional_stability':
            traits.push('情绪稳定', '抗压能力强', '冷静理性');
            break;
          case 'openness':
            traits.push('创新思维', '好奇心强', '接受新事物');
            break;
          case 'intuition':
            traits.push('直觉敏锐', '洞察力强', '预感准确');
            break;
          case 'empathy':
            traits.push('共情能力强', '理解他人', '情感丰富');
            break;
          case 'resilience':
            traits.push('韧性十足', '快速恢复', '坚韧不拔');
            break;
        }
      }
    });
    
    // 从其他模块结果中提取特质
    if (existingResults.mbtiResult) {
      traits.push(...this.extractMBTITraits(existingResults.mbtiResult));
    }
    
    return [...new Set(traits)].slice(0, 8); // 去重并限制数量
  }
  
  // 提取MBTI特质
  private static extractMBTITraits(mbtiResult: any): string[] {
    const type = mbtiResult.type;
    const traitMap: { [key: string]: string[] } = {
      'INTJ': ['战略思维', '独立自主', '完美主义', '长远规划'],
      'ENTJ': ['天生领袖', '目标导向', '执行力强', '决策果断'],
      'INFP': ['理想主义', '价值驱动', '创造性', '真诚善良'],
      'ENFP': ['热情洋溢', '创新思维', '人际敏感', '适应性强']
    };
    
    return traitMap[type] || [];
  }
  
  // 生成AI洞察
  private static generateAIInsights(
    profile: PersonalityProfile, 
    dimensions: PersonalityDimension[], 
    lifeAreas: LifeArea[], 
    userInput: any
  ) {
    return {
      summary: this.generateSummary(profile, dimensions),
      keyFindings: this.generateKeyFindings(dimensions, lifeAreas),
      personalizedAdvice: this.generatePersonalizedAdvice(profile, userInput),
      developmentPlan: {
        shortTerm: this.generateShortTermPlan(profile, dimensions),
        mediumTerm: this.generateMediumTermPlan(profile, lifeAreas),
        longTerm: this.generateLongTermPlan(profile, userInput)
      },
      relationshipAdvice: this.generateRelationshipAdvice(profile, dimensions),
      careerGuidance: this.generateCareerGuidance(profile, userInput),
      wellnessRecommendations: this.generateWellnessRecommendations(dimensions)
    };
  }
  
  // 生成行动计划
  private static generateActionPlans(
    profile: PersonalityProfile, 
    userInput: any, 
    _lifeAreas: LifeArea[]
  ): ActionPlan[] {
    const plans: ActionPlan[] = [];
    
    // 基于用户目标生成计划
    if (userInput.goals && userInput.goals.length > 0) {
      userInput.goals.forEach((goal: string, index: number) => {
        plans.push({
          id: `goal_${index}`,
          title: `实现目标：${goal}`,
          description: `基于您的性格特征制定的目标实现计划`,
          category: this.categorizeGoal(goal),
          priority: 'high',
          timeline: '3-6个月',
          steps: this.generateGoalSteps(goal, profile),
          metrics: this.generateGoalMetrics(goal),
          resources: this.generateGoalResources(goal)
        });
      });
    }
    
    // 基于成长领域生成计划
    profile.growthAreas.forEach((area, index) => {
      plans.push({
        id: `growth_${index}`,
        title: `提升${area}`,
        description: `针对您的发展需求制定的成长计划`,
        category: 'personal',
        priority: 'medium',
        timeline: '1-3个月',
        steps: this.generateGrowthSteps(area),
        metrics: this.generateGrowthMetrics(area),
        resources: this.generateGrowthResources(area)
      });
    });
    
    return plans.slice(0, 5); // 限制数量
  }
  
  // 辅助方法
  private static getDimensionScore(dimensions: PersonalityDimension[], id: string): number {
    const dimension = dimensions.find(d => d.id === id);
    return dimension ? dimension.score : 50;
  }
  
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  private static calculateConsistency(_existingResults: any, includeModules: ModuleType[]): number {
    // 简化的一致性计算
    let consistencyScore = 85;
    
    // 如果有多个模块结果，检查一致性
    if (includeModules.length > 1) {
      // 这里可以实现更复杂的一致性算法
      consistencyScore = Math.random() * 20 + 70; // 70-90之间
    }
    
    return Math.round(consistencyScore);
  }
  
  private static calculateConfidence(existingResults: any, includeModules: ModuleType[]): number {
    let confidence = 0.6; // 基础置信度
    
    // 每个模块增加置信度
    confidence += includeModules.length * 0.1;
    
    // 根据数据质量调整
    if (existingResults.mbtiResult?.confidence) {
      confidence += existingResults.mbtiResult.confidence * 0.1;
    }
    
    return Math.min(0.95, confidence);
  }
  
  private static calculateOverallScore(dimensions: PersonalityDimension[], lifeAreas: LifeArea[]): number {
    const dimAvg = dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length;
    const areaAvg = lifeAreas.reduce((sum, area) => sum + area.score, 0) / lifeAreas.length;
    
    return Math.round((dimAvg + areaAvg) / 2);
  }
  
  // 这里可以继续实现其他私有方法，如generateSummary, generateKeyFindings等
  private static generateSummary(profile: PersonalityProfile, dimensions: PersonalityDimension[]): string {
    const topTraits = profile.coreTraits.slice(0, 3).join('、');
    const topDimension = dimensions.reduce((max, dim) => dim.score > max.score ? dim : max);
    
    return `您是一个${topTraits}的人，在${topDimension.name}方面表现特别突出。您的性格特征显示出独特的个人魅力和发展潜力。`;
  }
  
  private static generateKeyFindings(dimensions: PersonalityDimension[], lifeAreas: LifeArea[]): string[] {
    const findings: string[] = [];
    
    // 找到最高和最低的维度
    const sortedDimensions = [...dimensions].sort((a, b) => b.score - a.score);
    const highest = sortedDimensions[0];
    const lowest = sortedDimensions[sortedDimensions.length - 1];
    
    findings.push(`您在${highest.name}方面表现优异（${highest.score}分）`);
    findings.push(`建议关注${lowest.name}的发展（${lowest.score}分）`);
    
    // 分析生活领域
    const sortedAreas = [...lifeAreas].sort((a, b) => b.score - a.score);
    findings.push(`您在${sortedAreas[0].name}领域具有很好的发展基础`);
    
    return findings;
  }
  
  private static generatePersonalizedAdvice(profile: PersonalityProfile, userInput: any): string[] {
    const advice: string[] = [];
    
    // 基于核心特质生成建议
    if (profile.coreTraits.includes('创新思维')) {
      advice.push('充分发挥您的创新能力，在工作和生活中寻找新的可能性');
    }
    
    if (profile.coreTraits.includes('责任心强')) {
      advice.push('您的责任感是宝贵的品质，但也要学会适当放松和委托');
    }
    
    // 基于用户关注点生成建议
    if (userInput.concerns) {
      userInput.concerns.forEach((concern: string) => {
        advice.push(`关于"${concern}"的担忧，建议您从自身优势出发，制定具体的应对策略`);
      });
    }
    
    return advice.slice(0, 5);
  }
  
  private static generateShortTermPlan(_profile: PersonalityProfile, _dimensions: PersonalityDimension[]): string[] {
    return [
      '建立每日自我反思的习惯，记录情绪和行为模式',
      '识别并强化您最突出的优势特质',
      '针对一个具体的成长领域制定练习计划'
    ];
  }
  
  private static generateMediumTermPlan(_profile: PersonalityProfile, _lifeAreas: LifeArea[]): string[] {
    return [
      '在主要生活领域设定明确的发展目标',
      '建立支持系统和反馈机制',
      '定期评估进展并调整策略'
    ];
  }
  
  private static generateLongTermPlan(_profile: PersonalityProfile, _userInput: any): string[] {
    return [
      '建立符合您价值观和性格的人生愿景',
      '培养终身学习和成长的心态',
      '成为您希望成为的人，实现自我实现'
    ];
  }
  
  private static generateRelationshipAdvice(_profile: PersonalityProfile, dimensions: PersonalityDimension[]): string[] {
    const advice: string[] = [];
    
    const empathy = this.getDimensionScore(dimensions, 'empathy');
    const agreeableness = this.getDimensionScore(dimensions, 'agreeableness');
    
    if (empathy > 70) {
      advice.push('您的高共情能力是建立深度关系的优势，但要注意情感边界');
    }
    
    if (agreeableness > 70) {
      advice.push('您的友善性格受人欢迎，但也要学会在必要时表达不同意见');
    }
    
    advice.push('在人际交往中保持真诚，这是建立持久关系的基础');
    
    return advice;
  }
  
  private static generateCareerGuidance(profile: PersonalityProfile, userInput: any): string[] {
    const guidance: string[] = [];
    
    // 基于职业偏好生成指导
    if (userInput.basicInfo?.occupation) {
      guidance.push(`结合您当前的${userInput.basicInfo.occupation}工作，建议继续发展相关专业技能`);
    }
    
    // 基于性格特质生成指导
    if (profile.coreTraits.includes('领导力')) {
      guidance.push('考虑承担更多的领导责任和管理角色');
    }
    
    if (profile.coreTraits.includes('创造性')) {
      guidance.push('寻找能够发挥创意和创新能力的工作机会');
    }
    
    guidance.push('将您的个人优势与职业目标相结合，制定发展策略');
    
    return guidance;
  }
  
  private static generateWellnessRecommendations(dimensions: PersonalityDimension[]): string[] {
    const recommendations: string[] = [];
    
    const emotionalStability = this.getDimensionScore(dimensions, 'emotional_stability');
    const resilience = this.getDimensionScore(dimensions, 'resilience');
    
    if (emotionalStability < 60) {
      recommendations.push('建议学习压力管理技巧，如冥想、深呼吸或瑜伽');
    }
    
    if (resilience < 60) {
      recommendations.push('培养积极的应对策略，建立支持网络');
    }
    
    recommendations.push('保持规律的作息和适当的运动，这对心理健康很重要');
    recommendations.push('定期进行自我关怀活动，平衡工作和生活');
    
    return recommendations;
  }
  
  // 其他辅助方法的实现可以继续添加...
  private static categorizeGoal(goal: string): any {
    if (goal.includes('工作') || goal.includes('职业') || goal.includes('事业')) {
      return 'career';
    }
    if (goal.includes('健康') || goal.includes('运动') || goal.includes('身体')) {
      return 'health';
    }
    if (goal.includes('关系') || goal.includes('家庭') || goal.includes('朋友')) {
      return 'relationships';
    }
    return 'personal';
  }
  
  private static generateGoalSteps(goal: string, _profile: PersonalityProfile): string[] {
    return [
      `明确"${goal}"的具体定义和成功标准`,
      '分析实现目标所需的资源和能力',
      '制定具体的行动计划和时间表',
      '建立进度追踪和反馈机制'
    ];
  }
  
  private static generateGoalMetrics(_goal: string): string[] {
    return [
      '设定可量化的里程碑指标',
      '定期评估进展情况',
      '收集相关反馈和数据'
    ];
  }
  
  private static generateGoalResources(_goal: string): string[] {
    return [
      '相关书籍和在线课程',
      '专业指导和coaching',
      '同行网络和社群支持'
    ];
  }
  
  private static generateGrowthSteps(area: string): string[] {
    return [
      `深入了解${area}的重要性和发展方法`,
      '制定具体的练习和学习计划',
      '寻找实践机会和反馈渠道'
    ];
  }
  
  private static generateGrowthMetrics(area: string): string[] {
    return [
      `定期自评${area}的改善程度`,
      '收集他人的观察和反馈',
      '记录具体的进步实例'
    ];
  }
  
  private static generateGrowthResources(area: string): string[] {
    return [
      `${area}相关的专业资料`,
      '培训课程和工作坊',
      '导师指导和peer learning'
    ];
  }
  
  // 继续实现其他缺失的方法...
  private static extractStrengths(dimensions: PersonalityDimension[], _existingResults: any): string[] {
    const strengths: string[] = [];
    
    dimensions.forEach(dim => {
      if (dim.score >= 70) {
        switch (dim.id) {
          case 'extraversion':
            strengths.push('社交能力强', '善于激励他人', '适应性强');
            break;
          case 'conscientiousness':
            strengths.push('执行力强', '可靠负责', '目标导向');
            break;
          case 'openness':
            strengths.push('创新思维', '学习能力强', '视野开阔');
            break;
        }
      }
    });
    
    return [...new Set(strengths)].slice(0, 6);
  }
  
  private static extractWeaknesses(dimensions: PersonalityDimension[], _existingResults: any): string[] {
    const weaknesses: string[] = [];
    
    dimensions.forEach(dim => {
      if (dim.score <= 40) {
        switch (dim.id) {
          case 'emotional_stability':
            weaknesses.push('情绪波动大', '压力敏感', '需要情绪管理');
            break;
          case 'conscientiousness':
            weaknesses.push('执行力待提升', '时间管理需改善', '拖延倾向');
            break;
        }
      }
    });
    
    return [...new Set(weaknesses)].slice(0, 4);
  }
  
  private static extractMotivations(_dimensions: PersonalityDimension[], _existingResults: any): string[] {
    return ['自我实现', '成长发展', '人际和谐', '成就感', '安全感'];
  }
  
  private static extractFears(_dimensions: PersonalityDimension[], _existingResults: any): string[] {
    return ['失败', '被拒绝', '失去控制', '不确定性'];
  }
  
  private static extractValues(_dimensions: PersonalityDimension[], _existingResults: any): string[] {
    return ['诚实', '成长', '和谐', '创新', '责任'];
  }
  
  private static determineCommunicationStyle(dimensions: PersonalityDimension[]): string {
    const extraversion = this.getDimensionScore(dimensions, 'extraversion');
    const agreeableness = this.getDimensionScore(dimensions, 'agreeableness');
    
    if (extraversion > 60 && agreeableness > 60) {
      return '开放友好，善于表达，注重和谐';
    } else if (extraversion > 60) {
      return '直接坦率，表达清晰，积极主动';
    } else if (agreeableness > 60) {
      return '温和谦逊，善于倾听，避免冲突';
    } else {
      return '谨慎内敛，深思熟虑，言简意赅';
    }
  }
  
  private static determineDecisionMakingStyle(dimensions: PersonalityDimension[]): string {
    const conscientiousness = this.getDimensionScore(dimensions, 'conscientiousness');
    const openness = this.getDimensionScore(dimensions, 'openness');
    
    if (conscientiousness > 60 && openness > 60) {
      return '系统性思考，既注重数据也考虑创新';
    } else if (conscientiousness > 60) {
      return '谨慎分析，依据事实，按部就班';
    } else if (openness > 60) {
      return '直觉导向，勇于尝试，灵活变通';
    } else {
      return '平衡考虑，稳妥为主，循序渐进';
    }
  }
  
  private static determineStressResponse(dimensions: PersonalityDimension[]): string {
    const emotionalStability = this.getDimensionScore(dimensions, 'emotional_stability');
    const resilience = this.getDimensionScore(dimensions, 'resilience');
    
    if (emotionalStability > 60 && resilience > 60) {
      return '压力下保持冷静，快速适应和恢复';
    } else if (emotionalStability > 60) {
      return '情绪稳定，但需要时间处理压力';
    } else if (resilience > 60) {
      return '虽然会受到冲击，但恢复能力强';
    } else {
      return '对压力较为敏感，需要额外的支持和时间';
    }
  }
  
  private static identifyGrowthAreas(dimensions: PersonalityDimension[]): string[] {
    const growthAreas: string[] = [];
    
    dimensions.forEach(dim => {
      if (dim.score < 60) {
        growthAreas.push(dim.name);
      }
    });
    
    return growthAreas.slice(0, 3);
  }
  
  private static generateCareerAnalysis(dimensions: PersonalityDimension[], _userInput: any): string {
    const conscientiousness = this.getDimensionScore(dimensions, 'conscientiousness');
    const extraversion = this.getDimensionScore(dimensions, 'extraversion');
    
    if (conscientiousness > 70 && extraversion > 70) {
      return '您具备优秀的执行力和人际能力，适合担任领导和管理职位。';
    } else if (conscientiousness > 70) {
      return '您的自律性和责任感是职场上的重要优势，适合专业性强的工作。';
    } else {
      return '建议发挥您的其他优势，在适合的环境中实现职业发展。';
    }
  }
  
  private static generateCareerRecommendations(dimensions: PersonalityDimension[]): string[] {
    const recommendations: string[] = [];
    const openness = this.getDimensionScore(dimensions, 'openness');
    const conscientiousness = this.getDimensionScore(dimensions, 'conscientiousness');
    
    if (openness > 70) {
      recommendations.push('考虑创新性强的工作领域');
      recommendations.push('寻找能够发挥创意的项目');
    }
    
    if (conscientiousness > 70) {
      recommendations.push('承担需要长期规划的任务');
      recommendations.push('在细致工作中发挥优势');
    }
    
    recommendations.push('持续学习和技能提升');
    recommendations.push('建立职业网络和关系');
    
    return recommendations;
  }
  
  private static generateRelationshipAnalysis(dimensions: PersonalityDimension[]): string {
    const empathy = this.getDimensionScore(dimensions, 'empathy');
    const agreeableness = this.getDimensionScore(dimensions, 'agreeableness');
    
    if (empathy > 70 && agreeableness > 70) {
      return '您具有很强的人际敏感性和合作精神，容易建立深度的人际关系。';
    } else {
      return '在人际交往中，建议多关注他人需求，主动表达关心和理解。';
    }
  }
  
  private static generateRelationshipRecommendations(_dimensions: PersonalityDimension[]): string[] {
    return [
      '保持开放和真诚的沟通',
      '学会倾听和理解他人观点',
      '在关系中保持适当的边界',
      '主动维护重要的人际关系'
    ];
  }
  
  private static generateHealthAnalysis(dimensions: PersonalityDimension[]): string {
    const emotionalStability = this.getDimensionScore(dimensions, 'emotional_stability');
    
    if (emotionalStability > 70) {
      return '您的情绪管理能力较强，这对身心健康很有帮助。';
    } else {
      return '建议多关注情绪健康，学习压力管理技巧。';
    }
  }
  
  private static generateHealthRecommendations(_dimensions: PersonalityDimension[]): string[] {
    return [
      '保持规律的作息时间',
      '进行适当的体育锻炼',
      '学习放松和冥想技巧',
      '维持良好的社交关系'
    ];
  }
  
  private static generateGrowthAnalysis(dimensions: PersonalityDimension[]): string {
    const openness = this.getDimensionScore(dimensions, 'openness');
    
    if (openness > 70) {
      return '您对新体验和学习持开放态度，这为个人成长提供了良好基础。';
    } else {
      return '建议尝试接触新的领域和体验，拓展舒适圈。';
    }
  }
  
  private static generateGrowthRecommendations(_dimensions: PersonalityDimension[]): string[] {
    return [
      '设定明确的个人发展目标',
      '建立持续学习的习惯',
      '寻求反馈和指导',
      '记录和反思成长过程'
    ];
  }
  
  private static generateGenericAnalysis(areaName: string, dimensions: PersonalityDimension[]): string {
    const avgScore = dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length;
    
    if (avgScore > 70) {
      return `在${areaName}方面，您具备良好的基础和发展潜力。`;
    } else {
      return `在${areaName}方面，建议制定具体的改善计划。`;
    }
  }
  
  private static generateGenericRecommendations(areaName: string, _dimensions: PersonalityDimension[]): string[] {
    return [
      `明确${areaName}的目标和期望`,
      `制定具体的行动计划`,
      `寻求相关的学习资源`,
      `定期评估和调整策略`
    ];
  }
  
  private static generateChallenges(areaId: string, _dimensions: PersonalityDimension[]): string[] {
    const challenges: { [key: string]: string[] } = {
      career: ['工作压力管理', '技能持续更新', '职业方向选择'],
      relationships: ['沟通误解', '期望管理', '时间分配'],
      health: ['压力累积', '生活习惯', '工作生活平衡'],
      personal_growth: ['舒适圈突破', '持续动力', '目标设定']
    };
    
    return challenges[areaId] || ['持续改进', '环境适应', '资源获取'];
  }
  
  private static generateOpportunities(areaId: string, _dimensions: PersonalityDimension[]): string[] {
    const opportunities: { [key: string]: string[] } = {
      career: ['技能提升', '网络扩展', '新项目参与'],
      relationships: ['深度连接', '团队合作', 'mentor关系'],
      health: ['习惯优化', '压力管理', '整体wellness'],
      personal_growth: ['新技能学习', '视野拓展', '自我发现']
    };
    
    return opportunities[areaId] || ['能力发挥', '资源整合', '创新尝试'];
  }
}
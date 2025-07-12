import React, { useState } from 'react';
import { MBTIType, MBTICareerMatch } from '../types';
import { MBTI_TYPE_DATA } from '../data/mbtiTypes';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface MBTICareerMatchProps {
  userType: MBTIType;
  onClose?: () => void;
}

// 职业数据库
const CAREER_DATABASE = {
  // 管理和商业
  management: {
    name: '管理与商业',
    careers: ['CEO', '总经理', '项目经理', '产品经理', '销售经理', '市场经理', '运营经理', '人力资源经理'],
    skills: ['领导能力', '沟通技巧', '决策能力', '团队协作', '战略思维'],
    environment: ['快节奏', '团队合作', '目标导向', '挑战性']
  },
  // 科技和工程
  technology: {
    name: '科技与工程',
    careers: ['软件工程师', '数据科学家', '系统架构师', '产品设计师', 'DevOps工程师', 'AI工程师', '网络工程师', '技术总监'],
    skills: ['逻辑思维', '问题解决', '技术专业', '创新能力', '持续学习'],
    environment: ['创新环境', '技术驱动', '独立工作', '持续学习']
  },
  // 创意和艺术
  creative: {
    name: '创意与艺术',
    careers: ['平面设计师', 'UI/UX设计师', '广告创意', '内容创作者', '摄影师', '视频制作', '音乐制作', '艺术总监'],
    skills: ['创意思维', '美学敏感', '表达能力', '创新精神', '审美能力'],
    environment: ['创意氛围', '自由度高', '项目导向', '多样化']
  },
  // 教育和培训
  education: {
    name: '教育与培训',
    careers: ['教师', '培训师', '教育顾问', '课程设计师', '学习发展专家', '教育技术专家', '在线教育', '企业培训'],
    skills: ['教学能力', '沟通技巧', '耐心', '知识传授', '激励能力'],
    environment: ['教学环境', '人际互动', '成长导向', '稳定性']
  },
  // 医疗和健康
  healthcare: {
    name: '医疗与健康',
    careers: ['医生', '心理咨询师', '护士', '物理治疗师', '营养师', '健康管理师', '医疗器械', '生物医学'],
    skills: ['专业知识', '同理心', '责任心', '沟通能力', '抗压能力'],
    environment: ['服务导向', '高责任', '团队合作', '专业性强']
  },
  // 金融和投资
  finance: {
    name: '金融与投资',
    careers: ['投资分析师', '财务经理', '银行家', '保险经纪', '风险管理', '会计师', '审计师', '金融顾问'],
    skills: ['数据分析', '风险评估', '财务知识', '决策能力', '沟通技巧'],
    environment: ['数据驱动', '高压环境', '精确性', '客户导向']
  },
  // 咨询和服务
  consulting: {
    name: '咨询与服务',
    careers: ['管理咨询师', '战略顾问', 'IT咨询师', '人力资源顾问', '客户服务', '销售顾问', '法律顾问', '财务顾问'],
    skills: ['分析能力', '沟通技巧', '问题解决', '专业知识', '客户服务'],
    environment: ['客户导向', '多样化', '挑战性', '专业发展']
  },
  // 媒体和传播
  media: {
    name: '媒体与传播',
    careers: ['记者', '编辑', '公关专员', '社交媒体经理', '品牌经理', '内容策划', '播音主持', '影视制作'],
    skills: ['写作能力', '表达能力', '创意思维', '时事敏感', '沟通技巧'],
    environment: ['快节奏', '创意驱动', '公众关注', '多样化']
  }
};

export const MBTICareerMatch: React.FC<MBTICareerMatchProps> = ({ userType, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [careerMatches, setCareerMatches] = useState<MBTICareerMatch[]>([]);

  const userTypeData = MBTI_TYPE_DATA[userType];

  const calculateCareerMatch = (category: string): MBTICareerMatch => {
    const categoryData = CAREER_DATABASE[category as keyof typeof CAREER_DATABASE];
    
    // 基于MBTI类型计算匹配度
    let matchScore = 50; // 基础分数
    
    // 根据不同MBTI类型调整匹配度
    switch (userType) {
      case 'INTJ':
      case 'INTP':
        if (category === 'technology' || category === 'consulting') matchScore += 30;
        if (category === 'management') matchScore += 20;
        break;
      case 'ENTJ':
      case 'ESTJ':
        if (category === 'management' || category === 'finance') matchScore += 30;
        if (category === 'consulting') matchScore += 20;
        break;
      case 'ENFP':
      case 'ENFJ':
        if (category === 'creative' || category === 'education') matchScore += 30;
        if (category === 'media') matchScore += 20;
        break;
      case 'ISFJ':
      case 'ESFJ':
        if (category === 'healthcare' || category === 'education') matchScore += 30;
        if (category === 'consulting') matchScore += 15;
        break;
      case 'ISTP':
      case 'ESTP':
        if (category === 'technology' || category === 'consulting') matchScore += 25;
        if (category === 'management') matchScore += 15;
        break;
      case 'ISFP':
      case 'ESFP':
        if (category === 'creative' || category === 'healthcare') matchScore += 30;
        if (category === 'media') matchScore += 20;
        break;
      default:
        matchScore += Math.random() * 20; // 随机调整
    }

    // 添加一些随机性
    matchScore += Math.random() * 15 - 7.5;
    matchScore = Math.max(20, Math.min(95, matchScore));

    const reasons = generateMatchReasons(userType, category);
    
    return {
      category: categoryData.name,
      jobs: categoryData.careers,
      matchScore: Math.round(matchScore),
      reasons,
      workEnvironment: categoryData.environment,
      skills: categoryData.skills
    };
  };

  const generateMatchReasons = (type: MBTIType, category: string): string[] => {
    const typeData = MBTI_TYPE_DATA[type];
    const reasons: string[] = [];

    // 基于性格特征生成匹配原因
    if (category === 'technology') {
      if (type.includes('NT')) {
        reasons.push('逻辑思维强，适合技术问题解决');
        reasons.push('创新能力强，能跟上技术发展');
      }
      if (type.includes('I')) {
        reasons.push('适合独立工作，专注于技术深度');
      }
    }
    
    if (category === 'management') {
      if (type.includes('E')) {
        reasons.push('外向特质适合团队领导');
        reasons.push('善于沟通协调，能激励团队');
      }
      if (type.includes('J')) {
        reasons.push('组织能力强，善于计划和执行');
      }
    }
    
    if (category === 'creative') {
      if (type.includes('N')) {
        reasons.push('直觉思维强，富有创意和想象力');
        reasons.push('善于发现新的可能性和机会');
      }
      if (type.includes('F')) {
        reasons.push('重视美感和情感表达');
      }
    }
    
    if (category === 'education') {
      if (type.includes('F')) {
        reasons.push('关怀他人，有教育他人的热情');
        reasons.push('善于理解和引导他人成长');
      }
      if (type.includes('J')) {
        reasons.push('有条理，善于结构化知识传授');
      }
    }
    
    if (category === 'healthcare') {
      if (type.includes('F')) {
        reasons.push('富有同情心，关心他人健康');
        reasons.push('善于建立信任关系');
      }
      if (type.includes('S')) {
        reasons.push('注重实际，关注具体的健康需求');
      }
    }
    
    if (category === 'finance') {
      if (type.includes('T')) {
        reasons.push('逻辑分析能力强，适合数据分析');
        reasons.push('客观理性，能做出明智决策');
      }
      if (type.includes('J')) {
        reasons.push('有条理，善于风险管理');
      }
    }
    
    if (category === 'consulting') {
      if (type.includes('E')) {
        reasons.push('善于与客户沟通，建立良好关系');
      }
      if (type.includes('N')) {
        reasons.push('善于发现问题和机会');
        reasons.push('能提供创新解决方案');
      }
    }
    
    if (category === 'media') {
      if (type.includes('E')) {
        reasons.push('善于表达，适合公众沟通');
      }
      if (type.includes('N')) {
        reasons.push('创意思维强，能创造吸引人的内容');
      }
    }

    // 确保至少有3个原因
    while (reasons.length < 3) {
      reasons.push(`${typeData.name}类型的特质与此领域需求匹配`);
    }

    return reasons.slice(0, 4);
  };

  const analyzeAllCareers = () => {
    const matches = Object.keys(CAREER_DATABASE).map(category => 
      calculateCareerMatch(category)
    );
    
    // 按匹配度排序
    matches.sort((a, b) => b.matchScore - a.matchScore);
    setCareerMatches(matches);
  };

  const getMatchColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBadge = (score: number): string => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">职业匹配分析</h2>
              <p className="text-gray-600 mt-1">
                基于您的 {userType} - {userTypeData.name} 类型特征
              </p>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* 用户类型概览 */}
          <Card variant="outline" className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">核心优势</h4>
                  <ul className="text-sm space-y-1">
                    {userTypeData.strengths.slice(0, 3).map((strength, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">工作风格</h4>
                  <p className="text-sm text-gray-700">{userTypeData.workStyle}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">激励因素</h4>
                  <ul className="text-sm space-y-1">
                    {userTypeData.motivations.slice(0, 2).map((motivation, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {motivation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 分析按钮 */}
          <div className="text-center mb-6">
            <Button onClick={analyzeAllCareers} className="px-8 py-3">
              开始职业匹配分析
            </Button>
          </div>

          {/* 职业匹配结果 */}
          {careerMatches.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">职业匹配结果</h3>
              
              {careerMatches.map((match, index) => (
                <Card key={index} variant="outline" className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{match.category}</h4>
                      <div className="flex items-center mt-2">
                        <span className={`text-2xl font-bold mr-2 ${getMatchColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getMatchBadge(match.matchScore)}`}>
                          {match.matchScore >= 80 ? '高度匹配' : 
                           match.matchScore >= 60 ? '中度匹配' : '低度匹配'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">排名</div>
                      <div className="text-xl font-bold text-blue-600">#{index + 1}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-2">匹配原因</h5>
                      <ul className="space-y-1">
                        {match.reasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5"></span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">具体职位</h5>
                      <div className="flex flex-wrap gap-2">
                        {match.jobs.slice(0, 6).map((job, jobIndex) => (
                          <span key={jobIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {job}
                          </span>
                        ))}
                        {match.jobs.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{match.jobs.length - 6} 更多
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">所需技能</h5>
                        <div className="flex flex-wrap gap-2">
                          {match.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">工作环境</h5>
                        <div className="flex flex-wrap gap-2">
                          {match.workEnvironment.map((env, envIndex) => (
                            <span key={envIndex} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                              {env}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MBTICareerMatch;
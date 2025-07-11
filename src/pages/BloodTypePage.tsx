import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../stores/useThemeStore';

export const BloodTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null);

  const bloodTypes = [
    {
      type: 'A',
      name: 'A型血',
      emoji: '🅰️',
      percentage: '37%',
      traits: ['完美主义', '责任感强', '细心谨慎', '团队合作'],
      personality: '追求完美，注重细节，有强烈的责任感和集体意识。性格较为内向，善于倾听他人意见。',
      strengths: ['组织能力强', '做事认真负责', '善于合作', '注重规则'],
      weaknesses: ['过于拘谨', '容易焦虑', '缺乏冒险精神', '过分追求完美'],
      career: ['会计师', '教师', '医生', '工程师', '研究员'],
      love: '在感情中比较被动，需要时间建立信任，一旦确定关系会非常专一。',
      color: 'from-red-500 to-rose-600'
    },
    {
      type: 'B',
      name: 'B型血',
      emoji: '🅱️',
      percentage: '22%',
      traits: ['自由奔放', '创造力强', '乐观开朗', '适应性强'],
      personality: '性格开朗活泼，富有创造力和想象力。喜欢自由自在的生活，不喜欢被束缚。',
      strengths: ['创新能力强', '适应性好', '乐观积极', '表达能力强'],
      weaknesses: ['缺乏耐心', '容易冲动', '不够专注', '有时显得自私'],
      career: ['艺术家', '设计师', '销售员', '记者', '演员'],
      love: '在感情中比较主动，喜欢浪漫和新鲜感，但有时会显得不够稳定。',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      type: 'O',
      name: 'O型血',
      emoji: '🅾️',
      percentage: '31%',
      traits: ['领导能力', '意志坚强', '现实主义', '竞争意识'],
      personality: '天生的领导者，意志坚强，目标明确。具有强烈的竞争意识和现实主义倾向。',
      strengths: ['领导能力强', '意志坚定', '目标明确', '执行力强'],
      weaknesses: ['过于强势', '缺乏耐心', '容易冲动', '有时显得固执'],
      career: ['企业家', '管理者', '律师', '政治家', '运动员'],
      love: '在感情中比较直接，喜欢主导关系，对伴侣有较强的保护欲。',
      color: 'from-orange-500 to-amber-600'
    },
    {
      type: 'AB',
      name: 'AB型血',
      emoji: '🆎',
      percentage: '10%',
      traits: ['理性思考', '多重性格', '神秘复杂', '适应能力'],
      personality: '性格复杂多变，既有A型的细心又有B型的创造力。理性思考，善于分析问题。',
      strengths: ['理性客观', '适应性强', '思维敏捷', '善于分析'],
      weaknesses: ['性格多变', '难以捉摸', '有时冷漠', '缺乏持久力'],
      career: ['分析师', '咨询师', '心理学家', '科学家', '外交官'],
      love: '在感情中比较理性，需要精神上的共鸣，有时会显得难以理解。',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const compatibilityMatrix = {
    'A': { best: ['A', 'AB'], good: ['O'], difficult: ['B'] },
    'B': { best: ['B', 'AB'], good: ['O'], difficult: ['A'] },
    'O': { best: ['O'], good: ['A', 'B'], difficult: ['AB'] },
    'AB': { best: ['AB'], good: ['A', 'B'], difficult: ['O'] }
  };

  const selectedType = bloodTypes.find(bt => bt.type === selectedBloodType);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-red-900 to-slate-900'
        : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
              theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-red-500 to-rose-600'
            }`}>
              🩸
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              血型性格分析
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              基于血型心理学理论，探索不同血型的性格特征与行为模式
            </p>
          </div>

          {/* 血型选择 */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              选择你的血型
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {bloodTypes.map((bloodType) => (
                <div
                  key={bloodType.type}
                  onClick={() => setSelectedBloodType(bloodType.type)}
                  className={`rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedBloodType === bloodType.type
                      ? theme === 'dark'
                        ? `bg-gradient-to-br ${bloodType.color} text-white`
                        : `bg-gradient-to-br ${bloodType.color} text-white`
                      : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-3">{bloodType.emoji}</div>
                  <h3 className="font-bold text-lg mb-2">{bloodType.name}</h3>
                  <p className="text-sm opacity-80">人口占比: {bloodType.percentage}</p>
                  <div className="mt-3 flex flex-wrap gap-1 justify-center">
                    {bloodType.traits.slice(0, 2).map((trait, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-white/20">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedBloodType}
                className={`bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-red-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                  !selectedBloodType && 'opacity-50 cursor-not-allowed'
                }`}
              >
                查看详细分析
              </Button>
              <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedBloodType ? '点击查看详细性格分析' : '请先选择您的血型'}
              </p>
            </div>
          </div>

          {/* 详细分析 */}
          {selectedType && (
            <div className={`rounded-2xl p-6 sm:p-8 mb-12 ${
              theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-xl'
            }`}>
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${selectedType.color} flex items-center justify-center text-3xl`}>
                  {selectedType.emoji}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedType.name} 性格分析
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedType.personality}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-bold mb-3 text-green-600 ${theme === 'dark' ? 'text-green-400' : ''}`}>
                    ✅ 优势特质
                  </h4>
                  <ul className="space-y-2">
                    {selectedType.strengths.map((strength, index) => (
                      <li key={index} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-bold mb-3 text-orange-600 ${theme === 'dark' ? 'text-orange-400' : ''}`}>
                    ⚠️ 需要注意
                  </h4>
                  <ul className="space-y-2">
                    {selectedType.weaknesses.map((weakness, index) => (
                      <li key={index} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        • {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`rounded-xl p-6 ${
                  theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-bold mb-3 text-blue-600 ${theme === 'dark' ? 'text-blue-400' : ''}`}>
                    💼 适合职业
                  </h4>
                  <ul className="space-y-2">
                    {selectedType.career.map((job, index) => (
                      <li key={index} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        • {job}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`mt-6 p-6 rounded-xl ${
                theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-gray-50'
              }`}>
                <h4 className={`font-bold mb-3 text-pink-600 ${theme === 'dark' ? 'text-pink-400' : ''}`}>
                  💕 感情特点
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedType.love}
                </p>
              </div>
            </div>
          )}

          {/* 血型知识 */}
          <div className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              血型基础知识
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                }`}>
                  🧬
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  血型遗传
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  血型由父母的基因决定，ABO血型系统是最常见的血型分类方法，每种血型都有其独特的抗原特征。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  🧠
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  性格理论
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  血型性格学说认为不同血型的人具有不同的性格特征，这一理论在日本和韩国等地区较为流行。
                </p>
              </div>

              <div className={`rounded-xl p-6 ${
                theme === 'dark' ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}>
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl ${
                  theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  📊
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  科学观点
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  虽然血型性格理论缺乏严格的科学证据，但作为一种有趣的性格分析方法，可以帮助我们更好地了解自己。
                </p>
              </div>
            </div>
          </div>

          {/* 底部导航 */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className={`${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← 返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

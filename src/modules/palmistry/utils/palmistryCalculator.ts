import { 
  PalmistryInput, 
  FaceReadingInput, 
  PalmistryResult, 
  FaceReadingResult,
  ReadingSession,
  ReadingType
} from '../types';
import { palmistryDatabase } from '../data/palmistryData';

export class PalmistryCalculator {
  // 生成手相分析结果
  static generatePalmistryResult(input: PalmistryInput): PalmistryResult {
    // 确定手型
    const handShape = this.determineHandShape(input.handShape);
    
    // 分析主要线条
    const dominantLines = this.analyzeLines(input.lines);
    
    // 分析手掌丘位
    const mounts = this.analyzeMounts(input.mounts);
    
    // 生成综合分析
    const overallPersonality = this.synthesizePalmistryPersonality(
      handShape, 
      dominantLines, 
      mounts
    );
    
    // 生成建议
    const advice = this.generatePalmistryAdvice(handShape, dominantLines, mounts);
    
    // 计算置信度
    const confidence = this.calculatePalmistryConfidence(input);
    
    return {
      id: this.generateId(),
      timestamp: new Date(),
      handShape,
      dominantLines,
      mounts,
      overallPersonality,
      advice,
      confidence
    };
  }
  
  // 生成面相分析结果
  static generateFaceReadingResult(input: FaceReadingInput): FaceReadingResult {
    // 确定脸型
    const faceShape = this.determineFaceShape(input.faceShape);
    
    // 分析面部特征
    const features = this.analyzeFeatures(input.features);
    
    // 生成综合分析
    const overallPersonality = this.synthesizeFacePersonality(faceShape, features);
    
    // 生成建议
    const advice = this.generateFaceAdvice(faceShape, features);
    
    // 计算置信度
    const confidence = this.calculateFaceConfidence(input);
    
    return {
      id: this.generateId(),
      timestamp: new Date(),
      faceShape,
      features,
      overallPersonality,
      advice,
      confidence
    };
  }
  
  // 创建综合分析会话
  static createReadingSession(
    type: ReadingType,
    palmistryResult?: PalmistryResult,
    faceReadingResult?: FaceReadingResult
  ): ReadingSession {
    const session: ReadingSession = {
      id: this.generateId(),
      type,
      startTime: new Date(),
      palmistryResult,
      faceReadingResult
    };
    
    if (type === 'both' && palmistryResult && faceReadingResult) {
      session.combinedAnalysis = this.generateCombinedAnalysis(
        palmistryResult,
        faceReadingResult
      );
    }
    
    return session;
  }
  
  // 确定手型
  private static determineHandShape(handShape: PalmistryInput['handShape']) {
    const { palmShape, fingerLength, palmWidth } = handShape;
    
    // 基于输入特征匹配手型
    for (const shape of palmistryDatabase.handShapes) {
      const characteristics = shape.characteristics;
      if (
        characteristics.palmShape === palmShape &&
        characteristics.fingerLength === fingerLength &&
        characteristics.palmWidth === palmWidth
      ) {
        return shape;
      }
    }
    
    // 如果没有完全匹配，返回最相似的
    return palmistryDatabase.handShapes.find(shape => 
      shape.characteristics.palmShape === palmShape
    ) || palmistryDatabase.handShapes[0];
  }
  
  // 分析线条
  private static analyzeLines(lines: PalmistryInput['lines']) {
    const dominantLines = [];
    
    // 分析生命线
    if (lines.lifeLine.depth === 'deep' && lines.lifeLine.clarity === 'clear') {
      const lifeLine = palmistryDatabase.palmLines.find(line => line.id === 'life-line');
      if (lifeLine) {
        dominantLines.push({
          ...lifeLine,
          characteristics: lines.lifeLine
        });
      }
    }
    
    // 分析感情线
    if (lines.heartLine.depth === 'deep' && lines.heartLine.clarity === 'clear') {
      const heartLine = palmistryDatabase.palmLines.find(line => line.id === 'heart-line');
      if (heartLine) {
        dominantLines.push({
          ...heartLine,
          characteristics: lines.heartLine
        });
      }
    }
    
    // 分析智慧线
    if (lines.headLine.depth === 'deep' && lines.headLine.clarity === 'clear') {
      const headLine = palmistryDatabase.palmLines.find(line => line.id === 'head-line');
      if (headLine) {
        dominantLines.push({
          ...headLine,
          characteristics: lines.headLine
        });
      }
    }
    
    // 分析事业线
    if (lines.fateLine.depth === 'deep' && lines.fateLine.clarity === 'clear') {
      const fateLine = palmistryDatabase.palmLines.find(line => line.id === 'fate-line');
      if (fateLine) {
        dominantLines.push({
          ...fateLine,
          characteristics: lines.fateLine
        });
      }
    }
    
    return dominantLines;
  }
  
  // 分析手掌丘位
  private static analyzeMounts(mounts: PalmistryInput['mounts']) {
    const significantMounts = [];
    
    Object.entries(mounts).forEach(([mountName, development]) => {
      if (development === 'overdeveloped' || development === 'normal') {
        const mount = palmistryDatabase.palmMounts.find(m => 
          m.id === `${mountName}-mount`
        );
        if (mount) {
          significantMounts.push({
            ...mount,
            characteristics: {
              ...mount.characteristics,
              development: development as any
            }
          });
        }
      }
    });
    
    return significantMounts;
  }
  
  // 确定脸型
  private static determineFaceShape(faceShape: FaceReadingInput['faceShape']) {
    const { width, length, jawline, cheekbones } = faceShape;
    
    // 基于输入特征匹配脸型
    for (const shape of palmistryDatabase.faceShapes) {
      const characteristics = shape.characteristics;
      if (
        characteristics.width === width &&
        characteristics.length === length &&
        characteristics.jawline === jawline &&
        characteristics.cheekbones === cheekbones
      ) {
        return shape;
      }
    }
    
    // 如果没有完全匹配，根据主要特征匹配
    return palmistryDatabase.faceShapes.find(shape => 
      shape.characteristics.width === width && 
      shape.characteristics.length === length
    ) || palmistryDatabase.faceShapes[0];
  }
  
  // 分析面部特征
  private static analyzeFeatures(features: FaceReadingInput['features']) {
    const significantFeatures = [];
    
    Object.entries(features).forEach(([featureName, featureData]) => {
      if (featureData.size === 'large' || featureData.size === 'medium') {
        const feature = palmistryDatabase.faceFeatures.find(f => 
          f.id.includes(featureName) && f.characteristics.size === featureData.size
        );
        if (feature) {
          significantFeatures.push({
            ...feature,
            characteristics: {
              ...feature.characteristics,
              ...featureData
            }
          });
        }
      }
    });
    
    return significantFeatures;
  }
  
  // 综合手相性格分析
  private static synthesizePalmistryPersonality(handShape: any, lines: any[], mounts: any[]) {
    const traits = [...handShape.personality.traits];
    const strengths = [...handShape.personality.strengths];
    const challenges = [...handShape.personality.challenges];
    const career = [...handShape.personality.career];
    
    // 从线条中提取特征
    lines.forEach(line => {
      traits.push(...line.interpretation.positive.slice(0, 2));
      if (line.id === 'heart-line') {
        career.push(...['情感咨询', '人际关系']);
      }
    });
    
    // 从手掌丘位中提取特征
    mounts.forEach(mount => {
      traits.push(...mount.interpretation.personality.slice(0, 2));
      strengths.push(...mount.interpretation.strengths.slice(0, 2));
      challenges.push(...mount.interpretation.challenges.slice(0, 2));
    });
    
    return {
      traits: [...new Set(traits)].slice(0, 8),
      strengths: [...new Set(strengths)].slice(0, 6),
      challenges: [...new Set(challenges)].slice(0, 6),
      career: [...new Set(career)].slice(0, 8),
      relationships: handShape.personality.relationships,
      health: this.generateHealthAdvice(lines),
      fortune: this.generateFortuneAdvice(mounts)
    };
  }
  
  // 综合面相性格分析
  private static synthesizeFacePersonality(faceShape: any, features: any[]) {
    const traits = [...faceShape.personality.traits];
    const strengths = [...faceShape.personality.strengths];
    const challenges = [...faceShape.personality.challenges];
    const career = [...faceShape.personality.career];
    
    // 从面部特征中提取特征
    features.forEach(feature => {
      traits.push(...feature.interpretation.personality.slice(0, 2));
      career.push(...feature.interpretation.career.slice(0, 2));
    });
    
    return {
      traits: [...new Set(traits)].slice(0, 8),
      strengths: [...new Set(strengths)].slice(0, 6),
      challenges: [...new Set(challenges)].slice(0, 6),
      career: [...new Set(career)].slice(0, 8),
      relationships: features.find(f => f.id.includes('eyes'))?.interpretation.relationships || '需要深入了解',
      health: this.generateHealthAdviceFromFeatures(features),
      fortune: this.generateFortuneAdviceFromFeatures(features)
    };
  }
  
  // 生成手相建议
  private static generatePalmistryAdvice(handShape: any, lines: any[], mounts: any[]) {
    const advice = [
      `作为${handShape.chineseName}的人，建议你${handShape.personality.traits[0]}的同时，注意平衡其他方面的发展。`,
      '在事业发展中，要充分发挥你的优势，同时注意弥补不足之处。',
      '在人际关系中，要善于运用你的天赋，但也要学会倾听他人的意见。'
    ];
    
    if (lines.length > 2) {
      advice.push('你的手相显示出较强的综合能力，建议在多个领域都有所涉猎。');
    }
    
    if (mounts.length > 2) {
      advice.push('你的手掌丘位发达，说明你有多方面的天赋，要善于挖掘和发挥。');
    }
    
    return advice;
  }
  
  // 生成面相建议
  private static generateFaceAdvice(faceShape: any, features: any[]) {
    const advice = [
      `作为${faceShape.chineseName}的人，建议你发挥${faceShape.personality.traits[0]}的优势，注意${faceShape.personality.challenges[0]}的改善。`,
      '在职业选择上，可以考虑与你的性格特质相符的领域。',
      '在人际交往中，要善于表达自己的想法，同时也要倾听他人的观点。'
    ];
    
    if (features.some(f => f.id.includes('eyes'))) {
      advice.push('你的眼睛特征显示出强烈的表达能力，要善于运用这一优势。');
    }
    
    if (features.some(f => f.id.includes('nose'))) {
      advice.push('你的鼻子特征表明你有较强的意志力，要在关键时刻发挥这一特质。');
    }
    
    return advice;
  }
  
  // 生成综合分析
  private static generateCombinedAnalysis(
    palmistryResult: PalmistryResult, 
    faceReadingResult: FaceReadingResult
  ) {
    const consistency = this.calculateConsistency(palmistryResult, faceReadingResult);
    const conflictingAspects = this.findConflictingAspects(palmistryResult, faceReadingResult);
    const reinforcingAspects = this.findReinforcingAspects(palmistryResult, faceReadingResult);
    
    return {
      consistency,
      conflictingAspects,
      reinforcingAspects,
      overallAssessment: this.generateOverallAssessment(consistency, conflictingAspects, reinforcingAspects),
      advice: this.generateCombinedAdvice(palmistryResult, faceReadingResult)
    };
  }
  
  // 计算一致性
  private static calculateConsistency(palmResult: PalmistryResult, faceResult: FaceReadingResult) {
    const palmTraits = palmResult.overallPersonality.traits;
    const faceTraits = faceResult.overallPersonality.traits;
    
    const commonTraits = palmTraits.filter(trait => 
      faceTraits.some(faceTrait => 
        faceTrait.includes(trait) || trait.includes(faceTrait)
      )
    );
    
    return Math.round((commonTraits.length / Math.max(palmTraits.length, faceTraits.length)) * 100);
  }
  
  // 查找冲突方面
  private static findConflictingAspects(palmResult: PalmistryResult, faceResult: FaceReadingResult) {
    const conflicts = [];
    
    // 比较性格特质
    const palmTraits = palmResult.overallPersonality.traits;
    const faceTraits = faceResult.overallPersonality.traits;
    
    if (palmTraits.includes('内向') && faceTraits.includes('外向')) {
      conflicts.push('手相显示内向特质，但面相显示外向特质');
    }
    
    if (palmTraits.includes('理性') && faceTraits.includes('感性')) {
      conflicts.push('手相显示理性倾向，但面相显示感性倾向');
    }
    
    return conflicts;
  }
  
  // 查找强化方面
  private static findReinforcingAspects(palmResult: PalmistryResult, faceResult: FaceReadingResult) {
    const reinforcing = [];
    
    const palmTraits = palmResult.overallPersonality.traits;
    const faceTraits = faceResult.overallPersonality.traits;
    
    // 查找共同特质
    palmTraits.forEach(palmTrait => {
      faceTraits.forEach(faceTrait => {
        if (palmTrait === faceTrait || palmTrait.includes(faceTrait) || faceTrait.includes(palmTrait)) {
          reinforcing.push(`手相和面相都显示${palmTrait}的特质`);
        }
      });
    });
    
    return [...new Set(reinforcing)];
  }
  
  // 生成整体评估
  private static generateOverallAssessment(consistency: number, conflicts: string[], reinforcing: string[]) {
    if (consistency >= 70) {
      return '你的手相和面相显示出高度的一致性，说明你的性格特质较为稳定和统一。';
    } else if (consistency >= 50) {
      return '你的手相和面相显示出中等程度的一致性，说明你的性格既有稳定的一面，也有变化的一面。';
    } else {
      return '你的手相和面相显示出一些差异，说明你的性格比较复杂多面，在不同情况下可能表现出不同的特质。';
    }
  }
  
  // 生成综合建议
  private static generateCombinedAdvice(palmResult: PalmistryResult, faceResult: FaceReadingResult) {
    const advice = [
      '综合你的手相和面相分析，建议你在发展过程中注意平衡各方面的特质。',
      '你的优势在于多面性，可以在不同的环境中发挥不同的优势。',
      '在做重要决策时，要充分考虑你性格的不同侧面。'
    ];
    
    // 结合具体建议
    advice.push(...palmResult.advice.slice(0, 2));
    advice.push(...faceResult.advice.slice(0, 2));
    
    return [...new Set(advice)];
  }
  
  // 辅助方法
  private static generateHealthAdvice(lines: any[]) {
    const lifeLine = lines.find(line => line.id === 'life-line');
    if (lifeLine) {
      return lifeLine.interpretation.health;
    }
    return '建议保持良好的生活习惯，注意身体健康。';
  }
  
  private static generateFortuneAdvice(mounts: any[]) {
    if (mounts.length > 2) {
      return '你的手掌丘位发达，说明你有良好的运势，要善于把握机会。';
    }
    return '建议通过努力和坚持来创造好的运势。';
  }
  
  private static generateHealthAdviceFromFeatures(features: any[]) {
    const eyesFeature = features.find(f => f.id.includes('eyes'));
    if (eyesFeature) {
      return eyesFeature.interpretation.health;
    }
    return '注意保持健康的生活方式。';
  }
  
  private static generateFortuneAdviceFromFeatures(features: any[]) {
    const noseFeature = features.find(f => f.id.includes('nose'));
    if (noseFeature) {
      return noseFeature.interpretation.fortune;
    }
    return '通过努力和坚持可以获得好的运势。';
  }
  
  private static calculatePalmistryConfidence(input: PalmistryInput) {
    let confidence = 0.7; // 基础置信度
    
    // 根据输入的完整性调整置信度
    if (input.lines.lifeLine.clarity === 'clear') confidence += 0.1;
    if (input.lines.heartLine.clarity === 'clear') confidence += 0.1;
    if (input.lines.headLine.clarity === 'clear') confidence += 0.05;
    if (input.lines.fateLine.clarity === 'clear') confidence += 0.05;
    
    return Math.min(confidence, 1.0);
  }
  
  private static calculateFaceConfidence(input: FaceReadingInput) {
    let confidence = 0.7; // 基础置信度
    
    // 根据输入的完整性调整置信度
    if (input.features.eyes.symmetry === 'symmetrical') confidence += 0.1;
    if (input.features.nose.symmetry === 'symmetrical') confidence += 0.1;
    if (input.features.mouth.symmetry === 'symmetrical') confidence += 0.05;
    if (input.features.eyebrows.symmetry === 'symmetrical') confidence += 0.05;
    
    return Math.min(confidence, 1.0);
  }
  
  private static generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
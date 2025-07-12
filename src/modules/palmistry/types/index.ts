export interface PalmLine {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  characteristics: {
    length: 'short' | 'medium' | 'long';
    depth: 'shallow' | 'medium' | 'deep';
    clarity: 'clear' | 'broken' | 'chained' | 'faint';
    branches: boolean;
    islands: boolean;
  };
  interpretation: {
    positive: string[];
    negative: string[];
    career: string;
    health: string;
    relationships: string;
    personality: string;
  };
}

export interface PalmMount {
  id: string;
  name: string;
  chineseName: string;
  location: string;
  description: string;
  characteristics: {
    development: 'underdeveloped' | 'normal' | 'overdeveloped';
    firmness: 'soft' | 'medium' | 'firm';
  };
  interpretation: {
    meaning: string;
    personality: string[];
    career: string;
    strengths: string[];
    challenges: string[];
  };
}

export interface HandShape {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  characteristics: {
    palmShape: 'square' | 'rectangle' | 'oval' | 'round';
    fingerLength: 'short' | 'medium' | 'long';
    palmWidth: 'narrow' | 'medium' | 'wide';
  };
  personality: {
    traits: string[];
    strengths: string[];
    challenges: string[];
    career: string[];
    relationships: string;
  };
}

export interface FaceFeature {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  characteristics: {
    shape: string;
    size: 'small' | 'medium' | 'large';
    position: string;
    symmetry: 'symmetrical' | 'asymmetrical';
  };
  interpretation: {
    personality: string[];
    career: string[];
    health: string;
    relationships: string;
    fortune: string;
  };
}

export interface FaceShape {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  characteristics: {
    width: 'narrow' | 'medium' | 'wide';
    length: 'short' | 'medium' | 'long';
    jawline: 'sharp' | 'round' | 'square';
    cheekbones: 'prominent' | 'medium' | 'subtle';
  };
  personality: {
    traits: string[];
    strengths: string[];
    challenges: string[];
    career: string[];
    compatibility: string[];
  };
}

export interface PalmistryResult {
  id: string;
  timestamp: Date;
  handShape: HandShape;
  dominantLines: PalmLine[];
  mounts: PalmMount[];
  overallPersonality: {
    traits: string[];
    strengths: string[];
    challenges: string[];
    career: string[];
    relationships: string;
    health: string;
    fortune: string;
  };
  advice: string[];
  confidence: number;
}

export interface FaceReadingResult {
  id: string;
  timestamp: Date;
  faceShape: FaceShape;
  features: FaceFeature[];
  overallPersonality: {
    traits: string[];
    strengths: string[];
    challenges: string[];
    career: string[];
    relationships: string;
    health: string;
    fortune: string;
  };
  advice: string[];
  confidence: number;
}

export interface PalmistryInput {
  handShape: {
    palmShape: string;
    fingerLength: string;
    palmWidth: string;
  };
  lines: {
    lifeLine: {
      length: string;
      depth: string;
      clarity: string;
      branches: boolean;
      islands: boolean;
    };
    heartLine: {
      length: string;
      depth: string;
      clarity: string;
      branches: boolean;
      islands: boolean;
    };
    headLine: {
      length: string;
      depth: string;
      clarity: string;
      branches: boolean;
      islands: boolean;
    };
    fateLine: {
      length: string;
      depth: string;
      clarity: string;
      branches: boolean;
      islands: boolean;
    };
  };
  mounts: {
    venus: string;
    jupiter: string;
    saturn: string;
    apollo: string;
    mercury: string;
    mars: string;
    luna: string;
  };
}

export interface FaceReadingInput {
  faceShape: {
    width: string;
    length: string;
    jawline: string;
    cheekbones: string;
  };
  features: {
    eyes: {
      shape: string;
      size: string;
      position: string;
      symmetry: string;
    };
    nose: {
      shape: string;
      size: string;
      position: string;
      symmetry: string;
    };
    mouth: {
      shape: string;
      size: string;
      position: string;
      symmetry: string;
    };
    eyebrows: {
      shape: string;
      size: string;
      position: string;
      symmetry: string;
    };
    ears: {
      shape: string;
      size: string;
      position: string;
      symmetry: string;
    };
  };
}

export type ReadingType = 'palmistry' | 'face-reading' | 'both';

export interface ReadingSession {
  id: string;
  type: ReadingType;
  startTime: Date;
  endTime?: Date;
  palmistryResult?: PalmistryResult;
  faceReadingResult?: FaceReadingResult;
  combinedAnalysis?: {
    consistency: number;
    conflictingAspects: string[];
    reinforcingAspects: string[];
    overallAssessment: string;
    advice: string[];
  };
}
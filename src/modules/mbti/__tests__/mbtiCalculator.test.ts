import { describe, it, expect } from 'vitest'
import { calculateMBTIResult, getMBTITypeDescription, getDetailedMBTIAnalysis } from '../utils/mbtiCalculator'
import { MBTIAnswer } from '../types'

describe('MBTI Calculator Functions', () => {
  const mockAnswers: MBTIAnswer[] = [
    {
      questionId: 1,
      answer: 'A',
      timestamp: new Date()
    },
    {
      questionId: 2,
      answer: 'B',
      timestamp: new Date()
    },
    {
      questionId: 3,
      answer: 'A',
      timestamp: new Date()
    },
    {
      questionId: 4,
      answer: 'A',
      timestamp: new Date()
    }
  ]

  describe('calculateMBTIResult', () => {
    it('calculates MBTI type correctly', () => {
      const result = calculateMBTIResult(mockAnswers, 'quick')

      expect(result.type).toMatch(/^[EI][SN][TF][JP]$/)
      expect(result.dimensions).toBeDefined()
      expect(result.confidence).toBeGreaterThan(0)
      expect(result.confidence).toBeLessThanOrEqual(100)
      expect(result.completedAt).toBeInstanceOf(Date)
    })

    it('calculates confidence score', () => {
      const result = calculateMBTIResult(mockAnswers, 'quick')

      expect(result.confidence).toBeGreaterThan(0)
      expect(result.confidence).toBeLessThanOrEqual(100)
    })

    it('handles different test modes', () => {
      const quickResult = calculateMBTIResult(mockAnswers, 'quick')
      const standardResult = calculateMBTIResult(mockAnswers, 'standard')

      expect(quickResult.type).toMatch(/^[EI][SN][TF][JP]$/)
      expect(standardResult.type).toMatch(/^[EI][SN][TF][JP]$/)
    })
  })

  describe('getMBTITypeDescription', () => {
    it('returns description for valid MBTI type', () => {
      const description = getMBTITypeDescription('INTJ' as any)

      expect(description).toBeDefined()
      expect(description.name).toBeTruthy()
      expect(description.traits).toBeInstanceOf(Array)
      expect(description.strengths).toBeInstanceOf(Array)
      expect(description.weaknesses).toBeInstanceOf(Array)
    })

    it('handles all 16 MBTI types', () => {
      const types = [
        'INTJ', 'INTP', 'ENTJ', 'ENTP',
        'INFJ', 'INFP', 'ENFJ', 'ENFP',
        'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
        'ISTP', 'ISFP', 'ESTP', 'ESFP'
      ]

      types.forEach(type => {
        const description = getMBTITypeDescription(type as any)
        expect(description).toBeDefined()
        expect(description.name).toBeTruthy()
      })
    })
  })

  describe('getDetailedMBTIAnalysis', () => {
    it('provides detailed analysis', () => {
      const mockResult = {
        type: 'INTJ' as any,
        dimensions: { EI: -20, SN: -15, TF: 25, JP: 30 },
        confidence: 85,
        completedAt: new Date()
      }

      const analysis = getDetailedMBTIAnalysis(mockResult)

      expect(analysis).toBeDefined()
      expect(analysis.personalityDevelopment).toBeDefined()
      expect(analysis.relationshipAdvice).toBeDefined()
      expect(analysis.careerGuidance).toBeDefined()
      expect(analysis.stressManagement).toBeDefined()
    })
  })

  describe('integration tests', () => {
    it('works with complete flow', () => {
      const result = calculateMBTIResult(mockAnswers, 'quick')
      const description = getMBTITypeDescription(result.type)
      const analysis = getDetailedMBTIAnalysis(result)

      expect(result.type).toMatch(/^[EI][SN][TF][JP]$/)
      expect(description.name).toBeTruthy()
      expect(analysis.personalityDevelopment).toBeDefined()
    })
  })
})

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '../components/common/ErrorBoundary'

// 创建一个自定义的渲染函数，包含必要的 providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// 测试数据工厂函数
export const createMockMBTIResult = () => ({
  type: 'INTJ',
  dimensions: {
    E: -20,
    S: -15,
    T: 25,
    J: 30
  },
  confidence: 85,
  description: 'The Architect',
  traits: ['Strategic', 'Independent', 'Decisive'],
  strengths: ['Analytical thinking', 'Long-term planning'],
  weaknesses: ['Overly critical', 'Impatient'],
  careers: ['Software Engineer', 'Scientist', 'Consultant'],
  relationships: 'Values deep, meaningful connections'
})

export const createMockAstrologyResult = () => ({
  birthChart: {
    sunSign: 'aries' as const,
    moonSign: 'leo' as const,
    risingSign: 'gemini' as const,
    dominantElement: 'fire' as const,
    houses: {},
    aspects: []
  },
  personality: {
    coreTraits: ['Energetic', 'Leadership', 'Impulsive'],
    strengths: ['Natural leader', 'Enthusiastic'],
    challenges: ['Impatience', 'Quick temper'],
    lifeThemes: ['Action', 'Initiative', 'Competition']
  },
  predictions: {
    daily: 'A day full of energy and opportunities',
    weekly: 'Focus on new beginnings this week',
    monthly: 'Career advancement is highlighted'
  },
  compatibility: {
    romantic: ['leo', 'sagittarius'],
    friendship: ['gemini', 'aquarius'],
    business: ['capricorn', 'virgo']
  }
})

export const createMockBloodTypeResult = () => ({
  bloodType: 'A' as const,
  personality: {
    traits: ['Organized', 'Responsible', 'Perfectionist'],
    strengths: ['Detail-oriented', 'Reliable'],
    weaknesses: ['Overly cautious', 'Stubborn'],
    compatibility: {
      romantic: ['AB', 'A'],
      friendship: ['O', 'B'],
      work: ['A', 'AB']
    }
  },
  health: {
    risks: ['Stress-related issues', 'Digestive problems'],
    recommendations: ['Regular exercise', 'Stress management'],
    diet: ['Vegetarian-friendly', 'Avoid red meat']
  },
  career: {
    suitable: ['Accountant', 'Teacher', 'Doctor'],
    leadership: 'Behind-the-scenes leader',
    workStyle: 'Methodical and thorough'
  }
})

// Mock API 响应
export const mockApiResponse = <T extends unknown>(data: T, delay = 100) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

// Mock 错误响应
export const mockApiError = (message = 'API Error', delay = 100) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}

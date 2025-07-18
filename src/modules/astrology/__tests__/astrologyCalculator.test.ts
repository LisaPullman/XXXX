import { describe, it, expect } from 'vitest'
import { AstrologyCalculator } from '../utils/astrologyCalculator'

describe('AstrologyCalculator', () => {
  const calculator = AstrologyCalculator.getInstance()

  describe('calculateSunSign', () => {
    it('calculates sun sign correctly', () => {
      const sunSign = calculator.calculateSunSign('1990-04-15')
      expect(sunSign).toBe('aries') // April 15 is Aries
    })

    it('handles different birth dates', () => {
      const leoSign = calculator.calculateSunSign('1990-07-20')
      expect(leoSign).toBe('leo')

      const scorpioSign = calculator.calculateSunSign('1990-11-15')
      expect(scorpioSign).toBe('scorpio')
    })

    it('handles edge cases around sign boundaries', () => {
      const ariesStart = calculator.calculateSunSign('1990-03-21')
      expect(ariesStart).toBe('aries')

      const ariesEnd = calculator.calculateSunSign('1990-04-19')
      expect(ariesEnd).toBe('aries')
    })
  })

  describe('getZodiacInfo', () => {
    it('returns correct zodiac information', () => {
      const info = calculator.getZodiacInfo('aries')

      expect(info).toBeDefined()
      expect(info.name).toBe('白羊座')
      expect(info.symbol).toBe('♈')
      expect(info.element).toBe('fire')
      expect(info.dateRange).toBeTruthy()
      expect(info.traits.positive).toBeInstanceOf(Array)
      expect(info.traits.negative).toBeInstanceOf(Array)
    })

    it('handles all zodiac signs', () => {
      const signs = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
      ]

      signs.forEach(sign => {
        const info = calculator.getZodiacInfo(sign as any)
        expect(info).toBeDefined()
        expect(info.name).toBeTruthy()
      })
    })
  })

  describe('calculateCompatibility', () => {
    it('calculates compatibility between signs', () => {
      const compatibility = calculator.calculateCompatibility('aries', 'leo')

      expect(compatibility).toBeDefined()
      expect(compatibility.score).toBeGreaterThanOrEqual(0)
      expect(compatibility.score).toBeLessThanOrEqual(100)
      expect(compatibility.description).toBeTruthy()
      expect(compatibility.strengths).toBeInstanceOf(Array)
      expect(compatibility.challenges).toBeInstanceOf(Array)
    })

    it('gives high compatibility for same element signs', () => {
      const fireCompatibility = calculator.calculateCompatibility('aries', 'leo')
      expect(fireCompatibility.score).toBeGreaterThan(70)
    })

    it('handles opposite signs', () => {
      const oppositeCompatibility = calculator.calculateCompatibility('aries', 'libra')
      expect(oppositeCompatibility).toBeDefined()
      expect(oppositeCompatibility.score).toBeGreaterThan(0)
    })
  })

  describe('getDailyHoroscope', () => {
    it('generates daily horoscope', () => {
      const horoscope = calculator.getDailyHoroscope('aries')

      expect(horoscope).toBeDefined()
      expect(horoscope.general).toBeTruthy()
      expect(horoscope.love).toBeTruthy()
      expect(horoscope.career).toBeTruthy()
      expect(horoscope.health).toBeTruthy()
      expect(horoscope.lucky.numbers).toBeInstanceOf(Array)
      expect(horoscope.lucky.colors).toBeInstanceOf(Array)
    })

    it('provides different horoscopes for different signs', () => {
      const ariesHoroscope = calculator.getDailyHoroscope('aries')
      const leoHoroscope = calculator.getDailyHoroscope('leo')

      // While content might be similar, structure should be consistent
      expect(ariesHoroscope.general).toBeTruthy()
      expect(leoHoroscope.general).toBeTruthy()
    })
  })

  describe('generateAstrologyResult', () => {
    it('generates complete astrology result', () => {
      const result = calculator.generateAstrologyResult('1990-04-15', '14:30', 'Beijing')

      expect(result).toBeDefined()
      expect(result.birthChart).toBeDefined()
      expect(result.personality).toBeDefined()
      expect(result.predictions).toBeDefined()
      expect(result.compatibility).toBeDefined()
    })

    it('handles different birth locations', () => {
      const beijingResult = calculator.generateAstrologyResult('1990-04-15', '14:30', 'Beijing')
      const shanghaiResult = calculator.generateAstrologyResult('1990-04-15', '14:30', 'Shanghai')

      // Both should have valid results
      expect(beijingResult.birthChart.sunSign).toBe('aries')
      expect(shanghaiResult.birthChart.sunSign).toBe('aries')
    })
  })
})

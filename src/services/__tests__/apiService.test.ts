import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiService } from '../apiService'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('apiService', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('get method', () => {
    it('makes GET request successfully', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await apiService.get('/test')
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockData)
    })

    it('handles GET request errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Not found' })
      })

      await expect(apiService.get('/nonexistent')).rejects.toThrow()
    })

    it('includes query parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await apiService.get('/test', { params: { page: 1, limit: 10 } })
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1&limit=10'),
        expect.any(Object)
      )
    })
  })

  describe('post method', () => {
    it('makes POST request successfully', async () => {
      const mockData = { id: 1, name: 'Created' }
      const postData = { name: 'New Item' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await apiService.post('/test', postData)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(postData)
        })
      )
      expect(result).toEqual(mockData)
    })

    it('handles POST request errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Invalid data' })
      })

      await expect(apiService.post('/test', {})).rejects.toThrow()
    })
  })

  describe('put method', () => {
    it('makes PUT request successfully', async () => {
      const mockData = { id: 1, name: 'Updated' }
      const putData = { name: 'Updated Item' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await apiService.put('/test/1', putData)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(putData)
        })
      )
      expect(result).toEqual(mockData)
    })
  })

  describe('delete method', () => {
    it('makes DELETE request successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await apiService.delete('/test/1')
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'DELETE'
        })
      )
      expect(result).toEqual({ success: true })
    })
  })

  describe('authentication', () => {
    it('includes auth token when available', async () => {
      // Mock localStorage to return a token
      const mockToken = 'test-token-123'
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockToken)
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await apiService.get('/protected')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockToken}`
          })
        })
      )
    })

    it('works without auth token', async () => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await apiService.get('/public')
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      )
    })
  })

  describe('error handling', () => {
    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(apiService.get('/test')).rejects.toThrow('Network error')
    })

    it('handles non-JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => { throw new Error('Not JSON') },
        text: async () => 'Plain text response',
        headers: new Headers({ 'content-type': 'text/plain' })
      })

      const result = await apiService.get('/text')
      expect(result).toBe('Plain text response')
    })
  })
})

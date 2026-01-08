import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'

describe('API Integration with MSW', () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  it('fetches health check successfully', async () => {
    const response = await fetch(`${API_URL}/health`)
    const data = await response.json()

    expect(response.ok).toBe(true)
    expect(data).toHaveProperty('status', 'ok')
    expect(data).toHaveProperty('timestamp')
  })

  it('fetches user data successfully', async () => {
    const response = await fetch(`${API_URL}/me`)
    const data = await response.json()

    expect(response.ok).toBe(true)
    expect(data).toEqual({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    })
  })

  it('handles API errors gracefully', async () => {
    // Override the handler for this test to return an error
    server.use(
      http.get(`${API_URL}/me`, () => {
        return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
      })
    )

    const response = await fetch(`${API_URL}/me`)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toEqual({ error: 'Unauthorized' })
  })

  it('handles network errors', async () => {
    // Override the handler to simulate network error
    server.use(
      http.get(`${API_URL}/health`, () => {
        return HttpResponse.error()
      })
    )

    await expect(fetch(`${API_URL}/health`)).rejects.toThrow()
  })
})

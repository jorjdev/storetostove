import { http, HttpResponse } from 'msw'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

/**
 * MSW request handlers for API mocking
 * Add handlers here as you build API integrations
 */
export const handlers = [
  // Health check endpoint
  http.get(`${API_URL}/health`, () => {
    return HttpResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    })
  }),

  // Mock user endpoint (example)
  http.get(`${API_URL}/me`, () => {
    return HttpResponse.json({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    })
  }),

  // Mock auth endpoints
  http.get(`${API_URL}/auth/google`, () => {
    return HttpResponse.json({ redirectUrl: 'https://accounts.google.com' })
  }),
]

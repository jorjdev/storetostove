const TOKEN_KEY = 'auth_token'

export const auth = {
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token)
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  async signUp(email: string, password: string, name?: string) {
    const response = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Sign up failed')
    }

    const data = await response.json()

    if (data.accessToken) {
      this.setToken(data.accessToken)
      return data
    }

    throw new Error('Sign up failed')
  },

  async signIn(email: string, password: string) {
    const response = await fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Sign in failed')
    }

    const data = await response.json()

    if (data.accessToken) {
      this.setToken(data.accessToken)
      return data
    }

    throw new Error('Sign in failed')
  },

  logout() {
    this.removeToken()
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  },

  async getCurrentUser() {
    const token = this.getToken()
    if (!token) return null

    try {
      const response = await fetch('http://localhost:3001/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        this.removeToken()
        return null
      }

      const data = await response.json()
      return data.user
    } catch {
      this.removeToken()
      return null
    }
  },
}

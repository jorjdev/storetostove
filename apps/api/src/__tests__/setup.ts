import { beforeAll, afterAll, afterEach } from 'vitest'

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL =
  'postgresql://test:test@localhost:5433/storetostove_test'
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only'

// Global test lifecycle hooks
beforeAll(async () => {
  // Add global setup here (e.g., database connection)
  console.log('Test suite starting...')
})

afterAll(async () => {
  // Add global teardown here (e.g., close database connections)
  console.log('Test suite finished.')
})

afterEach(async () => {
  // Clean up after each test (e.g., reset database state)
})

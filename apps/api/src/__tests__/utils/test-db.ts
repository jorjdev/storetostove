import { PrismaClient } from '@prisma/client'

/**
 * Test database utilities
 * Provides helper functions for setting up and tearing down test data
 */

let prisma: PrismaClient | null = null

/**
 * Get or create Prisma client for testing
 */
export function getTestPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
  }
  return prisma
}

/**
 * Clean up all data from the database
 * Use this in beforeEach or afterEach hooks
 */
export async function cleanDatabase() {
  const client = getTestPrismaClient()

  // Delete in correct order to avoid foreign key constraints
  await client.user.deleteMany()

  // Add more models here as they're created
}

/**
 * Disconnect Prisma client
 * Use this in afterAll hooks
 */
export async function disconnectDatabase() {
  if (prisma) {
    await prisma.$disconnect()
    prisma = null
  }
}

/**
 * Create a test user
 */
export async function createTestUser(data?: {
  email?: string
  name?: string
  provider?: string
}) {
  const client = getTestPrismaClient()

  return client.user.create({
    data: {
      email: data?.email || 'test@example.com',
      name: data?.name || 'Test User',
      provider: data?.provider || 'google',
    },
  })
}

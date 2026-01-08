import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcryptjs'

export interface OAuthUser {
  email: string
  name?: string
  provider: string
}

export interface TokenPair {
  accessToken: string
  refreshToken?: string
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  /**
   * Find or create user from OAuth provider
   */
  async findOrCreateUser(oauthUser: OAuthUser) {
    // Try to find existing user by email
    let user = await this.prisma.user.findUnique({
      where: { email: oauthUser.email },
    })

    // If user doesn't exist, create them
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: oauthUser.email,
          name: oauthUser.name,
          provider: oauthUser.provider,
        },
      })
    }

    return user
  }

  /**
   * Generate JWT tokens for a user
   */
  async generateTokens(userId: string): Promise<TokenPair> {
    const payload = { sub: userId }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m', // Short-lived access token
    })

    // You can add refresh token generation here if needed
    // const refreshToken = await this.jwtService.signAsync(payload, {
    //   expiresIn: '7d',
    // })

    return {
      accessToken,
      // refreshToken,
    }
  }

  /**
   * Validate JWT payload and return user
   */
  async validateToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        provider: true,
        createdAt: true,
      },
    })

    return user
  }

  /**
   * Sign up a new user with email and password
   */
  async signUp(email: string, password: string, name?: string) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: 'email',
      },
      select: {
        id: true,
        email: true,
        name: true,
        provider: true,
        createdAt: true,
      },
    })

    return user
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    // Check if user signed up with email/password
    if (user.provider !== 'email' || !user.password) {
      throw new UnauthorizedException(
        `This account uses ${user.provider} authentication. Please sign in with ${user.provider}.`
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password')
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}

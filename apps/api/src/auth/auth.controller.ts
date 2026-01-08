import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth consent screen',
  })
  async googleAuth() {
    // Initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback handler' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to frontend with JWT token',
  })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user

    // Generate JWT tokens
    const tokens = await this.authService.generateTokens(user.id)

    // Redirect to frontend with token in URL
    // In production, consider using httpOnly cookies instead
    const frontendUrl =
      this.configService.get('FRONTEND_URL') || 'http://localhost:3000'
    const redirectUrl = `${frontendUrl}/auth/callback?token=${tokens.accessToken}`

    res.redirect(redirectUrl)
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up with email and password',
    description: 'Create a new account with email and password',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        password: {
          type: 'string',
          minLength: 8,
          example: 'securepassword123',
        },
        name: { type: 'string', example: 'John Doe', nullable: true },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            provider: { type: 'string', example: 'email' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async signUp(
    @Body() body: { email: string; password: string; name?: string }
  ) {
    const user = await this.authService.signUp(
      body.email,
      body.password,
      body.name
    )
    const tokens = await this.authService.generateTokens(user.id)

    return {
      accessToken: tokens.accessToken,
      user,
    }
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Sign in with email and password',
    description: 'Authenticate with existing account credentials',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        password: { type: 'string', example: 'securepassword123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            provider: { type: 'string', example: 'email' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() body: { email: string; password: string }) {
    const user = await this.authService.signIn(body.email, body.password)
    const tokens = await this.authService.generateTokens(user.id)

    return {
      accessToken: tokens.accessToken,
      user,
    }
  }
}

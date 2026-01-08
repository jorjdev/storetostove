import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Returns API information',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'StoreToStove API' },
      },
    },
  })
  getHello() {
    return { message: 'StoreToStove API' }
  }

  @Get('health')
  @ApiTags('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2026-01-08T00:00:00.000Z',
        },
      },
    },
  })
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the authenticated user profile',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx123456789' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
            provider: { type: 'string', example: 'google' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  getProfile(@Req() req) {
    // req.user is populated by JWT strategy
    return {
      user: req.user,
    }
  }
}

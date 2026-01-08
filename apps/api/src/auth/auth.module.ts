import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { GoogleStrategy } from './google.strategy'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // Only load GoogleStrategy if real credentials exist
    {
      provide: GoogleStrategy,
      useFactory: (configService: ConfigService, authService: AuthService) => {
        const clientId = configService.get('GOOGLE_CLIENT_ID')
        // Skip Google OAuth if using dummy credentials
        if (
          !clientId ||
          clientId.includes('dummy') ||
          clientId.includes('your-google')
        ) {
          console.warn(
            '⚠️  Google OAuth disabled: Add real credentials to .env to enable'
          )
          return null
        }
        return new GoogleStrategy(configService, authService)
      },
      inject: [ConfigService, AuthService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

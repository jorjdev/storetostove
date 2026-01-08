import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    })
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { name, emails } = profile

    // Create or find user in database
    const user = await this.authService.findOrCreateUser({
      email: emails?.[0]?.value || '',
      name: `${name?.givenName || ''} ${name?.familyName || ''}`.trim(),
      provider: 'google',
    })

    done(null, user)
  }
}

# StoreToStove

A monorepo with Next.js frontend and NestJS backend, ready to deploy to Railway.

## Stack

### Frontend (`apps/web`)

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **TypeScript** - Type safety

### Backend (`apps/api`)

- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Passport** - OAuth authentication (Google)
- **Swagger/OpenAPI** - API documentation
- **TypeScript** - Type safety

### Monorepo

- **Turborepo** - Build system
- **pnpm** - Package manager

## Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Docker (for local PostgreSQL)

## Local Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL

```bash
docker-compose up -d
```

### 3. Set Up Environment

```bash
# Copy example
cp .env.example .env

# Edit .env with your values
```

### 4. Set Up Database

```bash
# Generate Prisma client
cd apps/api
npx prisma generate

# Run migrations
npx prisma db push
```

### 5. Run Apps

```bash
# From root, run both apps
pnpm dev

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# API Docs: http://localhost:3001/api/docs
```

## API Documentation (Swagger/OpenAPI)

Interactive API documentation is available at **http://localhost:3001/api/docs** when the backend is running.

### Features

- **Interactive Testing**: Test endpoints directly from the browser
- **JWT Authentication**: Use the "Authorize" button to add your JWT token
- **Request/Response Examples**: See all request body schemas and response formats
- **Auto-generated**: Documentation is generated from code decorators

### Using Swagger UI

1. Start the backend: `pnpm dev`
2. Open http://localhost:3001/api/docs
3. To test protected endpoints:
   - Click "Authorize" button (top right)
   - Enter your JWT token (get one from `/auth/dev-login`)
   - Click "Authorize" to save
   - Now you can test protected endpoints like `/me`

### OpenAPI JSON

The raw OpenAPI specification is available at:

- **JSON**: http://localhost:3001/api/docs-json
- **YAML**: http://localhost:3001/api/docs-yaml (if needed)

You can import this into tools like Postman, Insomnia, or generate client SDKs.

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3001/auth/google/callback`
6. Copy Client ID and Secret to `.env`

## Project Structure

```
storetostove/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/        # App Router pages
│   │   │   ├── components/ # React components
│   │   │   └── lib/        # Utilities
│   │   └── package.json
│   │
│   └── api/                 # NestJS backend
│       ├── src/
│       │   ├── auth/       # OAuth authentication
│       │   ├── prisma/     # Database service
│       │   └── main.ts     # Entry point
│       ├── prisma/
│       │   └── schema.prisma
│       └── package.json
│
├── package.json             # Root package.json
├── pnpm-workspace.yaml      # Monorepo config
└── turbo.json               # Turborepo config
```

## Deployment to Railway

Railway automatically detects monorepos and builds each app separately.

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Connect your GitHub repo

### 2. Add PostgreSQL

1. Click "New" → "Database" → "Add PostgreSQL"
2. Railway provides `DATABASE_URL` automatically

### 3. Deploy Backend

1. Click "New" → "GitHub Repo"
2. Select your repo
3. Set **Root Directory**: `apps/api`
4. Add environment variables:
   - `GOOGLE_CLIENT_ID` - From Google Console
   - `GOOGLE_CLIENT_SECRET` - From Google Console
   - `GOOGLE_CALLBACK_URL` - `https://your-api.railway.app/auth/google/callback`
   - `FRONTEND_URL` - Your frontend URL (add after deploying frontend)
5. Railway auto-detects build/start commands

### 4. Deploy Frontend

1. Click "New" → "GitHub Repo"
2. Select same repo
3. Set **Root Directory**: `apps/web`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend URL from step 3
5. Railway auto-detects build/start commands

### 5. Update OAuth Callback

1. Go to Google Cloud Console
2. Add Railway backend URL to authorized redirect URIs:
   - `https://your-api.railway.app/auth/google/callback`

## Database Management

### View Database

```bash
cd apps/api
npx prisma studio
```

Opens at http://localhost:5555

### Create Migration

```bash
cd apps/api
npx prisma migrate dev --name your_migration_name
```

### Reset Database

```bash
cd apps/api
npx prisma migrate reset
```

## Available Scripts

### Root

- `pnpm dev` - Run all apps in development
- `pnpm build` - Build all apps
- `pnpm dev:web` - Run frontend only
- `pnpm dev:api` - Run backend only

### Frontend (`apps/web`)

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm start` - Start production server

### Backend (`apps/api`)

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm start` - Start production server

## Adding More OAuth Providers

### GitHub Example

1. Install strategy:

```bash
cd apps/api
pnpm add passport-github2
```

2. Create strategy:

```typescript
// apps/api/src/auth/github.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: 'github',
    }
  }
}
```

3. Add routes in `auth.controller.ts`
4. Add provider to `auth.module.ts`

## Troubleshooting

### Port already in use

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Prisma client not generated

```bash
cd apps/api
npx prisma generate
```

### Database connection fails

```bash
# Check PostgreSQL is running
docker-compose ps

# Restart
docker-compose restart postgres
```

### pnpm install fails

```bash
# Clear and reinstall
rm -rf node_modules
pnpm store prune
pnpm install
```

## License

MIT

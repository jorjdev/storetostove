# CLAUDE.md

## Skills

Read and follow these skills before writing any code:

- .claude/skills/base.md
- .claude/skills/security.md
- .claude/skills/project-tooling.md
- .claude/skills/session-management.md
- .claude/skills/typescript.md
- .claude/skills/nodejs-backend.md
- .claude/skills/react-web.md
- .claude/skills/llm-patterns.md

## Project Overview

**StoreToStove** is an AI-powered recipe and shopping management application that helps users:

- Generate recipe ideas based on preferences and dietary needs
- Manage shopping lists intelligently
- Estimate recipe costs at nearby supermarkets
- Analyze metrics like price per protein and price per calorie

## Tech Stack

### Frontend (`apps/web`)

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library

### Backend (`apps/api`)

- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Passport** - OAuth authentication (Google)

### AI/LLM

- **Anthropic Claude** - Primary AI model for recipe generation and analysis

### Infrastructure

- **Turborepo** - Monorepo build system
- **pnpm** - Package manager
- **Railway** - Deployment platform
- **Docker** - Local PostgreSQL

## Key Commands

```bash
# Verify all CLI tools are working
./scripts/verify-tooling.sh

# Install dependencies
pnpm install

# Development
pnpm dev                 # Run both apps
pnpm dev:web            # Frontend only (http://localhost:3000)
pnpm dev:api            # Backend only (http://localhost:3001)

# Build
pnpm build

# Database management
cd apps/api
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes
npx prisma studio       # Database GUI (http://localhost:5555)
npx prisma migrate dev  # Create migration

# Docker (PostgreSQL)
docker-compose up -d    # Start PostgreSQL
docker-compose down     # Stop PostgreSQL

# Testing
pnpm test               # Run tests

# Linting
pnpm lint               # Run linter

# Type checking
pnpm typecheck          # TypeScript validation

# Security
./scripts/security-check.sh

# Deployment
railway up              # Deploy (after railway init)
```

## Documentation

- `docs/` - Technical documentation
- `_project_specs/` - Project specifications and todos
- `README.md` - Setup and deployment guide

## Atomic Todos

All work is tracked in `_project_specs/todos/`:

- `active.md` - Current work
- `backlog.md` - Future work
- `completed.md` - Done (for reference)

Every todo must have validation criteria and test cases. See base.md skill for format.

## Session Management

### State Tracking

Maintain session state in `_project_specs/session/`:

- `current-state.md` - Live session state (update every 15-20 tool calls)
- `decisions.md` - Key architectural/implementation decisions (append-only)
- `code-landmarks.md` - Important code locations for quick reference
- `archive/` - Past session summaries

### Automatic Updates

Update `current-state.md`:

- After completing any todo item
- Every 15-20 tool calls during active work
- Before any significant context shift
- When encountering blockers

### Decision Logging

Log to `decisions.md` when:

- Choosing between architectural approaches
- Selecting libraries or tools
- Making security-related choices
- Deviating from standard patterns

### Context Compression

When context feels heavy (~50+ tool calls):

1. Summarize completed work in current-state.md
2. Archive verbose exploration notes to archive/
3. Keep only essential context for next steps

### Session Handoff

When ending a session or approaching context limits, update current-state.md with:

- What was completed this session
- Current state of work
- Immediate next steps (numbered, specific)
- Open questions or blockers
- Files to review first when resuming

### Resuming Work

When starting a new session:

1. Read `_project_specs/session/current-state.md`
2. Check `_project_specs/todos/active.md`
3. Review recent entries in `decisions.md` if context needed
4. Continue from "Next Steps" in current-state.md

## Project-Specific Patterns

### Monorepo Structure

- Each app has its own package.json and dependencies
- Shared code can go in `packages/` (if needed)
- Use workspace protocol for internal dependencies: `"dependency": "workspace:*"`

### API Security

- **NEVER** expose API keys in client-side code
- Use `NEXT_PUBLIC_*` prefix ONLY for non-sensitive config (API URL, etc.)
- All LLM API calls MUST happen server-side (NestJS backend)
- Validate all user input before passing to LLM

### LLM Integration

- Keep prompts modular and testable
- Implement rate limiting for AI endpoints
- Cache common recipe/price queries
- Handle API failures gracefully with fallbacks

### Database

- Always use Prisma migrations for schema changes
- Never commit migration files without testing
- Use transactions for multi-step operations

### Environment Variables

- Keep all secrets in backend only
- Frontend should only have `NEXT_PUBLIC_API_URL`
- Use .env.example as source of truth for required vars

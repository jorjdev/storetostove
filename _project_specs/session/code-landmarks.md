<!--
UPDATE WHEN:
- Adding new entry points or key files
- Introducing new patterns
- Discovering non-obvious behavior

Helps quickly navigate the codebase when resuming work.
-->

# Code Landmarks

Quick reference to important parts of the codebase.

## Entry Points

| Location             | Purpose                  |
| -------------------- | ------------------------ |
| apps/web/src/app/    | Next.js App Router pages |
| apps/api/src/main.ts | NestJS application entry |

## Core Business Logic

| Location             | Purpose              |
| -------------------- | -------------------- |
| apps/api/src/auth/   | OAuth authentication |
| apps/api/src/prisma/ | Database service     |

## Configuration

| Location                      | Purpose                        |
| ----------------------------- | ------------------------------ |
| .env.example                  | Environment variables template |
| apps/api/prisma/schema.prisma | Database schema                |
| turbo.json                    | Monorepo build config          |

## Key Patterns

| Pattern         | Example Location     | Notes                      |
| --------------- | -------------------- | -------------------------- |
| OAuth flow      | apps/api/src/auth/   | Google OAuth with Passport |
| Database access | apps/api/src/prisma/ | Prisma ORM wrapper         |

## Testing

| Location      | Purpose                    |
| ------------- | -------------------------- |
| apps/\*/test/ | Test files (to be created) |

## Gotchas & Non-Obvious Behavior

| Location | Issue              | Notes                                                    |
| -------- | ------------------ | -------------------------------------------------------- |
| .env     | Multiple locations | Root .env for shared vars, app-specific in apps/\*/. env |
| Prisma   | Generate required  | Must run `npx prisma generate` after schema changes      |

<!--
LOG DECISIONS WHEN:
- Choosing between architectural approaches
- Selecting libraries or tools
- Making security-related choices
- Deviating from standard patterns

This is append-only. Never delete entries.
-->

# Decision Log

Track key architectural and implementation decisions.

## Format

```
## [YYYY-MM-DD] Decision Title

**Decision**: What was decided
**Context**: Why this decision was needed
**Options Considered**: What alternatives existed
**Choice**: Which option was chosen
**Reasoning**: Why this choice was made
**Trade-offs**: What we gave up
**References**: Related code/docs
```

---

## [2026-01-06] Initial Project Structure

**Decision**: Use Turborepo monorepo with separate Next.js and NestJS apps

**Context**: Need to share TypeScript types between frontend and backend while maintaining clear separation

**Options Considered**:

1. Monorepo (chosen)
2. Separate repositories for frontend/backend
3. Single full-stack Next.js app

**Choice**: Monorepo with Turborepo

**Reasoning**:

- Type sharing between apps
- Single deployment pipeline
- Easier local development
- Can add shared packages later

**Trade-offs**:

- More complex initial setup
- Requires understanding of workspace protocols

**References**: pnpm-workspace.yaml, turbo.json

---

## [2026-01-06] AI Provider Selection

**Decision**: Use Anthropic Claude as primary LLM

**Context**: Need to generate recipes, analyze nutrition, and provide cost insights

**Options Considered**:

1. Anthropic Claude (chosen)
2. OpenAI GPT
3. Multiple providers

**Choice**: Anthropic Claude

**Reasoning**:

- Strong at structured output (JSON recipes)
- Good at following instructions
- Reliable for production use
- Can add OpenAI later if needed

**Trade-offs**:

- Single vendor dependency
- Need fallback strategy for API failures

**References**: .env.example (ANTHROPIC_API_KEY)

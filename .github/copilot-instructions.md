## Workflow Orchestration

### 1. Plan Node Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- **ALWAYS** run `pnpm test && pnpm build` before declaring any task complete
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Fix ALL test failures before finishing — do not skip or comment out tests

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Testing Rules

- **Test framework**: Use **Vitest** for all unit and integration tests
- **Coverage requirement**: Write tests for EVERY task that adds or changes logic
- **Test file location**: Co-locate tests next to source — `foo.ts` → `foo.test.ts`
  - Hooks: `src/hooks/__tests__/useFullscreen.test.ts`
  - Utils / i18n: `src/i18n/__tests__/messages.test.ts`
  - UI components: `src/components/__tests__/FlagCard.test.tsx`
- **What to test** (minimum bar):
  - All custom hooks (happy path + edge cases)
  - All pure utility functions
  - Key component rendering and behaviour
- **Before finishing any task**: run `pnpm test && pnpm build` — both must pass
- **Do not ship broken tests**: fix the root cause, never comment out or skip

## TypeScript Rules

- **Always use explicit types** — no implicit `any`, no untyped function signatures
- **Prefer `interface` for object shapes**, `type` for unions and aliases
- **Export types separately** from runtime code when needed to avoid Vite's type-erasure bug
  (see tasks/lessons.md — `import type` erasure)
- **Use `const` enums or string literal unions** instead of plain strings for fixed sets of values
  (e.g. `FilterMode`, `AppLocale`)
- **Type all component props** with a named interface, never inline anonymous objects
- **Type all hook return values** explicitly
- **No `as any` casts** — use proper generics or type guards instead
- `as unknown as X` is acceptable only for browser API quirks (e.g. webkit-prefixed properties)

## Task Management

1. **Plan First**: Write plan to tasks/todo.md with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Write Tests**: Add Vitest tests for every piece of logic added or changed
5. **Explain Changes**: High-level summary at each step
6. **Document Results**: Add review section to tasks/todo.md
7. **Capture Lessons**: Update tasks/lessons.md after corrections
8. **Final Gate**: `pnpm test && pnpm build` must pass before committing

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Types Everywhere**: TypeScript is a tool for correctness — use it fully, not as decoration.

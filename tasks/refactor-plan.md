# Refactor: DRY / SOLID / Design System

## Problem
Codebase has grown organically. Key issues:
- Button styling copy-pasted 12+ times across App.tsx, FilterBar, SettingsPanel
- AppContent (242 lines) violates SRP — handles fullscreen API, grouping logic, and rendering
- FlagModal has 3 separate speech synthesis implementations
- No design tokens — gradient strings like `"from-violet-500 to-pink-500"` scattered everywhere
- Modal boilerplate (escape key, body scroll lock, backdrop) duplicated in FlagModal + SettingsPanel
- No custom hooks — logic coupled to components

## Approach
Build a small design system, extract hooks, then clean up components.
Do NOT change any visible behaviour or UI. Pure refactor.

## Todos

1. `design-tokens` — Create `src/ui/tokens.ts` (color gradients, shadow, button base classes)
2. `ui-button` — Create `src/ui/Button.tsx` (IconButton + PillButton + GradientButton variants)
3. `ui-modal` — Create `src/ui/Modal.tsx` (backdrop, escape key, body scroll lock — shared wrapper)
4. `hook-fullscreen` — Create `src/hooks/useFullscreen.ts`
5. `hook-speech` — Create `src/hooks/useSpeech.ts`
6. `hook-grouping` — Create `src/hooks/useCountryGrouping.ts`
7. `refactor-app` — Refactor App.tsx using new hooks + Button
8. `refactor-modal` — Refactor FlagModal using useSpeech + Modal + Button
9. `refactor-settings` — Refactor SettingsPanel using Modal + Button
10. `refactor-filterbar` — Refactor FilterBar using PillButton
11. `refactor-langpicker` — Refactor LanguagePicker using Modal + Button
12. `build-verify` — pnpm build, confirm no regressions, commit + push

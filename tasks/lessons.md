# Lessons Learned

## Vite / TypeScript

- **`import type` erasure bug**: When a component only imports a TypeScript interface
  (`import type { Country }`) and has no runtime imports from that module, Vite dev mode
  erases the import entirely → `SyntaxError: does not provide an export named`.
  **Fix**: Move the interface to a separate file (`src/types.ts`) with no runtime exports.

- **`export default` SyntaxError in dev**: Caused by Vite HMR cache after rapid edits.
  **Fix**: Hard refresh (`Cmd+Shift+R`) or restart `pnpm dev`.

## Tailwind v4

- Uses `@import "tailwindcss"` in CSS — no `tailwind.config.js`.
- The `@tailwindcss/vite` plugin is added to `vite.config.ts`.
- Custom CSS selectors (e.g. `.class:hover child`) are NOT valid in Tailwind v4's CSS
  parser — use `group-hover:` arbitrary classes instead.
- Google Font import must come **before** `@import "tailwindcss"` in `index.css`.

## Web Speech API

- Always call `window.speechSynthesis.cancel()` before each new utterance.
- Set `utterance.lang` to match the selected locale (e.g. `'sv-SE'`) for correct voice.
- Track speaking state via `utterance.onstart` / `utterance.onend` / `utterance.onerror`.

## Fullscreen API

- iOS Safari does **not** support the Fullscreen API at all — hide the button using
  `document.fullscreenEnabled || webkitFullscreenEnabled`.
- Always add webkit-prefixed variants: `webkitRequestFullscreen`, `webkitExitFullscreen`.
- Sync React state via `fullscreenchange` + `webkitfullscreenchange` events (handles
  user pressing Escape to exit fullscreen without going through the button).

## react-intl

- `useIntl()` only works inside components wrapped by `<IntlProvider>`.
- Split `App` into outer (`App` — manages locale state + `IntlProvider`) and inner
  (`AppContent` — uses `useIntl()`) to avoid hook-outside-provider errors.
- `Intl.DisplayNames` handles country name localization without maintaining a giant
  translation file — falls back to the English name for unsupported codes (e.g. XK for Kosovo).

## Design System / Refactoring

- Extract design tokens before refactoring components — prevents having to update multiple files.
- When multiple components share a button pattern, always build the primitive first (`Button.tsx`)
  then update consumers, not the other way around.
- `Modal.tsx` with a `variant` prop (`"overlay"` | `"sheet"`) is cleaner than two separate components
  when the only difference is layout.
- Keep `const RATES = [...]` and similar config arrays at module scope (outside the component) so they
  are not recreated on every render.
- Custom hooks (`useFullscreen`, `useSpeech`, `useCountryGrouping`) keep components focused on
  rendering only — makes them much easier to read and test.

- PNG icons must be pre-generated and placed in `public/` — the plugin does not auto-generate them.
- Add `apple-touch-icon` + `apple-mobile-web-app-*` meta tags for iOS home screen support.
- `registerType: 'autoUpdate'` auto-refreshes the service worker on deploy.

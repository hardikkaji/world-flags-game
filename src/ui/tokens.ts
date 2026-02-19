/**
 * Design tokens for World Flags Game.
 * Single source of truth for colors, shadows, and base component classes.
 * Use these constants in all components — never hard-code gradient strings inline.
 */

// ─── Color gradient pairs ────────────────────────────────────────────────────

export const gradients = {
  primary: "from-violet-500 to-pink-500",       // main action, active states
  secondary: "from-emerald-400 to-teal-500",    // filter toggle (inactive)
  active: "from-orange-400 to-pink-500",        // filter toggle (active)
  info: "from-cyan-400 to-blue-500",            // fullscreen button
  settings: "from-violet-500 to-pink-500",      // settings button (same as primary)
  danger: "from-red-400 to-orange-400",
  brand: "from-violet-500 via-purple-500 to-pink-500", // language picker bg
} as const;

// ─── Card background gradients (rotating palette for flag cards) ─────────────

export const cardGradients = [
  "from-red-400 to-orange-300",
  "from-orange-400 to-yellow-300",
  "from-yellow-400 to-lime-300",
  "from-emerald-400 to-teal-300",
  "from-cyan-400 to-blue-300",
  "from-blue-400 to-indigo-300",
  "from-violet-400 to-purple-300",
  "from-pink-400 to-rose-300",
] as const;

// ─── Shadow tokens ───────────────────────────────────────────────────────────

export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
} as const;

// ─── Base class strings for button variants ──────────────────────────────────

/** Square icon button in the header (w-10 h-10, rounded-2xl) */
export const iconButtonBase =
  "w-10 h-10 flex items-center justify-center rounded-2xl text-white shadow-md " +
  "hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-150";

/** Rounded pill chip (used in FilterBar, SettingsPanel option groups) */
export const pillButtonBase =
  "flex items-center gap-1.5 px-5 py-2 rounded-full font-black text-sm " +
  "transition-all duration-150 active:scale-95";

/** Full-width action button (used in modals/panels) */
export const actionButtonBase =
  "w-full py-3 rounded-2xl font-black text-sm shadow-md " +
  "hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-150";

/** Option button within a group (rate/language selectors in SettingsPanel) */
export const optionButtonBase =
  "flex-1 py-3 rounded-2xl text-sm font-black transition-all duration-150 active:scale-95";

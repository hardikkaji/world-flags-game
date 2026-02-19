import type { ButtonHTMLAttributes, ReactNode } from "react";
import { iconButtonBase, pillButtonBase, actionButtonBase, optionButtonBase, gradients } from "./tokens";

// ─── IconButton ──────────────────────────────────────────────────────────────
// Square 40×40 header button with a gradient background.

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: string;
  children: ReactNode;
}

export function IconButton({ gradient = gradients.primary, className = "", children, ...props }: IconButtonProps) {
  return (
    <button
      className={`${iconButtonBase} bg-gradient-to-br ${gradient} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── PillButton ──────────────────────────────────────────────────────────────
// Rounded chip for filter bars and option groups. Active vs inactive style
// is toggled via the `active` prop.

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export function PillButton({ active = false, className = "", children, ...props }: PillButtonProps) {
  const activeClass = `bg-gradient-to-r ${gradients.primary} text-white shadow-md scale-105`;
  const inactiveClass = "bg-white text-gray-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-gray-100";
  return (
    <button
      className={`${pillButtonBase} ${active ? activeClass : inactiveClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── OptionButton ─────────────────────────────────────────────────────────────
// Used inside SettingsPanel for selecting a value from a group (rate, language).

interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export function OptionButton({ active = false, className = "", children, ...props }: OptionButtonProps) {
  const activeClass = `bg-gradient-to-br ${gradients.primary} text-white shadow-lg scale-105`;
  const inactiveClass = "bg-gray-100 text-gray-600 hover:bg-gray-200";
  return (
    <button
      className={`${optionButtonBase} ${active ? activeClass : inactiveClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── GradientButton ──────────────────────────────────────────────────────────
// Full-width action button (e.g. "Done", "Speak again").

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: string;
  children: ReactNode;
}

export function GradientButton({ gradient = gradients.primary, className = "", children, ...props }: GradientButtonProps) {
  return (
    <button
      className={`${actionButtonBase} bg-gradient-to-r ${gradient} text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

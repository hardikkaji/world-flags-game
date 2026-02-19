import { useEffect, type ReactNode } from "react";

interface ModalProps {
  /** When false the modal is not rendered at all */
  open: boolean;
  /** Called when backdrop is clicked or Escape is pressed. Omit to make modal non-dismissible. */
  onClose?: () => void;
  /** "overlay" = dark backdrop centered card (Settings/LanguagePicker)
   *  "sheet"   = full-screen on mobile, centered card on desktop (FlagModal) */
  variant?: "overlay" | "sheet";
  ariaLabel?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, variant = "overlay", ariaLabel, children }: ModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key to close (only when dismissible)
  useEffect(() => {
    if (!open || !onClose) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  if (variant === "sheet") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                   sm:p-4 sm:bg-black/50 sm:backdrop-blur-sm bg-white
                   animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <div
          className="relative bg-white w-full h-full sm:h-auto sm:rounded-3xl sm:shadow-2xl sm:max-w-lg
                     flex flex-col items-center justify-center gap-7 p-10
                     animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }

  // overlay variant
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-xs flex flex-col gap-5
                   animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

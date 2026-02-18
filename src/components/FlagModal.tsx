import { useEffect, useState } from "react";
import type { Country } from "../types";

interface FlagModalProps {
  country: Country | null;
  onClose: () => void;
}

function speak(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export function FlagModal({ country, onClose }: FlagModalProps) {
  const [speaking, setSpeaking] = useState(false);

  // Speak when modal opens
  useEffect(() => {
    if (!country) return;
    const text = `Country ${country.name}. Its capital is ${country.capital}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return () => { window.speechSynthesis.cancel(); setSpeaking(false); };
  }, [country]);

  // Close on Escape key
  useEffect(() => {
    if (!country) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [country, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (country) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [country]);

  if (!country) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/50 backdrop-blur-sm
                 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${country.name}`}
    >
      {/* Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-6
                   animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
                     bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800
                     transition-colors duration-150 text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Giant flag emoji */}
        <span
          className="text-[120px] leading-none drop-shadow-xl select-none animate-[wobble_0.5s_ease-out_0.1s]"
          role="img"
          aria-label={`Flag of ${country.name}`}
        >
          {country.emoji}
        </span>

        {/* Country name */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">{country.name}</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">Country</p>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />

        {/* Capital */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">🏛️</span>
          <p className="text-xl font-semibold text-gray-700">{country.capital}</p>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">Capital</p>
        </div>

        {/* Speak again button */}
        <button
          onClick={() => speak(`Country ${country.name}. Its capital is ${country.capital}.`)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm
                      transition-all duration-150 active:scale-95
                      ${speaking
                        ? "bg-purple-100 text-purple-500 animate-pulse"
                        : "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      }`}
          aria-label="Speak country name and capital"
        >
          <span>{speaking ? "🔊" : "🔈"}</span>
          {speaking ? "Speaking…" : "Speak again"}
        </button>

        {/* Tap anywhere hint */}
        <p className="text-xs text-gray-300 -mt-2">Tap outside to close</p>
      </div>
    </div>
  );
}

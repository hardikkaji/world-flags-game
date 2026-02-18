import { useEffect, useState } from "react";
import type { Country } from "../types";

interface FlagModalProps {
  country: Country | null;
  speechRate: number;
  onClose: () => void;
}

function speak(text: string, rate: number) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export function FlagModal({ country, speechRate, onClose }: FlagModalProps) {
  const [speaking, setSpeaking] = useState(false);

  // Speak when modal opens
  useEffect(() => {
    if (!country) return;
    const text = `Country ${country.name}. Its capital is ${country.capital}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return () => { window.speechSynthesis.cancel(); setSpeaking(false); };
  }, [country, speechRate]);

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
    /* Backdrop — mobile: full screen, desktop: centered overlay */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 sm:p-4 sm:bg-black/50 sm:backdrop-blur-sm bg-white
                 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${country.name}`}
    >
      {/* Card — mobile: full screen, desktop: large card */}
      <div
        className="relative bg-white w-full h-full sm:h-auto sm:rounded-3xl sm:shadow-2xl sm:max-w-lg
                   flex flex-col items-center justify-center gap-7 p-10
                   animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full
                     bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800
                     transition-colors duration-150 text-xl leading-none font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Giant flag emoji */}
        <span
          className="text-[160px] sm:text-[180px] leading-none drop-shadow-xl select-none animate-[wobble_0.6s_ease-out_0.1s]"
          role="img"
          aria-label={`Flag of ${country.name}`}
        >
          {country.emoji}
        </span>

        {/* Country name */}
        <div className="text-center space-y-1">
          <h2 className="text-4xl font-black text-gray-800">{country.name}</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Country</p>
        </div>

        {/* Divider */}
        <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />

        {/* Capital */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">🏛️</span>
          <p className="text-3xl font-black text-gray-700">{country.capital}</p>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Capital City</p>
        </div>

        {/* Speak again button */}
        <button
          onClick={() => speak(`Country ${country.name}. Its capital is ${country.capital}.`, speechRate)}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-black text-base
                      transition-all duration-150 active:scale-95
                      ${speaking
                        ? "bg-purple-100 text-purple-500 animate-pulse"
                        : "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      }`}
          aria-label="Speak country name and capital"
        >
          <span className="text-xl">{speaking ? "🔊" : "🔈"}</span>
          {speaking ? "Speaking…" : "Speak again"}
        </button>

        {/* Tap anywhere hint — desktop only */}
        <p className="hidden sm:block text-xs text-gray-300 -mt-3">Tap outside to close</p>
      </div>
    </div>
  );
}

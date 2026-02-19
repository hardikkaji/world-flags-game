import { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import type { Country } from "../types";
import { getLocalizedCountryName, LOCALE_TTS } from "../i18n/messages";
import type { AppLocale } from "../i18n/messages";
import { Modal } from "../ui/Modal";
import { useSpeech } from "../hooks/useSpeech";

interface FlagModalProps {
  country: Country | null;
  speechRate: number;
  onClose: () => void;
}

export function FlagModal({ country, speechRate, onClose }: FlagModalProps) {
  const intl = useIntl();

  const localizedName = useMemo(
    () => country ? getLocalizedCountryName(country.code, intl.locale, country.name) : "",
    [country, intl.locale]
  );

  const ttsLang = LOCALE_TTS[intl.locale as AppLocale] ?? "en-US";
  const { speaking, speak } = useSpeech({ rate: speechRate, lang: ttsLang });

  const speechText = country
    ? intl.formatMessage({ id: "modal.speech.text" }, { name: localizedName, capital: country.capital })
    : "";

  // Auto-speak when the modal opens / country changes
  useEffect(() => {
    if (country && speechText) speak(speechText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, speechText]);

  return (
    <Modal open={!!country} onClose={onClose} variant="sheet" ariaLabel={country ? `Details for ${localizedName}` : undefined}>
      {country && (
        <>
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
            aria-label={`Flag of ${localizedName}`}
          >
            {country.emoji}
          </span>

          {/* Country name */}
          <div className="text-center space-y-1">
            <h2 className="text-4xl font-black text-gray-800">{localizedName}</h2>
            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
              {intl.formatMessage({ id: "modal.country.label" })}
            </p>
          </div>

          <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />

          {/* Capital */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">🏛️</span>
            <p className="text-3xl font-black text-gray-700">{country.capital}</p>
            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
              {intl.formatMessage({ id: "modal.capital.label" })}
            </p>
          </div>

          {/* Speak again */}
          <button
            onClick={() => speak(speechText)}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-black text-base
                        transition-all duration-150 active:scale-95
                        ${speaking
                          ? "bg-purple-100 text-purple-500 animate-pulse"
                          : "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        }`}
            aria-label="Speak country name and capital"
          >
            <span className="text-xl">{speaking ? "🔊" : "🔈"}</span>
            {speaking
              ? intl.formatMessage({ id: "modal.speaking" })
              : intl.formatMessage({ id: "modal.speak" })}
          </button>

          <p className="hidden sm:block text-xs text-gray-300 -mt-3">
            {intl.formatMessage({ id: "modal.tap.hint" })}
          </p>
        </>
      )}
    </Modal>
  );
}

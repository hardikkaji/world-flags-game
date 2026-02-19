import { useIntl } from "react-intl";
import type { AppLocale } from "../i18n/messages";

interface SettingsPanelProps {
  speechRate: number;
  onRateChange: (rate: number) => void;
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
  onClose: () => void;
}

export function SettingsPanel({ speechRate, onRateChange, locale, onLocaleChange, onClose }: SettingsPanelProps) {
  const intl = useIntl();

  const rates = [
    { label: intl.formatMessage({ id: "settings.slow" }), value: 0.75 },
    { label: intl.formatMessage({ id: "settings.normal" }), value: 0.9 },
    { label: intl.formatMessage({ id: "settings.fast" }), value: 1.4 },
  ];

  const langs: { locale: AppLocale; id: string }[] = [
    { locale: "en", id: "lang.en" },
    { locale: "sv", id: "lang.sv" },
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-xs flex flex-col gap-5
                   animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            {intl.formatMessage({ id: "settings.title" })}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100
                       hover:bg-gray-200 text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Speaking Speed */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-black text-gray-600 uppercase tracking-wider">
            {intl.formatMessage({ id: "settings.speed" })}
          </p>
          <div className="flex gap-2">
            {rates.map((r) => (
              <button
                key={r.value}
                onClick={() => onRateChange(r.value)}
                className={`flex-1 py-3 rounded-2xl text-sm font-black transition-all duration-150 active:scale-95
                  ${speechRate === r.value
                    ? "bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-black text-gray-600 uppercase tracking-wider">
            {intl.formatMessage({ id: "settings.language" })}
          </p>
          <div className="flex gap-2">
            {langs.map((l) => (
              <button
                key={l.locale}
                onClick={() => onLocaleChange(l.locale)}
                className={`flex-1 py-3 rounded-2xl text-sm font-black transition-all duration-150 active:scale-95
                  ${locale === l.locale
                    ? "bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {intl.formatMessage({ id: l.id })}
              </button>
            ))}
          </div>
        </div>

        {/* Done */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500
                     text-white font-black text-sm shadow-md hover:shadow-lg
                     hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
        >
          {intl.formatMessage({ id: "settings.done" })}
        </button>
      </div>
    </div>
  );
}

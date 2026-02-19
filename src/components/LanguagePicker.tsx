import type { AppLocale } from "../i18n/messages";

interface LanguagePickerProps {
  onSelect: (locale: AppLocale) => void;
}

const LANGUAGES: { locale: AppLocale; flag: string; label: string; sublabel: string }[] = [
  { locale: "en", flag: "🇬🇧", label: "English", sublabel: "English" },
  { locale: "sv", flag: "🇸🇪", label: "Svenska", sublabel: "Swedish" },
];

export function LanguagePicker({ onSelect }: LanguagePickerProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center
                    bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-6
                    animate-[fadeIn_0.3s_ease-out]">
      <div className="text-8xl mb-6 animate-[bounce-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">🌍</div>

      <h1 className="text-3xl font-black text-white text-center mb-1 drop-shadow">Choose your language</h1>
      <h2 className="text-xl font-black text-white/80 text-center mb-2">Välj ditt språk</h2>
      <p className="text-sm text-white/60 text-center mb-10">
        You can change this later in Settings • Du kan ändra detta i Inställningar
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.locale}
            onClick={() => onSelect(lang.locale)}
            className="flex items-center gap-5 px-7 py-5 rounded-3xl bg-white shadow-xl
                       hover:scale-105 active:scale-95 transition-all duration-150 hover:shadow-2xl"
          >
            <span className="text-5xl">{lang.flag}</span>
            <div className="text-left">
              <p className="text-xl font-black text-gray-800">{lang.label}</p>
              <p className="text-sm text-gray-400">{lang.sublabel}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

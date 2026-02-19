import { useState, useCallback } from "react";
import { IntlProvider, useIntl } from "react-intl";
import { countries } from "./data/countries";
import { continentColors, continentEmoji, type Continent } from "./data/continents";
import type { Country } from "./types";
import { FlagCard } from "./components/flag-card";
import { FlagModal } from "./components/flag-modal";
import { SettingsPanel } from "./components/settings-panel";
import { FilterBar, type FilterMode } from "./components/filter-bar";
import { LanguagePicker } from "./components/language-picker";
import { messages, type AppLocale } from "./i18n/messages";
import { IconButton } from "./ui/button";
import { gradients } from "./ui/tokens";
import { useFullscreen } from "./hooks/use-fullscreen";
import { useCountryGrouping } from "./hooks/use-country-grouping";

// ─── Inner app (has access to IntlProvider context) ─────────────────────────

interface AppContentProps {
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
}

function AppContent({ locale, onLocaleChange }: AppContentProps) {
  const intl = useIntl();
  const [selected, setSelected] = useState<Country | null>(null);
  const [speechRate, setSpeechRate] = useState(() => {
    const saved = localStorage.getItem("speechRate");
    return saved ? parseFloat(saved) : 0.9;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  const { isFullscreen, toggle: toggleFullscreen, isSupported: fullscreenSupported } = useFullscreen();
  const display = useCountryGrouping(filterMode, locale);

  const handleRateChange = useCallback((rate: number) => {
    setSpeechRate(rate);
    localStorage.setItem("speechRate", String(rate));
  }, []);

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              {intl.formatMessage({ id: "app.title" })}
            </h1>
            <p className="text-xs text-gray-500">
              {intl.formatMessage({ id: "app.subtitle" }, { count: countries.length })}
            </p>
          </div>

          {/* Filter toggle */}
          <IconButton
            gradient={showFilter ? gradients.active : gradients.secondary}
            onClick={() => setShowFilter((v) => !v)}
            title={showFilter ? "Hide filters" : "Show filters"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
            </svg>
            <span className="sr-only">{showFilter ? "Hide filters" : "Show filters"}</span>
          </IconButton>

          {/* Settings */}
          <IconButton gradient={gradients.settings} onClick={() => setShowSettings(true)} title="Settings">
            ⚙️
            <span className="sr-only">Settings</span>
          </IconButton>

          {/* Fullscreen — hidden if unsupported */}
          {fullscreenSupported && (
            <IconButton gradient={gradients.info} onClick={toggleFullscreen} title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4m0 5H4m11-5v5m0 0h5M9 20v-5m0 0H4m11 5v-5m0 0h5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
              <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
            </IconButton>
          )}
        </div>
      </header>

      {/* Filter Bar — slides in/out */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilter ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
        <FilterBar mode={filterMode} onModeChange={setFilterMode} />
      </div>

      {/* Flag Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {display.map((group) => (
          <section key={group.label ?? "all"}>
            {group.label && (
              <div className={`flex items-center gap-3 mb-5 px-4 py-2.5 rounded-2xl w-fit shadow-md
                ${filterMode === "continent"
                  ? `bg-gradient-to-r ${continentColors[group.label as Continent]}`
                  : "bg-gradient-to-r from-violet-500 to-pink-500"}`}
              >
                <span className="text-2xl font-black text-white">
                  {filterMode === "continent" ? continentEmoji[group.label as Continent] : group.label}
                </span>
                {filterMode === "continent" && (
                  <h2 className="text-lg font-black text-white tracking-wide">
                    {intl.formatMessage({ id: `continent.${group.label}` })}
                  </h2>
                )}
                <span className="bg-white/30 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {group.items.length}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {group.items.map((country) => (
                <FlagCard key={country.code} country={country} index={globalIndex++} onClick={setSelected} />
              ))}
            </div>
          </section>
        ))}

        <p className="text-center text-gray-400 text-sm mt-4">🎉 All {countries.length} countries!</p>
      </main>

      <FlagModal country={selected} speechRate={speechRate} onClose={() => setSelected(null)} />

      {showSettings && (
        <SettingsPanel
          speechRate={speechRate}
          onRateChange={handleRateChange}
          locale={locale}
          onLocaleChange={onLocaleChange}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

// ─── Root — manages locale before IntlProvider mounts ───────────────────────

function App() {
  const [locale, setLocale] = useState<AppLocale | null>(() => {
    const saved = localStorage.getItem("appLanguage");
    return (saved === "en" || saved === "sv") ? saved : null;
  });

  const handleLocaleChange = useCallback((lang: AppLocale) => {
    localStorage.setItem("appLanguage", lang);
    setLocale(lang);
  }, []);

  if (!locale) return <LanguagePicker onSelect={handleLocaleChange} />;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <AppContent locale={locale} onLocaleChange={handleLocaleChange} />
    </IntlProvider>
  );
}

export default App;

import { useState, useCallback, useMemo, useEffect } from "react";
import { countries } from "./data/countries";
import { countryContinent, continentColors, continentEmoji, allContinents, type Continent } from "./data/continents";
import type { Country } from "./types";
import { FlagCard } from "./components/FlagCard";
import { FlagModal } from "./components/FlagModal";
import { SettingsPanel } from "./components/SettingsPanel";
import { FilterBar, type FilterMode } from "./components/FilterBar";

function App() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [speechRate, setSpeechRate] = useState(() => {
    const saved = localStorage.getItem("speechRate");
    return saved ? parseFloat(saved) : 0.9;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  // Check if fullscreen is supported by this browser/device
  const supportsFullscreen =
    document.fullscreenEnabled ||
    (document as unknown as Record<string, unknown>)["webkitFullscreenEnabled"] === true;

  const toggleFullscreen = useCallback(() => {
    const doc = document as unknown as Record<string, unknown>;
    const el = document.documentElement as unknown as Record<string, unknown>;

    const isFs = !!(document.fullscreenElement || doc["webkitFullscreenElement"]);

    if (!isFs) {
      if (typeof el["requestFullscreen"] === "function") {
        (el["requestFullscreen"] as () => Promise<void>)();
      } else if (typeof el["webkitRequestFullscreen"] === "function") {
        (el["webkitRequestFullscreen"] as () => void)();
      }
    } else {
      if (typeof document.exitFullscreen === "function") {
        document.exitFullscreen();
      } else if (typeof doc["webkitExitFullscreen"] === "function") {
        (doc["webkitExitFullscreen"] as () => void)();
      }
    }
  }, []);

  // Sync state with actual fullscreen changes (e.g. user presses Escape)
  useEffect(() => {
    const onChange = () => {
      const doc = document as unknown as Record<string, unknown>;
      setIsFullscreen(!!(document.fullscreenElement || doc["webkitFullscreenElement"]));
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // Sorted + grouped data
  const display = useMemo(() => {
    const sorted = [...countries].sort((a, b) => a.name.localeCompare(b.name));

    if (filterMode === "all") {
      return [{ label: null, items: sorted }];
    }

    if (filterMode === "alpha") {
      const groups: Record<string, Country[]> = {};
      for (const c of sorted) {
        const letter = c.name[0].toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(c);
      }
      return Object.entries(groups).map(([letter, items]) => ({ label: letter, items }));
    }

    return allContinents.map((continent) => ({
      label: continent,
      items: sorted.filter((c) => countryContinent[c.code] === continent),
    })).filter((g) => g.items.length > 0);
  }, [filterMode]);

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">World Flags</h1>
            <p className="text-xs text-gray-500">{countries.length} countries to explore</p>
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setShowFilter((v) => !v)}
            title={showFilter ? "Hide filters" : "Show filters"}
            className={`w-10 h-10 flex items-center justify-center rounded-2xl text-white text-lg
                       shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95
                       transition-all duration-150
                       ${showFilter
                         ? "bg-gradient-to-br from-orange-400 to-pink-500"
                         : "bg-gradient-to-br from-emerald-400 to-teal-500"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
            </svg>
            <span className="sr-only">{showFilter ? "Hide filters" : "Show filters"}</span>
          </button>

          {/* Settings button */}
          <button
            onClick={() => setShowSettings(true)}
            title="Settings"
            className="w-10 h-10 flex items-center justify-center rounded-2xl
                       bg-gradient-to-br from-violet-500 to-pink-500 text-white text-lg
                       shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95
                       transition-all duration-150"
          >
            ⚙️
            <span className="sr-only">Settings</span>
          </button>

          {/* Fullscreen button — only shown if device supports it */}
          {supportsFullscreen && (
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="w-10 h-10 flex items-center justify-center rounded-2xl
                       bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-lg
                       shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95
                       transition-all duration-150"
          >
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
          </button>
          )}
        </div>
      </header>

      {/* Filter Bar — slides in/out */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilter ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
        <FilterBar mode={filterMode} onModeChange={setFilterMode} />
      </div>

      {/* Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {display.map((group) => (
          <section key={group.label ?? "all"}>
            {/* Section header — hidden in All mode */}
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
                  <h2 className="text-lg font-black text-white tracking-wide">{group.label}</h2>
                )}
                <span className="bg-white/30 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {group.items.length}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {group.items.map((country) => {
                const idx = globalIndex++;
                return (
                  <FlagCard
                    key={country.code}
                    country={country}
                    index={idx}
                    onClick={setSelected}
                  />
                );
              })}
            </div>
          </section>
        ))}

        <p className="text-center text-gray-400 text-sm mt-4">
          🎉 All {countries.length} countries!
        </p>
      </main>

      {/* Flag Modal */}
      <FlagModal
        country={selected}
        speechRate={speechRate}
        onClose={() => setSelected(null)}
      />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          speechRate={speechRate}
          onRateChange={(rate) => { setSpeechRate(rate); localStorage.setItem("speechRate", String(rate)); }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;

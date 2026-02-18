import { useState, useCallback } from "react";
import { countries } from "./data/countries";
import type { Country } from "./types";
import { FlagCard } from "./components/FlagCard";
import { FlagModal } from "./components/FlagModal";
import { SettingsPanel } from "./components/SettingsPanel";

function App() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [speechRate, setSpeechRate] = useState(() => {
    const saved = localStorage.getItem("speechRate");
    return saved ? parseFloat(saved) : 0.9;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

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

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="w-10 h-10 flex items-center justify-center rounded-2xl
                       bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-lg
                       shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95
                       transition-all duration-150"
          >
            {isFullscreen ? (
              /* Compress / exit fullscreen icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4m0 5H4m11-5v5m0 0h5M9 20v-5m0 0H4m11 5v-5m0 0h5" />
              </svg>
            ) : (
              /* Expand / enter fullscreen icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
            <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country, i) => (
            <FlagCard
              key={country.code}
              country={country}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
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

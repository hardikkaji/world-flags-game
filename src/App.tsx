import { useState } from "react";
import { countries } from "./data/countries";
import type { Country } from "./types";
import { FlagCard } from "./components/FlagCard";
import { FlagModal } from "./components/FlagModal";

function App() {
  const [selected, setSelected] = useState<Country | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">World Flags</h1>
            <p className="text-xs text-gray-500">{countries.length} countries to explore</p>
          </div>
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

      {/* Modal */}
      <FlagModal country={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;

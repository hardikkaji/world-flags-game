export type FilterMode = "all" | "alpha" | "continent";

interface FilterBarProps {
  mode: FilterMode;
  onModeChange: (mode: FilterMode) => void;
}

export function FilterBar({ mode, onModeChange }: FilterBarProps) {
  return (
    <div className="sticky top-[64px] z-30 bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2">
        <button
          onClick={() => onModeChange("all")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-black text-sm transition-all duration-150 active:scale-95
            ${mode === "all"
              ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md scale-105"
              : "bg-white text-gray-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-gray-100"}`}
        >
          🌐 All
        </button>
        <button
          onClick={() => onModeChange("alpha")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-black text-sm transition-all duration-150 active:scale-95
            ${mode === "alpha"
              ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md scale-105"
              : "bg-white text-gray-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-gray-100"}`}
        >
          🔤 A – Z
        </button>
        <button
          onClick={() => onModeChange("continent")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-black text-sm transition-all duration-150 active:scale-95
            ${mode === "continent"
              ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md scale-105"
              : "bg-white text-gray-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-gray-100"}`}
        >
          🌍 Continents
        </button>
      </div>
    </div>
  );
}

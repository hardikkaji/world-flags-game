import { useMemo } from "react";
import { useIntl } from "react-intl";
import type { Country } from "../types";
import { getLocalizedCountryName } from "../i18n/messages";
import { cardGradients } from "../ui/tokens";

interface FlagCardProps {
  country: Country;
  onClick: (country: Country) => void;
  index: number;
}

// Rotating vibrant card bg colors — kid friendly palette
// (defined centrally in tokens.ts)

export function FlagCard({ country, onClick, index }: FlagCardProps) {
  const intl = useIntl();
  const colorClass = cardGradients[index % cardGradients.length];
  const localizedName = useMemo(
    () => getLocalizedCountryName(country.code, intl.locale, country.name),
    [country.code, country.name, intl.locale]
  );

  return (
    <button
      onClick={() => onClick(country)}
      className={`group relative flex flex-col items-center gap-3 bg-gradient-to-br ${colorClass}
                  rounded-3xl p-4 pt-5 pb-4 shadow-lg border-4 border-white
                  hover:-translate-y-2 hover:shadow-2xl hover:scale-105
                  active:scale-95 active:shadow-md
                  transition-all duration-200 ease-out w-full overflow-hidden
                  focus:outline-none focus:ring-4 focus:ring-white/60`}
      aria-label={`${localizedName} flag`}
    >
      {/* Bubbly top-right decoration */}
      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white/25 rounded-full" />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/20 rounded-full" />

      {/* Flag bubble */}
      <div className="relative w-16 h-16 flex items-center justify-center bg-white/30 rounded-full shadow-inner
                      group-hover:bg-white/50 transition-colors duration-200">
        <span
          className="text-4xl leading-none select-none
                     group-hover:animate-[wobble_0.6s_ease-out]"
          role="img"
          aria-label={`Flag of ${localizedName}`}
        >
          {country.emoji}
        </span>
      </div>

      {/* Country name */}
      <span className="text-xs font-black text-white text-center leading-tight line-clamp-2 drop-shadow-sm tracking-wide uppercase">
        {localizedName}
      </span>
    </button>
  );
}

import { useMemo } from "react";
import { countries } from "../data/countries";
import { countryContinent, allContinents } from "../data/continents";
import type { Country } from "../types";
import type { FilterMode } from "../components/FilterBar";
import { getLocalizedCountryName } from "../i18n/messages";

export interface CountryGroup {
  /** null means "All" mode — no visible section header */
  label: string | null;
  items: Country[];
}

export function useCountryGrouping(filterMode: FilterMode, locale: string): CountryGroup[] {
  return useMemo(() => {
    const sorted = [...countries].sort((a, b) => {
      const nameA = getLocalizedCountryName(a.code, locale, a.name);
      const nameB = getLocalizedCountryName(b.code, locale, b.name);
      return nameA.localeCompare(nameB, locale);
    });

    if (filterMode === "all") {
      return [{ label: null, items: sorted }];
    }

    if (filterMode === "alpha") {
      const groups: Record<string, Country[]> = {};
      for (const c of sorted) {
        const letter = getLocalizedCountryName(c.code, locale, c.name)[0].toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(c);
      }
      return Object.entries(groups).map(([letter, items]) => ({ label: letter, items }));
    }

    // continent
    return allContinents
      .map((continent) => ({
        label: continent,
        items: sorted.filter((c) => countryContinent[c.code] === continent),
      }))
      .filter((g) => g.items.length > 0);
  }, [filterMode, locale]);
}

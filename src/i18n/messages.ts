export type AppLocale = "en" | "sv";

export const LOCALE_TTS: Record<AppLocale, string> = {
  en: "en-US",
  sv: "sv-SE",
};

export const messages: Record<AppLocale, Record<string, string>> = {
  en: {
    "app.title": "World Flags",
    "app.subtitle": "{count} countries to explore",

    "filter.all": "🌐 All",
    "filter.az": "🔤 A – Z",
    "filter.continents": "🌍 Continents",

    "modal.country.label": "Country",
    "modal.capital.label": "Capital City",
    "modal.speak": "Speak again",
    "modal.speaking": "Speaking…",
    "modal.tap.hint": "Tap outside to close",
    "modal.speech.text": "Country {name}. Its capital is {capital}.",

    "settings.title": "⚙️ Settings",
    "settings.speed": "🔊 Speaking Speed",
    "settings.slow": "🐢 Slow",
    "settings.normal": "🚶 Normal",
    "settings.fast": "🐇 Fast",
    "settings.done": "Done ✓",
    "settings.language": "🌐 Language",

    "lang.en": "🇬🇧 English",
    "lang.sv": "🇸🇪 Svenska",

    "langpicker.title": "Choose your language",
    "langpicker.subtitle": "You can change this anytime in Settings",

    "continent.Africa": "Africa",
    "continent.Asia": "Asia",
    "continent.Europe": "Europe",
    "continent.North America": "North America",
    "continent.South America": "South America",
    "continent.Oceania": "Oceania",
    "continent.Antarctica": "Antarctica",
  },
  sv: {
    "app.title": "Världsflaggor",
    "app.subtitle": "{count} länder att utforska",

    "filter.all": "🌐 Alla",
    "filter.az": "🔤 A – Ö",
    "filter.continents": "🌍 Kontinenter",

    "modal.country.label": "Land",
    "modal.capital.label": "Huvudstad",
    "modal.speak": "Tala igen",
    "modal.speaking": "Talar…",
    "modal.tap.hint": "Tryck utanför för att stänga",
    "modal.speech.text": "Land {name}. Dess huvudstad är {capital}.",

    "settings.title": "⚙️ Inställningar",
    "settings.speed": "🔊 Talhastighet",
    "settings.slow": "🐢 Långsam",
    "settings.normal": "🚶 Normal",
    "settings.fast": "🐇 Snabb",
    "settings.done": "Klar ✓",
    "settings.language": "🌐 Språk",

    "lang.en": "🇬🇧 English",
    "lang.sv": "🇸🇪 Svenska",

    "langpicker.title": "Välj ditt språk",
    "langpicker.subtitle": "Du kan ändra detta när som helst i Inställningar",

    "continent.Africa": "Afrika",
    "continent.Asia": "Asien",
    "continent.Europe": "Europa",
    "continent.North America": "Nordamerika",
    "continent.South America": "Sydamerika",
    "continent.Oceania": "Oceanien",
    "continent.Antarctica": "Antarktis",
  },
};

/** Get a localized country name via browser's Intl.DisplayNames, falling back to English name */
export function getLocalizedCountryName(code: string, locale: string, fallback: string): string {
  try {
    const dn = new Intl.DisplayNames([locale], { type: "region" });
    return dn.of(code) || fallback;
  } catch {
    return fallback;
  }
}

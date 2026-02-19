import { describe, it, expect } from 'vitest';
import { getLocalizedCountryName, messages, LOCALE_TTS } from '../messages';

describe('getLocalizedCountryName', () => {
  it('returns the English name for a valid ISO code in "en" locale', () => {
    // SE = Sweden
    const name = getLocalizedCountryName('SE', 'en', 'Sweden');
    expect(name).toBe('Sweden');
  });

  it('returns a Swedish name for a valid ISO code in "sv" locale', () => {
    const name = getLocalizedCountryName('SE', 'sv', 'Sweden');
    expect(name).toBe('Sverige');
  });

  it('falls back to the provided English name for unsupported codes', () => {
    // XK = Kosovo — not in ISO 3166 standard, Intl.DisplayNames returns undefined
    const name = getLocalizedCountryName('XK', 'en', 'Kosovo');
    expect(name).toBe('Kosovo');
  });

  it('falls back when locale is invalid', () => {
    const name = getLocalizedCountryName('US', 'not-a-locale', 'United States');
    // Should not throw; returns fallback
    expect(typeof name).toBe('string');
    expect(name.length).toBeGreaterThan(0);
  });
});

describe('messages', () => {
  it('contains all required keys for "en"', () => {
    const required = [
      'app.title', 'app.subtitle',
      'filter.all', 'filter.az', 'filter.continents',
      'modal.country.label', 'modal.capital.label',
      'modal.speak', 'modal.speaking', 'modal.speech.text',
      'settings.title', 'settings.speed', 'settings.done',
      'settings.language', 'lang.en', 'lang.sv',
      'langpicker.title',
    ];
    for (const key of required) {
      expect(messages.en[key], `Missing key "${key}" in en messages`).toBeDefined();
    }
  });

  it('contains all required keys for "sv"', () => {
    const enKeys = Object.keys(messages.en);
    const svKeys = Object.keys(messages.sv);
    // sv must have at least the same keys as en
    for (const key of enKeys) {
      expect(svKeys, `Missing key "${key}" in sv messages`).toContain(key);
    }
  });

  it('en and sv messages differ for translated strings', () => {
    expect(messages.en['app.title']).not.toBe(messages.sv['app.title']);
    expect(messages.en['filter.all']).not.toBe(messages.sv['filter.all']);
  });
});

describe('LOCALE_TTS', () => {
  it('maps "en" to en-US', () => {
    expect(LOCALE_TTS.en).toBe('en-US');
  });

  it('maps "sv" to sv-SE', () => {
    expect(LOCALE_TTS.sv).toBe('sv-SE');
  });
});

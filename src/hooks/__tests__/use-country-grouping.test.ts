import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCountryGrouping } from '../use-country-grouping';
import { countries } from '../../data/countries';
import { getLocalizedCountryName } from '../../i18n/messages';

describe('useCountryGrouping', () => {
  it('"all" mode returns a single group with all countries sorted A-Z by localized name', () => {
    const { result } = renderHook(() => useCountryGrouping('all', 'en'));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].label).toBeNull();
    expect(result.current[0].items).toHaveLength(countries.length);

    // Verify sorted by localized name (same logic as hook uses)
    const items = result.current[0].items;
    for (let i = 0; i < items.length - 1; i++) {
      const nameA = getLocalizedCountryName(items[i].code, 'en', items[i].name);
      const nameB = getLocalizedCountryName(items[i + 1].code, 'en', items[i + 1].name);
      expect(nameA.localeCompare(nameB, 'en')).toBeLessThanOrEqual(0);
    }
  });

  it('"alpha" mode groups countries by first letter', () => {
    const { result } = renderHook(() => useCountryGrouping('alpha', 'en'));
    const groups = result.current;

    // Each group label should be a single uppercase letter
    for (const group of groups) {
      expect(group.label).toMatch(/^[A-Z]$/);
      expect(group.items.length).toBeGreaterThan(0);
    }

    // Countries in each group must start with that letter (using localized name)
    const aGroup = groups.find((g) => g.label === 'A');
    expect(aGroup).toBeDefined();
    for (const c of aGroup!.items) {
      expect(c.name[0].toUpperCase()).toBe('A');
    }
  });

  it('"alpha" mode groups are sorted alphabetically', () => {
    const { result } = renderHook(() => useCountryGrouping('alpha', 'en'));
    const labels = result.current.map((g) => g.label as string);
    const sorted = [...labels].sort((a, b) => a.localeCompare(b, 'en'));
    expect(labels).toEqual(sorted);
  });

  it('"continent" mode returns groups for known continents', () => {
    const { result } = renderHook(() => useCountryGrouping('continent', 'en'));
    const labels = result.current.map((g) => g.label);
    expect(labels).toContain('Asia');
    expect(labels).toContain('Europe');
    expect(labels).toContain('Africa');
  });

  it('"continent" mode groups contain no empty groups', () => {
    const { result } = renderHook(() => useCountryGrouping('continent', 'en'));
    for (const group of result.current) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('"continent" mode total items equals all countries', () => {
    const { result } = renderHook(() => useCountryGrouping('continent', 'en'));
    const total = result.current.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(countries.length);
  });
});

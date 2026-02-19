import { describe, it, expect } from 'vitest';
import {
  gradients,
  cardGradients,
  iconButtonBase,
  pillButtonBase,
  actionButtonBase,
  optionButtonBase,
} from '../tokens';

describe('tokens', () => {
  describe('gradients', () => {
    it('all gradient values are non-empty strings with "from-" prefix', () => {
      for (const [key, value] of Object.entries(gradients)) {
        expect(typeof value, `gradients.${key}`).toBe('string');
        expect(value, `gradients.${key}`).toMatch(/^from-/);
      }
    });

    it('has primary and info gradients defined', () => {
      expect(gradients.primary).toBeDefined();
      expect(gradients.info).toBeDefined();
    });
  });

  describe('cardGradients', () => {
    it('contains 8 rotating card colors', () => {
      expect(cardGradients).toHaveLength(8);
    });

    it('all card gradients contain "from-" and "to-"', () => {
      for (const g of cardGradients) {
        expect(g).toMatch(/from-/);
        expect(g).toMatch(/to-/);
      }
    });
  });

  describe('base class strings', () => {
    it('iconButtonBase includes w-10 and h-10', () => {
      expect(iconButtonBase).toContain('w-10');
      expect(iconButtonBase).toContain('h-10');
    });

    it('pillButtonBase includes rounded-full', () => {
      expect(pillButtonBase).toContain('rounded-full');
    });

    it('actionButtonBase includes w-full', () => {
      expect(actionButtonBase).toContain('w-full');
    });

    it('optionButtonBase includes flex-1', () => {
      expect(optionButtonBase).toContain('flex-1');
    });
  });
});

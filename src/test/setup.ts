import '@testing-library/jest-dom';

// ── Mock Web Speech API (not available in jsdom) ─────────────────────────────

class MockSpeechSynthesisUtterance {
  text: string;
  rate: number = 1;
  pitch: number = 1;
  lang: string = '';
  onstart: ((e: Event) => void) | null = null;
  onend: ((e: Event) => void) | null = null;
  onerror: ((e: Event) => void) | null = null;
  constructor(text: string) { this.text = text; }
}

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  value: MockSpeechSynthesisUtterance,
  writable: true,
});

Object.defineProperty(window, 'speechSynthesis', {
  value: { cancel: () => {}, speak: () => {} },
  writable: true,
});

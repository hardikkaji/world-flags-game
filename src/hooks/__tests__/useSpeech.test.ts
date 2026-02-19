import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSpeech } from '../useSpeech';

// ── Mock Web Speech API ──────────────────────────────────────────────────────

const mockCancel = vi.fn();
const mockSpeak = vi.fn();
let capturedUtterance: SpeechSynthesisUtterance | null = null;

beforeEach(() => {
  vi.clearAllMocks();
  capturedUtterance = null;
  mockSpeak.mockImplementation((u: SpeechSynthesisUtterance) => {
    capturedUtterance = u;
  });
  Object.defineProperty(window, 'speechSynthesis', {
    value: { cancel: mockCancel, speak: mockSpeak },
    writable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ────────────────────────────────────────────────────────────────────────────

describe('useSpeech', () => {
  it('starts with speaking = false', () => {
    const { result } = renderHook(() => useSpeech());
    expect(result.current.speaking).toBe(false);
  });

  it('calls speechSynthesis.cancel then speak when speak() is called', () => {
    const { result } = renderHook(() => useSpeech({ rate: 1.0, lang: 'en-US' }));
    act(() => { result.current.speak('Hello world'); });
    expect(mockCancel).toHaveBeenCalledTimes(1);
    expect(mockSpeak).toHaveBeenCalledTimes(1);
  });

  it('sets utterance rate, pitch, and lang from options', () => {
    const { result } = renderHook(() => useSpeech({ rate: 0.75, pitch: 1.2, lang: 'sv-SE' }));
    act(() => { result.current.speak('Hej'); });
    expect(capturedUtterance?.rate).toBe(0.75);
    expect(capturedUtterance?.pitch).toBe(1.2);
    expect(capturedUtterance?.lang).toBe('sv-SE');
  });

  it('sets speaking = true on utterance.onstart and false on onend', () => {
    const { result } = renderHook(() => useSpeech());
    act(() => { result.current.speak('Test'); });
    act(() => { capturedUtterance?.onstart?.(new Event('start') as SpeechSynthesisEvent); });
    expect(result.current.speaking).toBe(true);
    act(() => { capturedUtterance?.onend?.(new Event('end') as SpeechSynthesisEvent); });
    expect(result.current.speaking).toBe(false);
  });

  it('sets speaking = false on utterance.onerror', () => {
    const { result } = renderHook(() => useSpeech());
    act(() => { result.current.speak('Test'); });
    act(() => { capturedUtterance?.onstart?.(new Event('start') as SpeechSynthesisEvent); });
    act(() => { capturedUtterance?.onerror?.(new Event('error') as SpeechSynthesisErrorEvent); });
    expect(result.current.speaking).toBe(false);
  });

  it('cancel() calls speechSynthesis.cancel and resets speaking', () => {
    const { result } = renderHook(() => useSpeech());
    act(() => { result.current.speak('Test'); });
    act(() => { capturedUtterance?.onstart?.(new Event('start') as SpeechSynthesisEvent); });
    act(() => { result.current.cancel(); });
    expect(mockCancel).toHaveBeenCalledTimes(2); // once in speak, once in cancel
    expect(result.current.speaking).toBe(false);
  });

  it('cancels speech on unmount', () => {
    const { result, unmount } = renderHook(() => useSpeech());
    act(() => { result.current.speak('Test'); });
    unmount();
    expect(mockCancel).toHaveBeenCalled();
  });
});

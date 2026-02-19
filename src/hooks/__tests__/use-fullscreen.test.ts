import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFullscreen } from '../use-fullscreen';

// ── Helpers ──────────────────────────────────────────────────────────────────

function mockFullscreenAPI({
  enabled = true,
  element = null,
}: { enabled?: boolean; element?: Element | null } = {}) {
  Object.defineProperty(document, 'fullscreenEnabled', { value: enabled, configurable: true });
  Object.defineProperty(document, 'fullscreenElement', { value: element, configurable: true });
  document.documentElement.requestFullscreen = vi.fn().mockResolvedValue(undefined);
  document.exitFullscreen = vi.fn().mockResolvedValue(undefined);
}

function fireFullscreenChange() {
  document.dispatchEvent(new Event('fullscreenchange'));
}

// ────────────────────────────────────────────────────────────────────────────

describe('useFullscreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFullscreenAPI();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reports isSupported = true when fullscreenEnabled', () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current.isSupported).toBe(true);
  });

  it('starts with isFullscreen = false', () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current.isFullscreen).toBe(false);
  });

  it('calls requestFullscreen when toggled while not fullscreen', () => {
    const { result } = renderHook(() => useFullscreen());
    act(() => { result.current.toggle(); });
    expect(document.documentElement.requestFullscreen).toHaveBeenCalledTimes(1);
  });

  it('calls exitFullscreen when toggled while fullscreen', () => {
    // Simulate being in fullscreen
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      configurable: true,
    });
    const { result } = renderHook(() => useFullscreen());
    act(() => { result.current.toggle(); });
    expect(document.exitFullscreen).toHaveBeenCalledTimes(1);
  });

  it('syncs isFullscreen state via fullscreenchange event', () => {
    const { result } = renderHook(() => useFullscreen());
    // Simulate browser entering fullscreen
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      configurable: true,
    });
    act(() => { fireFullscreenChange(); });
    expect(result.current.isFullscreen).toBe(true);

    // Simulate browser exiting fullscreen (e.g. Escape key)
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    act(() => { fireFullscreenChange(); });
    expect(result.current.isFullscreen).toBe(false);
  });

  it('removes event listeners on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useFullscreen());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('webkitfullscreenchange', expect.any(Function));
  });
});

import { useState, useCallback, useEffect } from "react";

interface UseFullscreenReturn {
  isFullscreen: boolean;
  toggle: () => void;
  isSupported: boolean;
}

export function useFullscreen(): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isSupported =
    document.fullscreenEnabled ||
    (document as unknown as Record<string, unknown>)["webkitFullscreenEnabled"] === true;

  const toggle = useCallback(() => {
    const doc = document as unknown as Record<string, unknown>;
    const el = document.documentElement as unknown as Record<string, unknown>;
    const isFull = !!(document.fullscreenElement || doc["webkitFullscreenElement"]);

    if (!isFull) {
      if (typeof el["requestFullscreen"] === "function") {
        (el["requestFullscreen"] as () => Promise<void>)();
      } else if (typeof el["webkitRequestFullscreen"] === "function") {
        (el["webkitRequestFullscreen"] as () => void)();
      }
    } else {
      if (typeof document.exitFullscreen === "function") {
        document.exitFullscreen();
      } else if (typeof doc["webkitExitFullscreen"] === "function") {
        (doc["webkitExitFullscreen"] as () => void)();
      }
    }
  }, []);

  useEffect(() => {
    const sync = () => {
      const doc = document as unknown as Record<string, unknown>;
      setIsFullscreen(!!(document.fullscreenElement || doc["webkitFullscreenElement"]));
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  return { isFullscreen, toggle, isSupported };
}

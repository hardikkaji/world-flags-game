import { useState, useCallback, useEffect, useRef } from "react";

interface UseSpeechOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
}

interface UseSpeechReturn {
  speaking: boolean;
  speak: (text: string) => void;
  cancel: () => void;
}

export function useSpeech({ rate = 0.9, pitch = 1.1, lang = "en-US" }: UseSpeechOptions = {}): UseSpeechReturn {
  const [speaking, setSpeaking] = useState(false);
  // Keep latest options in a ref so speak() closure is always fresh
  const optsRef = useRef({ rate, pitch, lang });
  useEffect(() => { optsRef.current = { rate, pitch, lang }; }, [rate, pitch, lang]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = optsRef.current.rate;
    utterance.pitch = optsRef.current.pitch;
    utterance.lang = optsRef.current.lang;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  // Cancel on unmount
  useEffect(() => cancel, [cancel]);

  return { speaking, speak, cancel };
}

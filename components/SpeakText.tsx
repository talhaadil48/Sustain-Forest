"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider."
export default function SpeakText({ textKey }: { textKey: string }) {
  const { language, t } = useLanguage();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = () => {
    const text = t(textKey);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = language === "ur" ? "ur-PK" : "en-US";

    const voice =
      voices.find((v) => v.lang.toLowerCase().startsWith("ur")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("ar")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en"));

    if (voice) utterance.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => setIsSpeaking(false);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div style={{ display: "inline-flex", gap: "0.3rem", alignItems: "center" }}>
    {/* Speaker Icon Button */}
    <button onClick={speak} title="Speak" aria-label="Speak">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        width="22"
        height="22"
      >
        <path d="M11.536 3.03a1 1 0 0 1 1.464.88v16.18a1 1 0 0 1-1.536.844l-4.685-3.13H4a1 1 0 0 1-1-1V8.195a1 1 0 0 1 1-1h2.316l5.22-4.14zM18.364 6.636a1 1 0 0 1 1.414 1.414 7 7 0 0 1 0 9.9 1 1 0 0 1-1.414-1.414 5 5 0 0 0 0-7.071 1 1 0 0 1 0-1.415zm-2.828 2.828a1 1 0 0 1 1.414 1.414 3 3 0 0 1 0 4.243 1 1 0 0 1-1.414-1.414 1 1 0 0 0 0-1.415 1 1 0 0 1 0-1.414z" />
      </svg>
    </button>

      {/* Stop Icon */}
      {isSpeaking && (
        <button onClick={stop} title="Stop" aria-label="Stop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width={20}
            height={20}
          >
            <path d="M6 6h12v12H6z" />
          </svg>
        </button>
      )}
    </div>
  );
}
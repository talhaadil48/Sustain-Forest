"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider.";
import { Volume2, Square } from "lucide-react";

export default function SpeakText({ textKey }: { textKey: string }) {
  const { language, t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = async () => {
    if (isSpeaking) return;

    setIsSpeaking(true);
    const text = t(textKey);

    try {
      const res = await fetch(
        "https://translate-server-rust.vercel.app/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, lang: language === "ur" ? "ur" : "en" }),
        }
      );

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = url;
      } else {
        audioRef.current = new Audio(url);
      }

      audioRef.current.playbackRate = 1.5;
      audioRef.current.onended = () => setIsSpeaking(false);
      audioRef.current.play();
    } catch (err) {
      console.error("TTS error:", err);
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    stop();
  }, [textKey, language]);
  return (
    <div className="inline-flex items-center gap-1">
      {!isSpeaking ? (
        <button
          onClick={speak}
          title="Speak"
          aria-label="Speak"
          className="p-1 rounded"
        >
          <Volume2 size={22} />
        </button>
      ) : (
        <button
          onClick={stop}
          title="Stop"
          aria-label="Stop"
          className="p-1 rounded"
        >
          <Square size={20} />
        </button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";
import AudioManager from "@/lib/AudioManager";
import { useLanguage } from "./LanguageProvider."; // adjust path

export default function SpeakText({ textKey }: { textKey: string }) {
  const { language, t } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const keys = textKey.split("|");
  textKey = keys.map((key) => t(key)).join(" ");

  const speak = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);

    const text = t(textKey);

    try {
      const res = await fetch("https://translate-server-rust.vercel.app/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: language === "ur" ? "ur" : "en" }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.playbackRate = 1.5;

      AudioManager.play(audio, () => setIsSpeaking(false));
    } catch (error) {
      console.error("TTS error:", error);
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    AudioManager.stop();
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

"use client";

import { useRef, useState } from "react";
import { Volume2, Square } from "lucide-react";
import { useLanguage } from "./LanguageProvider.";

// Global reference to currently playing audio
let currentAudio: HTMLAudioElement | null = null;

interface SpeakAudioProps {
  file: string;
}

export default function SpeakAudio({ file }: SpeakAudioProps) {
  const { language } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Stop the currently playing audio (if it's not this one)
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.dispatchEvent(new Event("force-stop"));
    }

    if (isSpeaking) {
      audio.pause();
      audio.currentTime = 0;
      setIsSpeaking(false);
      currentAudio = null;
    } else {
       audio.playbackRate = language === "ur" ? 1.25 : 1;

      audio.play();
      setIsSpeaking(true);
      currentAudio = audio;

      // Reset state when audio ends
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudio = null;
      };

      // Handle forced stop from other component
      const stopHandler = () => {
        setIsSpeaking(false);
      };
      audio.addEventListener("force-stop", stopHandler);

      // Cleanup listener when unmounted
      return () => {
        audio.removeEventListener("force-stop", stopHandler);
      };
    }
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <audio
        ref={audioRef}
        src={`/voice/${language}/${file}.mp3`}
        preload="auto"
      />
      <button onClick={handleTogglePlay}>
        {isSpeaking ? <Square size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}

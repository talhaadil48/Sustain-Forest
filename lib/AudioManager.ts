// lib/AudioManager.ts
class AudioManager {
  private static instance: AudioManager;
  private currentAudio: HTMLAudioElement | null = null;
  private onStopCallback: (() => void) | null = null;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  play(audio: HTMLAudioElement, onStop: () => void) {
    this.stop(); // stop previous audio

    this.currentAudio = audio;
    this.onStopCallback = onStop;

    audio.onended = () => {
      this.currentAudio = null;
      this.onStopCallback?.();
    };

    audio.play();
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    if (this.onStopCallback) {
      this.onStopCallback();
      this.onStopCallback = null;
    }
  }
}

export default AudioManager.getInstance();

'use client'
import {Howl, Howler} from "howler";

class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, Howl> = {};

  private constructor() {
    this.sounds = {
          };
    Howler.volume(0.7);
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  play(name: string) { this.sounds[name]?.play(); }
  stop(name: string) { this.sounds[name]?.stop(); }
  setVolume(volume: number) { Howler.volume(volume); }
}

export default SoundManager;
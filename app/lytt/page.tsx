'use client';
import { useState, useRef } from 'react';
import { episodes } from '@/lib/data';

export default function LyttPage() {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function togglePlay(id: number) {
    if (playing === id) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(`/audio/Episode_${String(id).padStart(2, '0')}.mp3`);
      audio.onended = () => setPlaying(null);
      audio.play();
      audioRef.current = audio;
      setPlaying(id);
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 pt-6">
      <h1 className="text-2xl font-black mb-1">🎧 Lytt til podcasten</h1>
      <p className="text-sm text-deep/60 mb-6">12 episoder — norsk forklaring + spanske modellsvar</p>

      <div className="grid gap-3">
        {episodes.map((ep) => (
          <button
            key={ep.id}
            onClick={() => togglePlay(ep.id)}
            className={`w-full text-left rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-[0.98] ${
              playing === ep.id
                ? 'bg-coral text-white shadow-lg scale-[1.02]'
                : 'bg-white shadow-sm hover:shadow-md'
            }`}
          >
            <span className="text-2xl">{playing === ep.id ? '⏸️' : ep.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">
                {ep.id}. {ep.title}
              </p>
              <p className={`text-xs truncate ${playing === ep.id ? 'text-white/80' : 'text-deep/50'}`}>
                {ep.desc}
              </p>
            </div>
            <span className={`text-xs font-mono ${playing === ep.id ? 'text-white/70' : 'text-deep/40'}`}>
              {ep.duration}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-sky rounded-2xl p-4 mt-6 mb-8">
        <p className="text-sm font-bold mb-1">💡 Tips:</p>
        <p className="text-xs text-deep/70">
          Gjenta etter Carlos! Si frasene HØYT — det er sånn de fester seg.
          Pause og spol tilbake så mye du vil.
        </p>
      </div>
    </main>
  );
}

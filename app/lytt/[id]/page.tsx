'use client';
import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { episodes } from '@/lib/data';
import { manuscripts } from '@/lib/manuscripts';

const speakerStyles: Record<string, { bg: string; border: string; label: string; flag: string }> = {
  VERTEN: { bg: 'bg-purple-50', border: 'border-l-purple-400', label: 'Verten', flag: '🇳🇴' },
  CARLOS: { bg: 'bg-red-50', border: 'border-l-coral', label: 'Carlos', flag: '🇪🇸' },
  SENSOREN: { bg: 'bg-blue-50', border: 'border-l-blue-400', label: 'Sensoren', flag: '🇪🇸' },
  LISA: { bg: 'bg-purple-50', border: 'border-l-purple-400', label: 'Verten', flag: '🇳🇴' },
  ELENA: { bg: 'bg-blue-50', border: 'border-l-blue-400', label: 'Sensoren', flag: '🇪🇸' },
};

export default function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const epNum = parseInt(id);
  const episode = episodes.find(e => e.id === epNum);
  const segments = manuscripts[epNum] || [];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const audio = new Audio(`/audio/Episode_${String(epNum).padStart(2, '0')}.mp3`);
    audioRef.current = audio;
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => { audio.pause(); audio.remove(); };
  }, [epNum]);

  // Estimate which segment we're at based on time proportion
  useEffect(() => {
    if (segments.length === 0 || duration === 0) return;
    const totalChars = segments.reduce((sum, s) => sum + s.text.length, 0);
    let charsSoFar = 0;
    const proportion = currentTime / duration;
    const targetChars = proportion * totalChars;
    for (let i = 0; i < segments.length; i++) {
      charsSoFar += segments[i].text.length;
      if (charsSoFar >= targetChars) {
        if (i !== activeSegment) {
          setActiveSegment(i);
          if (autoScroll && segmentRefs.current[i]) {
            segmentRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        break;
      }
    }
  }, [currentTime, duration, segments, activeSegment, autoScroll]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = parseFloat(e.target.value);
  }

  function jumpToSegment(idx: number) {
    if (!audioRef.current || duration === 0) return;
    const totalChars = segments.reduce((sum, s) => sum + s.text.length, 0);
    let charsBefore = 0;
    for (let i = 0; i < idx; i++) charsBefore += segments[i].text.length;
    audioRef.current.currentTime = (charsBefore / totalChars) * duration;
    setActiveSegment(idx);
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  if (!episode) return <p className="p-8 text-center">Episode ikke funnet</p>;

  return (
    <main className="max-w-lg mx-auto px-4 pt-4 pb-48">
      <Link href="/lytt" className="text-sm text-deep/40 mb-3 inline-block">← Alle episoder</Link>

      <h1 className="text-xl font-black mb-1">
        {episode.emoji} {episode.id}. {episode.title}
      </h1>
      <p className="text-sm text-deep/50 mb-4">{episode.desc}</p>

      {/* Manuscript / Teleprompter */}
      <div className="space-y-2 mb-6">
        {segments.map((seg, i) => {
          const style = speakerStyles[seg.speaker] || speakerStyles.VERTEN;
          const isActive = i === activeSegment && isPlaying;

          return (
            <div
              key={i}
              ref={el => { segmentRefs.current[i] = el; }}
              onClick={() => jumpToSegment(i)}
              className={`
                border-l-4 ${style.border} ${style.bg} rounded-r-xl p-3 cursor-pointer
                transition-all duration-300
                ${isActive ? 'ring-2 ring-coral shadow-md scale-[1.01]' : 'opacity-70 hover:opacity-100'}
                ${seg.slow ? 'italic' : ''}
              `}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs">{style.flag}</span>
                <span className="text-[10px] font-bold text-deep/40 uppercase">{style.label}</span>
                {seg.slow && <span className="text-[10px] bg-yellow-200 text-yellow-800 px-1.5 rounded-full">sakte</span>}
              </div>
              <p className="text-sm leading-relaxed">{seg.text}</p>
            </div>
          );
        })}
      </div>

      {/* Sticky audio player */}
      <div className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-coral text-white rounded-full flex items-center justify-center text-xl flex-shrink-0 hover:bg-coral/90 active:scale-95 transition-all"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={seek}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-coral"
              />
              <div className="flex justify-between text-[10px] text-deep/40 mt-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`text-xs px-2 py-1 rounded-full border ${autoScroll ? 'bg-ocean text-white border-ocean' : 'bg-white text-deep/40 border-gray-200'}`}
            >
              {autoScroll ? '📜 Auto' : '📜 Manuell'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

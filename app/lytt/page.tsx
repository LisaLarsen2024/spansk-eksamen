'use client';
import Link from 'next/link';
import { episodes } from '@/lib/data';

export default function LyttPage() {
  return (
    <main className="max-w-lg mx-auto px-4 pt-6">
      <h1 className="text-2xl font-black mb-1">🎧 Lytt til podcasten</h1>
      <p className="text-sm text-deep/60 mb-2">12 episoder — norsk forklaring + spanske modellsvar</p>
      <p className="text-xs text-ocean font-semibold mb-6">Trykk for å åpne med manus!</p>

      <div className="grid gap-3 mb-8">
        {episodes.map((ep) => (
          <Link
            key={ep.id}
            href={`/lytt/${ep.id}`}
            className="w-full text-left rounded-2xl p-4 flex items-center gap-3 bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all border-2 border-transparent hover:border-coral"
          >
            <span className="text-2xl">{ep.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">
                {ep.id}. {ep.title}
              </p>
              <p className="text-xs text-deep/50 truncate">{ep.desc}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-mono text-deep/40">{ep.duration}</span>
              <p className="text-[10px] text-ocean">+ manus</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-sky rounded-2xl p-4 mb-8">
        <p className="text-sm font-bold mb-1">💡 Teleprompter-modus:</p>
        <p className="text-xs text-deep/70">
          Åpne en episode for å se manuset fargekoda mens du lytter.
          🇳🇴 Lilla = norsk forklaring. 🇪🇸 Korall = spansk modellsvar. 🇪🇸 Blå = sensorspørsmål.
          Trykk på en tekstblokk for å hoppe dit!
        </p>
      </div>
    </main>
  );
}

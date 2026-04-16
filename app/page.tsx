'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';

function getProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('spansk-progress') || '{}');
  } catch { return {}; }
}

export default function Home() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completed = Object.values(progress).filter(Boolean).length;
  const totalTasks = 28;

  const sections = [
    { href: '/lytt', emoji: '🎧', title: 'Lytt med manus', desc: 'Podcast + teleprompter — hør OG les!', color: 'bg-rose', border: 'border-coral' },
    { href: '/drill', emoji: '🃏', title: 'Drill flashcards', desc: 'Smart repetisjon — svake kort kommer oftere', color: 'bg-sky', border: 'border-ocean' },
    { href: '/trening', emoji: '🎤', title: 'Trening + opptak', desc: 'Mock-eksamen, 60-sek challenge, hør deg selv!', color: 'bg-peach', border: 'border-sun' },
    { href: '/sensor', emoji: '🤖', title: 'AI-Sensor', desc: 'Snakk spansk med en AI — som ekte eksamen!', color: 'bg-sky', border: 'border-blue-400' },
    { href: '/min-versjon', emoji: '✨', title: 'Min versjon', desc: 'Gjør svarene til DINE — personlig = husker', color: 'bg-peach', border: 'border-lavender' },
    { href: '/plan', emoji: '📋', title: '7-dagers plan', desc: 'Dag for dag — hak av, se konfetti!', color: 'bg-mint', border: 'border-success' },
    { href: '/jukselapp', emoji: '📝', title: 'Jukselappen', desc: 'Alle fraser på ett sted — ta screenshot!', color: 'bg-rose', border: 'border-lavender' },
  ];

  return (
    <main className="max-w-lg mx-auto px-4 pt-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black mb-2">Spansk Muntlig</h1>
        <p className="text-5xl mb-3">🇪🇸</p>
        <p className="text-xl font-bold text-coral">Du klarer dette!</p>
        <p className="text-sm text-deep/60 mt-2">Alt du trenger for å bestå — på ett sted</p>
      </div>

      {/* Første gang? */}
      <Link
        href="/guide"
        className="block bg-ocean/10 border-2 border-ocean rounded-2xl p-4 mb-4 text-center hover:bg-ocean/20 transition-colors"
      >
        <p className="font-bold text-ocean">Første gang her? 👋</p>
        <p className="text-xs text-deep/50">Trykk for en rask guide til hvordan du bruker appen</p>
      </Link>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <ProgressBar current={completed} total={totalTasks} label="Din progresjon" />
        <p className="text-xs text-deep/50 mt-2 text-center">
          {completed === 0
            ? "Klar til å starte? Let's go! 🚀"
            : completed < 10
            ? `${completed} av ${totalTasks} oppgaver — bra start! 💪`
            : completed < 20
            ? `${completed} av ${totalTasks} — du er godt i gang! 🔥`
            : `${completed} av ${totalTasks} — SJEF! Du eier dette! 👑`}
        </p>
      </div>

      <div className="grid gap-3 mb-8">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`${s.color} border-2 ${s.border} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-transform`}
          >
            <span className="text-3xl">{s.emoji}</span>
            <div>
              <h2 className="font-bold text-lg">{s.title}</h2>
              <p className="text-sm text-deep/60">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-br from-coral to-sun text-white rounded-2xl p-6 text-center mb-8">
        <p className="text-lg font-bold mb-2">Husk:</p>
        <p className="text-sm leading-relaxed">
          Sensor leter etter det du KAN — ikke det du ikke kan.
          Det er bedre å snakke mye med noen feil enn å si lite og &quot;perfekt&quot;.
          Kommunikasjon slår perfeksjon!
        </p>
      </div>
    </main>
  );
}

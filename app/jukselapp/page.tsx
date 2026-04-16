'use client';
import { useState } from 'react';
import { flashcards } from '@/lib/data';

const sections = [
  { id: 'mening', title: 'Si hva du mener', emoji: '💭', color: 'border-coral bg-rose' },
  { id: 'argument', title: 'Argumenter og bind sammen', emoji: '🔗', color: 'border-sun bg-peach' },
  { id: 'sammenlign', title: 'Sammenlign med Norge', emoji: '⚖️', color: 'border-ocean bg-sky' },
  { id: 'avslutt', title: 'Avslutt med stil', emoji: '🎬', color: 'border-lavender bg-rose' },
  { id: 'redning', title: 'Når du står fast', emoji: '🆘', color: 'border-success bg-mint' },
  { id: 'ordbank', title: 'Viktige ord', emoji: '📚', color: 'border-deep/20 bg-white' },
];

export default function JukselappPage() {
  const [open, setOpen] = useState<string | null>('mening');

  return (
    <main className="max-w-lg mx-auto px-4 pt-6">
      <h1 className="text-2xl font-black mb-1">📝 Jukselappen</h1>
      <p className="text-sm text-deep/60 mb-6">Alle fraser sortert — ta et screenshot!</p>

      <div className="grid gap-3 mb-8">
        {sections.map((section) => {
          const cards = flashcards.filter(c => c.category === section.id);
          const isOpen = open === section.id;

          return (
            <div key={section.id} className={`rounded-2xl border-2 ${section.color} overflow-hidden`}>
              <button
                onClick={() => setOpen(isOpen ? null : section.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span className="text-2xl">{section.emoji}</span>
                <span className="font-bold flex-1">{section.title}</span>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  {cards.map((card, i) => (
                    <div key={i} className="py-2 border-b border-gray-100 last:border-0">
                      <p className="font-bold text-sm italic text-coral">{card.es}</p>
                      <p className="text-xs text-deep/60 mt-0.5">{card.no}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Presentasjonsmal */}
      <div className="bg-gradient-to-br from-coral to-sun text-white rounded-2xl p-5 mb-8">
        <p className="font-bold text-lg mb-3">Presentasjonsmal:</p>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-bold opacity-80">1. Innledning (30 sek)</p>
            <p className="italic">&quot;Buenos días. Hoy voy a hablar sobre...
            Este tema me parece importante porque...&quot;</p>
          </div>
          <div>
            <p className="font-bold opacity-80">2. Hoveddel (3-4 min)</p>
            <p className="italic">Punkt 1 → Punkt 2 → Sammenlign med Norge</p>
          </div>
          <div>
            <p className="font-bold opacity-80">3. Avslutning (30 sek)</p>
            <p className="italic">&quot;En conclusión, personalmente creo que...
            Muchas gracias.&quot;</p>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';
import { useState, useEffect, useCallback } from 'react';
import { flashcards } from '@/lib/data';
import Confetti from '@/components/Confetti';
import ProgressBar from '@/components/ProgressBar';

const categories = [
  { id: 'all', label: 'Alle', emoji: '🌟' },
  { id: 'mening', label: 'Mening', emoji: '💭' },
  { id: 'argument', label: 'Argument', emoji: '🔗' },
  { id: 'sammenlign', label: 'Sammenlign', emoji: '⚖️' },
  { id: 'avslutt', label: 'Avslutt', emoji: '🎬' },
  { id: 'redning', label: 'Redning', emoji: '🆘' },
  { id: 'ordbank', label: 'Ordbank', emoji: '📚' },
];

export default function DrillPage() {
  const [category, setCategory] = useState('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNo, setShowNo] = useState(true); // start with Norwegian, reveal Spanish

  const cards = category === 'all'
    ? flashcards
    : flashcards.filter(c => c.category === category);

  const card = cards[index];
  const total = cards.length;

  const nextCard = useCallback((wasCorrect: boolean) => {
    if (wasCorrect) {
      setCorrect(c => c + 1);
      if (index === total - 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      }
    }
    setFlipped(false);
    setTimeout(() => {
      setIndex(i => (i + 1) % total);
    }, 300);
  }, [index, total]);

  function reset() {
    setIndex(0);
    setCorrect(0);
    setFlipped(false);
  }

  if (!card) return null;

  return (
    <main className="max-w-lg mx-auto px-4 pt-6">
      <Confetti trigger={showConfetti} />

      <h1 className="text-2xl font-black mb-1">🃏 Drill flashcards</h1>
      <p className="text-sm text-deep/60 mb-4">Trykk på kortet for å snu — si svaret HØYT først!</p>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id); setIndex(0); setCorrect(0); setFlipped(false); }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              category === cat.id
                ? 'bg-coral text-white'
                : 'bg-white text-deep/60 hover:bg-gray-100'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <ProgressBar current={index + 1} total={total} label={`Kort ${index + 1} av ${total}`} />

      {/* Direction toggle */}
      <div className="flex justify-center mt-3 mb-4">
        <button
          onClick={() => { setShowNo(!showNo); setFlipped(false); }}
          className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 text-deep/60"
        >
          {showNo ? '🇳🇴 → 🇪🇸 (se norsk, gjett spansk)' : '🇪🇸 → 🇳🇴 (se spansk, gjett norsk)'}
        </button>
      </div>

      {/* Card */}
      <div
        className={`flip-card cursor-pointer mx-auto w-full max-w-sm h-48 ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-card-inner relative w-full h-full">
          {/* Front */}
          <div className="flip-card-front absolute inset-0 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border-2 border-gray-100">
            <span className="text-3xl mb-3">{showNo ? '🇳🇴' : '🇪🇸'}</span>
            <p className="text-lg font-bold text-center leading-snug">
              {showNo ? card.no : card.es}
            </p>
            <p className="text-xs text-deep/30 mt-3">Trykk for å snu</p>
          </div>
          {/* Back */}
          <div className="flip-card-back absolute inset-0 bg-gradient-to-br from-coral to-sun rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
            <span className="text-3xl mb-3">{showNo ? '🇪🇸' : '🇳🇴'}</span>
            <p className="text-lg font-bold text-center text-white leading-snug">
              {showNo ? card.es : card.no}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      {flipped && (
        <div className="flex gap-3 justify-center mt-6 animate-bounce-in">
          <button
            onClick={() => nextCard(false)}
            className="bg-gray-200 text-deep/70 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
          >
            Øv mer 🔄
          </button>
          <button
            onClick={() => nextCard(true)}
            className="bg-success text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-success/90 transition-colors"
          >
            Kan det! ✅
          </button>
        </div>
      )}

      {/* Score */}
      <div className="text-center mt-6 mb-8">
        <p className="text-sm text-deep/50">
          Score: <span className="font-bold text-success">{correct}</span> av {total}
        </p>
        {correct === total && (
          <div className="mt-3 animate-bounce-in">
            <p className="text-2xl">🎉🎉🎉</p>
            <p className="font-bold text-success">ALLE RIKTIG! Du er klar!</p>
            <button onClick={reset} className="mt-2 text-sm text-coral underline">
              Drill en gang til
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

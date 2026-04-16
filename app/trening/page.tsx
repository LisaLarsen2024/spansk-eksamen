'use client';
import { useState, useEffect, useRef } from 'react';
import { mockExams } from '@/lib/data';

export default function TreningPage() {
  const [exam, setExam] = useState<number | null>(null);
  const [questionIdx, setQuestionIdx] = useState(-1); // -1 = prep phase
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'choose' | 'prep' | 'exam' | 'done'>('choose');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  function startExam(idx: number) {
    setExam(idx);
    setPhase('prep');
    setTimer(0);
    setIsRunning(true);
    setQuestionIdx(-1);
  }

  function startSpeaking() {
    setPhase('exam');
    setTimer(0);
    setQuestionIdx(0);
  }

  function nextQuestion() {
    const questions = mockExams[exam!].spørsmål;
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(q => q + 1);
    } else {
      setIsRunning(false);
      setPhase('done');
    }
  }

  function reset() {
    setExam(null);
    setPhase('choose');
    setTimer(0);
    setIsRunning(false);
    setQuestionIdx(-1);
  }

  // Choose exam
  if (phase === 'choose') {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-black mb-1">🎤 Mock-eksamen</h1>
        <p className="text-sm text-deep/60 mb-6">
          Velg et tema. Du får forberedelsestid, så kommer spørsmålene — som på ekte eksamen.
        </p>
        <div className="grid gap-3 mb-8">
          {mockExams.map((m, i) => (
            <button
              key={i}
              onClick={() => startExam(i)}
              className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md active:scale-[0.98] transition-all border-2 border-transparent hover:border-coral"
            >
              <p className="text-lg font-bold">{m.tema}</p>
              <p className="text-sm text-deep/50 mt-1">{m.spørsmål.length} spørsmål</p>
            </button>
          ))}
        </div>

        <div className="bg-peach rounded-2xl p-4 mb-8">
          <p className="text-sm font-bold mb-1">💡 Slik bruker du treningsmodus:</p>
          <ol className="text-xs text-deep/70 space-y-1 list-decimal list-inside">
            <li>Velg et tema — du får 5 min forberedelse</li>
            <li>Lag stikkord (som på ekte eksamen!)</li>
            <li>Trykk &quot;Start eksamen&quot; og snakk HØYT</li>
            <li>Svar på hvert spørsmål før du trykker neste</li>
          </ol>
        </div>
      </main>
    );
  }

  const currentExam = mockExams[exam!];

  // Prep phase
  if (phase === 'prep') {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="text-center mb-6">
          <p className="text-sm text-deep/50 mb-2">Forberedelsestid</p>
          <p className="text-5xl font-black font-mono text-coral">{formatTime(timer)}</p>
          <p className="text-xs text-deep/40 mt-1">Mål: ca. 5 minutter</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-xs text-deep/50 uppercase font-bold mb-2">Ditt tema:</p>
          <h2 className="text-xl font-black mb-3">{currentExam.tema}</h2>
          <p className="text-sm text-deep/70">{currentExam.intro}</p>
          <div className="mt-4 bg-sky rounded-xl p-3">
            <p className="text-xs font-bold mb-1">Lag stikkord nå:</p>
            <p className="text-xs text-deep/60">
              3 hovedpunkter • 2 eksempler • Sammenligning med Norge • Din mening
            </p>
          </div>
        </div>

        <button
          onClick={startSpeaking}
          className="w-full bg-coral text-white py-4 rounded-2xl font-bold text-lg hover:bg-coral/90 active:scale-[0.98] transition-all animate-pulse-glow"
        >
          Start eksamen 🎤
        </button>

        <button onClick={reset} className="w-full text-center text-sm text-deep/40 mt-3 py-2">
          ← Tilbake
        </button>
      </main>
    );
  }

  // Exam phase
  if (phase === 'exam') {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-deep/50">Eksamen pågår</p>
            <p className="text-sm font-bold">{currentExam.tema}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black font-mono text-coral">{formatTime(timer)}</p>
            <p className="text-xs text-deep/40">maks 30 min</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6 justify-center">
          {currentExam.spørsmål.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < questionIdx ? 'bg-success' : i === questionIdx ? 'bg-coral scale-125' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-coral">
          <p className="text-xs text-deep/40 mb-2">
            Spørsmål {questionIdx + 1} av {currentExam.spørsmål.length}
          </p>
          <p className="text-xl font-bold italic text-deep leading-snug">
            &quot;{currentExam.spørsmål[questionIdx]}&quot;
          </p>
          <div className="mt-4 bg-rose rounded-xl p-3">
            <p className="text-xs text-deep/50">
              Svar HØYT på spansk! Bruk frasene: en mi opinión, por ejemplo, en comparación con Noruega...
            </p>
          </div>
        </div>

        <button
          onClick={nextQuestion}
          className="w-full bg-ocean text-white py-4 rounded-2xl font-bold text-lg hover:bg-ocean/90 active:scale-[0.98] transition-all"
        >
          {questionIdx < currentExam.spørsmål.length - 1 ? 'Neste spørsmål →' : 'Avslutt eksamen ✓'}
        </button>
      </main>
    );
  }

  // Done
  return (
    <main className="max-w-lg mx-auto px-4 pt-6 text-center">
      <div className="animate-bounce-in">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-black mb-2">Eksamen fullført!</h2>
        <p className="text-lg font-mono text-coral mb-2">Tid: {formatTime(timer)}</p>
        <p className="text-sm text-deep/60 mb-6">
          Du svarte på {currentExam.spørsmål.length} spørsmål i {currentExam.tema}.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 text-left">
        <p className="font-bold mb-2">Sjekkliste — hvordan gikk det?</p>
        {[
          'Brukte jeg minst 3 ulike fraser?',
          'Sammenlignet jeg med Norge?',
          'Ga jeg min personlige mening?',
          'Brukte jeg eksempler?',
          'Klarte jeg å snakke uten lange pauser?',
        ].map((q, i) => (
          <label key={i} className="flex items-center gap-3 py-2 text-sm">
            <input type="checkbox" className="w-5 h-5 rounded accent-success" />
            {q}
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => startExam(exam!)}
          className="flex-1 bg-coral text-white py-3 rounded-xl font-bold hover:bg-coral/90"
        >
          Prøv igjen 🔄
        </button>
        <button
          onClick={reset}
          className="flex-1 bg-gray-200 text-deep py-3 rounded-xl font-bold hover:bg-gray-300"
        >
          Nytt tema
        </button>
      </div>
    </main>
  );
}

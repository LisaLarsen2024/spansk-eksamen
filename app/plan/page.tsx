'use client';
import { useState, useEffect } from 'react';
import { dagplan } from '@/lib/data';
import Confetti from '@/components/Confetti';
import ProgressBar from '@/components/ProgressBar';

function getProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('spansk-progress') || '{}'); } catch { return {}; }
}
function saveProgress(p: Record<string, boolean>) {
  localStorage.setItem('spansk-progress', JSON.stringify(p));
}

export default function PlanPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(null);

  useEffect(() => { setProgress(getProgress()); }, []);

  function toggle(key: string) {
    const next = { ...progress, [key]: !progress[key] };
    setProgress(next);
    saveProgress(next);
    if (!progress[key]) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  }

  const totalTasks = dagplan.reduce((sum, d) => sum + d.oppgaver.length, 0);
  const completed = Object.values(progress).filter(Boolean).length;

  return (
    <main className="max-w-lg mx-auto px-4 pt-6">
      <Confetti trigger={showConfetti} />

      <h1 className="text-2xl font-black mb-1">📋 7-dagers plan</h1>
      <p className="text-sm text-deep/60 mb-4">Hak av oppgavene — se progresjonen vokse!</p>

      <ProgressBar current={completed} total={totalTasks} label="Total progresjon" />

      <div className="grid gap-3 mt-6 mb-8">
        {dagplan.map((dag) => {
          const dagTasks = dag.oppgaver.map((_, i) => `dag${dag.dag}-${i}`);
          const dagCompleted = dagTasks.filter(k => progress[k]).length;
          const isOpen = openDay === dag.dag;
          const allDone = dagCompleted === dag.oppgaver.length;

          return (
            <div key={dag.dag} className={`rounded-2xl overflow-hidden transition-all ${allDone ? 'bg-mint border-2 border-success' : 'bg-white border-2 border-transparent'} shadow-sm`}>
              <button
                onClick={() => setOpenDay(isOpen ? null : dag.dag)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span className={`text-2xl ${allDone ? 'grayscale-0' : ''}`}>
                  {allDone ? '✅' : dag.emoji}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-sm">
                    Dag {dag.dag}: {dag.tittel}
                  </p>
                  <p className="text-xs text-deep/40">
                    {dagCompleted}/{dag.oppgaver.length} oppgaver
                  </p>
                </div>
                <span className={`text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-2">
                  {dag.oppgaver.map((oppgave, i) => {
                    const key = `dag${dag.dag}-${i}`;
                    const done = progress[key];
                    return (
                      <label
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                          done ? 'bg-success/10 line-through text-deep/40' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={done || false}
                          onChange={() => toggle(key)}
                          className="w-5 h-5 mt-0.5 rounded accent-success flex-shrink-0"
                        />
                        <span className="text-sm">{oppgave}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

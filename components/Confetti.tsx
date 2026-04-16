'use client';
import { useEffect, useState } from 'react';

const colors = ['#FF6B6B', '#FFB347', '#4ECDC4', '#A78BFA', '#10B981', '#FF69B4'];

export default function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newPieces = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      }));
      setPieces(newPieces);
      setTimeout(() => setPieces([]), 3500);
    }
  }, [trigger]);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

'use client';

export default function ProgressBar({ current, total, label }: { current: number; total: number; label?: string }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-deep/70">{label}</span>
          <span className="text-sm font-bold text-coral">{pct}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? 'linear-gradient(90deg, #10B981, #4ECDC4)'
              : 'linear-gradient(90deg, #FF6B6B, #FFB347)',
          }}
        />
      </div>
    </div>
  );
}

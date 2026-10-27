import React, { useState } from 'react';
import type { SafeDialConfig } from '@/types/hunt';
import { ChevronUp, ChevronDown, KeyRound, Unlock, Lock, AlertCircle } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Button } from '@/components/ui/button';

interface SafeDialProps {
  config: SafeDialConfig;
  onSolve: () => void;
  isSolved: boolean;
}

export const SafeDial: React.FC<SafeDialProps> = ({ config, onSolve, isSolved }) => {
  const [values, setValues] = useState<number[]>(() =>
    config.targetCombination.map(() => 0)
  );
  const [isError, setIsError] = useState(false);

  const stepChange = (dialIndex: number, delta: number) => {
    if (isSolved) return;
    setIsError(false);

    setValues((prev) => {
      const next = [...prev];
      const cur = next[dialIndex];
      const updated = (cur + delta + 10) % 10;
      next[dialIndex] = updated;
      sounds.playDialTurn(updated);
      return next;
    });
  };

  const handleUnlockAttempt = () => {
    if (isSolved) return;

    const isMatch = values.every((v, idx) => v === config.targetCombination[idx]);
    if (isMatch) {
      sounds.playSuccess();
      onSolve();
    } else {
      sounds.playError();
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-2">
      {/* Safe Tumbler Mechanism Case */}
      <div className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 w-full max-w-sm flex flex-col items-center shadow-xl ${
        isSolved
          ? 'bg-slate-950/90 border-emerald-500/40 shadow-emerald-500/10'
          : 'bg-gradient-to-b from-slate-900 to-slate-950 border-white/15'
      }`}>
        {/* Tumbler Header */}
        <div className="flex items-center justify-between w-full mb-3 px-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold tracking-wider uppercase">
            {isSolved ? (
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{isSolved ? 'Tresor Entriegelt' : 'Tresor-Kombination'}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            {config.targetCombination.length} ZIFFERN-RAD
          </span>
        </div>

        {/* Wheels / Dials Row */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 my-2">
          {values.map((val, idx) => {
            const label = config.dialLabels?.[idx];
            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Dial label if given */}
                {label && (
                  <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
                    {label}
                  </span>
                )}

                {/* Up Button */}
                <button
                  type="button"
                  disabled={isSolved}
                  onClick={() => stepChange(idx, 1)}
                  aria-label={`Ziffer ${idx + 1} erhöhen`}
                  className="w-11 h-9 sm:w-13 sm:h-10 rounded-t-xl bg-slate-800/80 border-t border-x border-white/10 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-40"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                {/* Number Drum */}
                <div className={`w-11 h-16 sm:w-14 sm:h-18 flex items-center justify-center border-x text-2xl sm:text-3xl font-black font-mono shadow-inner select-none transition-colors ${
                  isSolved
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : isError
                    ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                    : 'bg-slate-950 border-white/20 text-amber-300'
                }`}>
                  {val}
                </div>

                {/* Down Button */}
                <button
                  type="button"
                  disabled={isSolved}
                  onClick={() => stepChange(idx, -1)}
                  aria-label={`Ziffer ${idx + 1} verringern`}
                  className="w-11 h-9 sm:w-13 sm:h-10 rounded-b-xl bg-slate-800/80 border-b border-x border-white/10 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-40"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!isSolved && (
          <Button
            type="button"
            onClick={handleUnlockAttempt}
            className="w-full mt-4 h-11 sm:h-12 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-sm sm:text-base shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
          >
            <KeyRound className="w-4 h-4" />
            <span>Kombination prüfen</span>
          </Button>
        )}
      </div>

      {isError && (
        <div className="mt-3 p-2.5 px-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Falsche Kombination! Der Riegel klemmt. Prüfe den Hinweis vor Ort.</span>
        </div>
      )}
    </div>
  );
};

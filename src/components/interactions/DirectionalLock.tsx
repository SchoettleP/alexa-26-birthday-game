import React, { useState } from 'react';
import type { Direction, DirectionalConfig } from '@/types/hunt';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Lock, Unlock, AlertCircle } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Button } from '@/components/ui/button';

interface DirectionalLockProps {
  config: DirectionalConfig;
  onSolve: () => void;
  isSolved: boolean;
}

const dirIcons: Record<Direction, React.ReactNode> = {
  UP: <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />,
  DOWN: <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />,
  LEFT: <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />,
  RIGHT: <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
};

export const DirectionalLock: React.FC<DirectionalLockProps> = ({ config, onSolve, isSolved }) => {
  const [currentSequence, setCurrentSequence] = useState<Direction[]>([]);
  const [isError, setIsError] = useState(false);

  const targetLength = config.targetSequence.length;

  const handleDirectionPress = (dir: Direction) => {
    if (isSolved || currentSequence.length >= targetLength) return;

    sounds.playClick(650 + (currentSequence.length * 70));
    setIsError(false);

    const nextSeq = [...currentSequence, dir];
    setCurrentSequence(nextSeq);

    if (nextSeq.length === targetLength) {
      const isMatch = nextSeq.every((d, i) => d === config.targetSequence[i]);
      if (isMatch) {
        sounds.playSuccess();
        onSolve();
      } else {
        sounds.playError();
        setIsError(true);
        setTimeout(() => {
          setCurrentSequence([]);
        }, 1100);
      }
    }
  };

  const handleReset = () => {
    sounds.playClick(400);
    setCurrentSequence([]);
    setIsError(false);
  };

  return (
    <div className="flex flex-col items-center w-full py-2">
      {/* Sequence Slots Header */}
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: targetLength }).map((_, idx) => {
          const filledDir = currentSequence[idx];
          return (
            <div
              key={idx}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                isSolved
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/20'
                  : isError
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-shake'
                  : filledDir
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-slate-950/60 border-white/15 text-slate-600'
              }`}
            >
              {filledDir ? dirIcons[filledDir] : <span className="text-xs text-slate-600 font-mono">{idx + 1}</span>}
            </div>
          );
        })}
      </div>

      {/* D-Pad Controller */}
      <div className="relative p-4 rounded-3xl bg-slate-950/80 border border-white/10 shadow-inner flex flex-col items-center">
        {/* UP Button */}
        <button
          type="button"
          disabled={isSolved || currentSequence.length >= targetLength}
          onClick={() => handleDirectionPress('UP')}
          aria-label="Oben"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-white/15 hover:border-amber-400/60 active:scale-90 active:bg-amber-500/20 flex items-center justify-center text-slate-200 hover:text-amber-300 transition-all shadow-md cursor-pointer disabled:opacity-40"
        >
          <ArrowUp className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* MIDDLE ROW (LEFT - CENTER LOCK ICON - RIGHT) */}
        <div className="flex items-center gap-3 sm:gap-4 my-2">
          <button
            type="button"
            disabled={isSolved || currentSequence.length >= targetLength}
            onClick={() => handleDirectionPress('LEFT')}
            aria-label="Links"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-white/15 hover:border-amber-400/60 active:scale-90 active:bg-amber-500/20 flex items-center justify-center text-slate-200 hover:text-amber-300 transition-all shadow-md cursor-pointer disabled:opacity-40"
          >
            <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Center Hub Indicator */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
            isSolved 
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
              : 'bg-slate-950 border-white/10 text-slate-500'
          }`}>
            {isSolved ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
          </div>

          <button
            type="button"
            disabled={isSolved || currentSequence.length >= targetLength}
            onClick={() => handleDirectionPress('RIGHT')}
            aria-label="Rechts"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-white/15 hover:border-amber-400/60 active:scale-90 active:bg-amber-500/20 flex items-center justify-center text-slate-200 hover:text-amber-300 transition-all shadow-md cursor-pointer disabled:opacity-40"
          >
            <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* DOWN Button */}
        <button
          type="button"
          disabled={isSolved || currentSequence.length >= targetLength}
          onClick={() => handleDirectionPress('DOWN')}
          aria-label="Unten"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-white/15 hover:border-amber-400/60 active:scale-90 active:bg-amber-500/20 flex items-center justify-center text-slate-200 hover:text-amber-300 transition-all shadow-md cursor-pointer disabled:opacity-40"
        >
          <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Feedback & Actions */}
      <div className="flex items-center justify-between w-full max-w-xs mt-3.5 px-2">
        <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
          {isSolved ? 'Schloss aufgesprungen!' : `${currentSequence.length} von ${targetLength} Richtungen`}
        </span>
        {!isSolved && currentSequence.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="h-8 px-2.5 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zurücksetzen</span>
          </Button>
        )}
      </div>

      {isError && (
        <div className="mt-2.5 p-2 px-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Falsche Richtungs-Kombination! Das Schloss blockiert kurz.</span>
        </div>
      )}
    </div>
  );
};

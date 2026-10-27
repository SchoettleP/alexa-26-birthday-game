import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HintSystemProps {
  hints: string[];
  unlockedHintCount: number;
  onUnlockHint: (count: number) => void;
}

export const HintSystem: React.FC<HintSystemProps> = ({
  hints,
  unlockedHintCount,
  onUnlockHint
}) => {
  const [isOpen, setIsOpen] = useState(unlockedHintCount > 0);

  const handleRevealNext = () => {
    const nextCount = Math.min(unlockedHintCount + 1, hints.length);
    sounds.playHint();
    onUnlockHint(nextCount);
    setIsOpen(true);
  };

  return (
    <Card className="rounded-2xl border-white/10 bg-white/[0.02] overflow-hidden transition-all">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 sm:p-4 min-h-[50px] flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition text-slate-300 cursor-pointer"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 flex-wrap">
              <span>Brauchst du Hilfe?</span>
              {unlockedHintCount > 0 && (
                <Badge variant="outline" className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border-amber-500/30">
                  {unlockedHintCount}/{hints.length} aufgedeckt
                </Badge>
              )}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
              Mehrstufige Tipps & Notfall-Lösung
            </div>
          </div>
        </div>

        {isOpen ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-2.5 sm:pt-3 space-y-2 sm:space-y-2.5 border-t border-white/5">
          {hints.map((hintText, idx) => {
            const isRevealed = idx < unlockedHintCount;
            const isEmergency = idx === hints.length - 1;

            if (!isRevealed) return null;

            return (
              <div
                key={idx}
                className={`p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm animate-pop ${
                  isEmergency
                    ? 'bg-rose-950/25 border-rose-500/30 text-rose-200'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {isEmergency ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span>
                    {isEmergency ? 'Notfall-Lösung' : `Tipp ${idx + 1}`}
                  </span>
                </div>
                <p className="leading-relaxed pl-5 font-normal">{hintText}</p>
              </div>
            );
          })}

          {/* Reveal next hint button */}
          {unlockedHintCount < hints.length && (
            <Button
              variant="outline"
              onClick={handleRevealNext}
              className="w-full mt-1.5 h-11 border-dashed border-amber-500/35 hover:border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/15 active:scale-[0.98] text-amber-300 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer rounded-xl"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>
                {unlockedHintCount === 0
                  ? 'Ersten Tipp aufdecken'
                  : unlockedHintCount === hints.length - 1
                    ? 'Notfall-Lösung anzeigen'
                    : `Weiteren Tipp aufdecken (${unlockedHintCount + 1}/${hints.length})`}
              </span>
            </Button>
          )}
        </div>
      )}
    </Card>

  );
};

import React, { useState } from 'react';
import type { QuizQuestion } from '@/types/hunt';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface QuizSectionProps {
  quiz: QuizQuestion;
  isSolved: boolean;
  onSolve: () => void;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

export const QuizSection: React.FC<QuizSectionProps> = ({ quiz, isSolved, onSolve }) => {
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const handleSelectOption = (index: number) => {
    if (isSolved) return;

    if (index === quiz.correctIndex) {
      setErrorIndex(null);
      sounds.playSuccess();
      onSolve();
    } else {
      setErrorIndex(index);
      sounds.playError();
    }
  };

  return (
    <Card className={`transition-all duration-300 rounded-2xl border shadow-lg ${
      isSolved 
        ? 'bg-emerald-950/20 border-emerald-500/35 shadow-emerald-500/5' 
        : 'bg-slate-900/60 border-white/10'
    }`}>
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isSolved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isSolved ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">
              {isSolved ? 'Rätsel gelöst' : '1. Das Raum-Rätsel'}
            </span>
          </div>

          {isSolved && (
            <Badge variant="outline" className="bg-emerald-500/15 border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-semibold px-2 py-0.5">
              Gelöst ✓
            </Badge>
          )}
        </div>

        {/* Question */}
        <h3 className="text-sm sm:text-base font-serif-title font-semibold text-white mb-3 sm:mb-4 leading-snug">
          {quiz.question}
        </h3>

        {/* Options: Mobile-first stacked column, responsive grid on desktop */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-2.5 mb-1.5">
          {quiz.options.map((opt, idx) => {
            const isCorrect = idx === quiz.correctIndex;
            const isWrong = errorIndex === idx;

            let btnVariant: "default" | "outline" | "secondary" = "outline";
            let customClasses = "bg-white/[0.03] border-white/10 text-slate-200 hover:bg-white/[0.07] hover:text-white justify-between h-auto min-h-[48px] py-2.5 sm:py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-left cursor-pointer rounded-xl active:scale-[0.99] transition-all";

            if (isSolved && isCorrect) {
              btnVariant = "secondary";
              customClasses = "bg-emerald-500/20 border-emerald-500/60 text-emerald-200 justify-between h-auto min-h-[48px] py-2.5 sm:py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-left rounded-xl shadow-sm";
            } else if (isWrong) {
              customClasses = "bg-rose-500/20 border-rose-500/60 text-rose-200 justify-between h-auto min-h-[48px] py-2.5 sm:py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-left animate-shake rounded-xl";
            }

            return (
              <Button
                key={idx}
                variant={btnVariant}
                onClick={() => handleSelectOption(idx)}
                disabled={isSolved}
                className={customClasses}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                  <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ${
                    isSolved && isCorrect
                      ? 'bg-emerald-500/40 text-emerald-100'
                      : isWrong
                        ? 'bg-rose-500/40 text-rose-100'
                        : 'bg-white/10 text-slate-400'
                  }`}>
                    {OPTION_KEYS[idx] || (idx + 1)}
                  </span>
                  <span className="text-left leading-snug whitespace-normal break-words">{opt}</span>
                </div>

                {isSolved && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />}
                {isWrong && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 ml-1" />}
              </Button>
            );
          })}
        </div>

        {/* Explanation */}
        {isSolved && (
          <div className="mt-3 p-3 sm:p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs sm:text-sm text-emerald-200 leading-relaxed animate-pop">
            <strong className="font-semibold text-emerald-300">Des Rätsels Lösung:</strong> {quiz.explanation}
          </div>
        )}

        {/* Error message */}
        {errorIndex !== null && !isSolved && (
          <div className="mt-3 text-xs text-rose-300 flex items-center gap-1.5 animate-shake">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Nicht ganz richtig! Überlege noch einmal oder wähle eine andere Option.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

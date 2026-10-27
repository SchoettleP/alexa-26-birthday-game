import React, { useState } from 'react';
import type { AudioClueConfig } from '@/types/hunt';
import { Volume2, Play, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Button } from '@/components/ui/button';

interface AudioClueProps {
  config: AudioClueConfig;
  onSolve: () => void;
  isSolved: boolean;
}

export const AudioClue: React.FC<AudioClueProps> = ({ config, onSolve, isSolved }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePlaySound = () => {
    setIsPlaying(true);
    sounds.playAudioClue(config.soundType);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const handleSelectOption = (idx: number) => {
    if (isSolved) return;
    setSelectedIndex(idx);
    const option = config.options[idx];

    if (option.isCorrect) {
      setErrorMessage(null);
      sounds.playSuccess();
      onSolve();
    } else {
      sounds.playError();
      setErrorMessage(option.feedback || 'Nicht ganz richtig! Höre noch einmal genau hin.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-1">
      {/* Audio Player Card */}
      <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/25 shadow-lg flex flex-col items-center mb-3.5 text-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-300">
            {config.soundTitle}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-3 max-w-xs leading-relaxed">
          {config.soundDescription}
        </p>

        {/* Animated Equalizer Waves */}
        <div className="flex items-end justify-center gap-1.5 h-8 my-1 mb-3">
          {[40, 75, 55, 95, 60, 85, 45].map((h, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-amber-400 animate-pulse'
                  : isSolved
                  ? 'bg-emerald-400'
                  : 'bg-indigo-400/40'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, Math.round(h * Math.random()))}%` : '25%'
              }}
            />
          ))}
        </div>

        {/* Play CTA Button */}
        <Button
          type="button"
          onClick={handlePlaySound}
          className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer border-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isPlaying ? 'Ton läuft...' : 'Geräusch jetzt abspielen'}</span>
        </Button>
      </div>

      {/* Acoustic Question & Options */}
      <div className="w-full">
        <div className="text-xs sm:text-sm font-semibold text-slate-200 mb-2.5 px-0.5">
          {config.question}
        </div>

        <div className="flex flex-col gap-2 w-full">
          {config.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = opt.isCorrect;

            let buttonStyle = 'bg-slate-900/70 border-white/10 text-slate-200 hover:border-amber-400/50';
            if (isSolved && isCorrect) {
              buttonStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold';
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-200';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isSolved}
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-[44px] p-3 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                <span>{opt.label}</span>
                {isSolved && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Feedback */}
      {errorMessage && (
        <div className="mt-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2 animate-shake w-full">
          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isSolved && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2 w-full animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Akustisches Rätsel gelöst! Das Geräusch hat das Versteck verraten.</span>
        </div>
      )}
    </div>
  );
};

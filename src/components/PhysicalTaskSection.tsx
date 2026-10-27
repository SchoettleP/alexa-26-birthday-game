import React, { useState } from 'react';
import type { PhysicalTask } from '@/types/hunt';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Compass,
  Lock,
  Volume2,
  Camera,
  QrCode
} from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DirectionalLock } from './interactions/DirectionalLock';
import { SafeDial } from './interactions/SafeDial';
import { ScratchCard } from './interactions/ScratchCard';
import { AudioClue } from './interactions/AudioClue';
import { PhotoChallenge } from './interactions/PhotoChallenge';
import { QrScanner } from './interactions/QrScanner';

interface PhysicalTaskSectionProps {
  task: PhysicalTask;
  stationRoom: string;
  unlockedStory: string;
  isUnlocked: boolean; // if quiz is completed
  isSolved: boolean;
  isLastStation: boolean;
  savedPhoto?: string;
  onSavePhoto?: (dataUrl: string) => void;
  onSolve: () => void;
  onNextStation: () => void;
}

export const PhysicalTaskSection: React.FC<PhysicalTaskSectionProps> = ({
  task,
  stationRoom,
  unlockedStory,
  isUnlocked,
  isSolved,
  isLastStation,
  savedPhoto,
  onSavePhoto,
  onSolve,
  onNextStation
}) => {
  const [inputValue, setInputValue] = useState('');
  const [decoyMessage, setDecoyMessage] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);

  const taskType = task.taskType || 'code';

  const normalize = (val: string) => val.trim().toLowerCase().replace(/[\s\-_]/g, '');

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSolved) return;

    const normalizedInput = normalize(inputValue);
    const correctNormalized = normalize(task.correctCode || '');
    const alternates = (task.alternateCodes || []).map(normalize);

    // Check correct
    if (normalizedInput === correctNormalized || alternates.includes(normalizedInput)) {
      setDecoyMessage(null);
      setIsWrong(false);
      sounds.playSuccess();
      onSolve();
      return;
    }

    // Check decoy matches
    let matchedDecoy: string | null = null;
    if (task.decoys) {
      for (const [decoyKey, msg] of Object.entries(task.decoys)) {
        if (normalize(decoyKey) === normalizedInput) {
          matchedDecoy = msg;
          break;
        }
      }
    }

    if (matchedDecoy) {
      setDecoyMessage(matchedDecoy);
      setIsWrong(false);
      sounds.playError();
    } else {
      setDecoyMessage(null);
      setIsWrong(true);
      sounds.playError();
    }
  };

  // Header Icon and Label
  const getHeaderInfo = () => {
    switch (taskType) {
      case 'directional':
        return {
          icon: <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'Richtungs-Code gelöst' : '2. Richtungs-Schloss'
        };
      case 'safe':
        return {
          icon: <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'Tresor geöffnet' : '2. Tresor-Kombination'
        };
      case 'scratch':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'Versteck freigerubbelt' : '2. Rubbel-Station'
        };
      case 'audio':
        return {
          icon: <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'Klang erkannt' : '2. Akustisches Rätsel'
        };
      case 'photo':
        return {
          icon: <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'Erinnerung festgehalten' : '2. Foto-Challenge'
        };
      case 'qr':
        return {
          icon: <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'QR-Code verifiziert' : '2. QR-Code Scanner'
        };
      default:
        return {
          icon: <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
          label: isSolved ? 'Versteck gefunden' : '2. Das Versteck vor Ort'
        };
    }
  };

  const { icon, label } = getHeaderInfo();

  return (
    <Card className={`transition-all duration-300 rounded-2xl border shadow-lg ${
      !isUnlocked 
        ? 'opacity-40 grayscale pointer-events-none bg-white/[0.02] border-white/5' 
        : isSolved 
          ? 'bg-slate-900/80 border-amber-500/35 shadow-amber-500/5' 
          : 'bg-slate-900/60 border-white/10'
    }`}>
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 ${
              isSolved ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {icon}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">
              {label}
            </span>
          </div>

          {isSolved && (
            <Badge variant="outline" className="bg-amber-500/15 border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-semibold px-2 py-0.5">
              Erledigt ✓
            </Badge>
          )}
        </div>

        {/* Task instruction */}
        <p className="text-xs sm:text-sm text-slate-200 mb-3 sm:mb-4 leading-relaxed font-normal">
          {task.instruction}
        </p>

        {/* Dynamic Task Content according to taskType */}
        <div className="mb-2">
          {taskType === 'directional' && task.directional && (
            <DirectionalLock
              key={`directional_${stationRoom}`}
              config={task.directional}
              onSolve={onSolve}
              isSolved={isSolved}
            />
          )}

          {taskType === 'safe' && task.safeDial && (
            <SafeDial
              key={`safe_${stationRoom}`}
              config={task.safeDial}
              onSolve={onSolve}
              isSolved={isSolved}
            />
          )}

          {taskType === 'scratch' && task.scratchCard && (
            <ScratchCard
              key={`scratch_${stationRoom}`}
              config={task.scratchCard}
              onSolve={onSolve}
              isSolved={isSolved}
            />
          )}

          {taskType === 'audio' && task.audioClue && (
            <AudioClue
              key={`audio_${stationRoom}`}
              config={task.audioClue}
              onSolve={onSolve}
              isSolved={isSolved}
            />
          )}

          {taskType === 'photo' && task.photoChallenge && (
            <PhotoChallenge
              key={`photo_${stationRoom}`}
              config={task.photoChallenge}
              stationRoom={stationRoom}
              savedPhoto={savedPhoto}
              onSavePhoto={onSavePhoto || (() => {})}
              onSolve={onSolve}
              isSolved={isSolved}
            />
          )}

          {taskType === 'qr' && task.qrScan && (
            <QrScanner
              key={`qr_${stationRoom}`}
              config={task.qrScan}
              onSolve={onSolve}
              isSolved={isSolved}
            />
          )}

          {taskType === 'code' && !isSolved && (
            <form onSubmit={handleCodeSubmit} className="space-y-2.5 sm:space-y-3">
              <div className="relative">
                <Input
                  type={task.inputType === 'number' ? 'tel' : 'text'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsWrong(false);
                    setDecoyMessage(null);
                  }}
                  placeholder={task.inputPlaceholder || 'Code eingeben...'}
                  autoComplete="off"
                  className="w-full h-12 px-3.5 sm:px-4 rounded-xl bg-slate-950/70 border-white/15 focus-visible:border-amber-400 focus-visible:ring-amber-500/20 text-white placeholder-slate-500 text-base font-medium"
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={() => setInputValue('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs p-1.5 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <Button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-sm sm:text-base shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                <span>Code prüfen</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          {/* Optional Code Check for interactive tasks to catch decoy traps */}
          {taskType !== 'code' && !isSolved && task.decoys && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <details className="group">
                <summary className="text-[11px] sm:text-xs text-amber-400/80 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1.5 select-none py-1">
                  <span>🔍 Code oder Fallen-Zettel prüfen?</span>
                </summary>
                <form onSubmit={handleCodeSubmit} className="mt-2 space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsWrong(false);
                        setDecoyMessage(null);
                      }}
                      placeholder="Gefundenen Code prüfen..."
                      autoComplete="off"
                      className="w-full h-10 px-3 rounded-xl bg-slate-950/70 border-white/15 text-white placeholder-slate-500 text-sm font-medium"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-full h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold cursor-pointer border border-amber-500/30"
                  >
                    Code überprüfen
                  </Button>
                </form>
              </details>
            </div>
          )}
        </div>

        {/* Decoy Specific Feedback Alert (for code inputs) */}
        {decoyMessage && (
          <div className="mt-3 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-2 animate-shake">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-semibold mb-0.5">Falle erwischt!</strong>
              <span>{decoyMessage}</span>
            </div>
          </div>
        )}

        {/* Generic Wrong Error Alert (for code inputs) */}
        {isWrong && (
          <div className="mt-3 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-center gap-2 animate-shake">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Falscher Code! Schau noch einmal genauer hin oder öffne unten einen Hinweis.</span>
          </div>
        )}

        {/* Solved callout & Advance Button */}
        {isSolved && (
          <div className="mt-4 space-y-3 sm:space-y-4 animate-pop">
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 sm:gap-3">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-emerald-200">Erfolgreich gemeistert!</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                  {unlockedStory}
                </div>
              </div>
            </div>

            {/* Optional Photo Challenge for Polaroid Gallery */}
            {task.photoChallenge && (
              <div className="pt-1">
                <PhotoChallenge
                  config={task.photoChallenge}
                  stationRoom={stationRoom}
                  savedPhoto={savedPhoto}
                  onSavePhoto={onSavePhoto || (() => {})}
                  onSolve={() => {}}
                  isSolved={!!savedPhoto}
                />
              </div>
            )}

            <Button
              onClick={onNextStation}
              className="w-full h-12 sm:h-13 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLastStation ? 'Zum Großen Finale' : 'Nächsten Raum freischalten'}</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

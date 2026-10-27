import React, { useState } from 'react';
import { Volume2, VolumeX, Map, RotateCcw, Sparkles, Backpack } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  currentRoom: string;
  isRoomRevealed?: boolean;
  inventoryCount?: number;
  onOpenInventory?: () => void;
  onOpenMap: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  currentRoom,
  isRoomRevealed = false,
  inventoryCount = 0,
  onOpenInventory,
  onOpenMap,
  onReset
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(sounds.isEnabled());
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const toggleAudio = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
    if (next) sounds.playHint();
  };

  const progressPercent = Math.round(((currentStep - 1) / totalSteps) * 100);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-slate-950/90 border-b border-white/10 safe-top">
      <div className="max-w-xl w-full mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3 flex flex-col gap-2">
        {/* Top bar with branding & actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-amber-400/90 uppercase tracking-wider leading-none mb-0.5 truncate">
                26. Geburtstag
              </div>
              <h1 className="text-xs sm:text-sm font-bold font-serif-title text-white tracking-tight leading-tight truncate">
                Alexas Schnitzeljagd
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={toggleAudio}
              className="w-8 h-8 rounded-lg bg-white/5 border-white/10 text-slate-300 hover:text-white active:scale-95 cursor-pointer"
              title={soundOn ? 'Ton ausschalten' : 'Ton einschalten'}
            >
              {soundOn ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenInventory}
              className="h-8 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-200 text-xs font-semibold cursor-pointer active:scale-95 flex items-center gap-1.5 relative"
              title="Rucksack öffnen"
            >
              <Backpack className="w-3.5 h-3.5 text-amber-400" />
              <span>Rucksack</span>
              {inventoryCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {inventoryCount}
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMap}
              className="h-8 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 text-xs font-semibold cursor-pointer active:scale-95 flex items-center gap-1"
            >
              <Map className="w-3 h-3 text-amber-400" />
              <span>Karte</span>
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setShowConfirmReset(true)}
              className="w-8 h-8 rounded-lg bg-white/5 border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 active:scale-95 cursor-pointer"
              title="Neu starten"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Progress & Current Room info */}
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1.5">
            <span className="text-slate-400 font-medium">
              Station <strong className="text-white font-bold">{currentStep}</strong> von {totalSteps}
            </span>
            <Badge
              variant="outline"
              className={`px-2 py-0.5 text-[11px] font-medium truncate max-w-[150px] sm:max-w-none transition-all ${
                isRoomRevealed
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-purple-500/15 border-purple-500/30 text-purple-200'
              }`}
            >
              {isRoomRevealed ? `📍 ${currentRoom} ✓` : '🔍 Ort suchen...'}
            </Badge>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 sm:h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full transition-all duration-500 ease-out shadow-sm shadow-amber-500/40"
              style={{ width: `${Math.max(progressPercent, 5)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      <Dialog open={showConfirmReset} onOpenChange={setShowConfirmReset}>
        <DialogContent className="bg-slate-950/95 border border-white/15 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">
              Abenteuer neu starten?
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-sm mt-1">
              Möchtest du deinen aktuellen Fortschritt zurücksetzen und wieder bei Station 1 (Schlafzimmer) beginnen?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowConfirmReset(false)}
              className="border-white/15 text-slate-300 hover:bg-white/10 cursor-pointer"
            >
              Abbrechen
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowConfirmReset(false);
                onReset();
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            >
              Ja, Neustart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Heart, KeyRound, Unlock } from 'lucide-react';
import { sounds } from '@/utils/audio';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Camera } from 'lucide-react';

interface CelebrationModalProps {
  onRestart: () => void;
  photos?: Record<string, string>;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ onRestart, photos = {} }) => {
  const photoEntries = Object.entries(photos);

  useEffect(() => {
    // Play fanfare
    sounds.playFanfare();

    // Trigger initial confetti explosion
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#38bdf8']
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={true}>
      <DialogContent className="w-[calc(100%-1.25rem)] sm:max-w-lg bg-slate-950 border-purple-500/40 text-white p-4 sm:p-8 text-center rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-500/25 max-h-[92dvh] overflow-y-auto">
        <div className="flex flex-col items-center">
          {/* Trophy Halo */}
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/35 mb-3 sm:mb-4 active-pulse">
            <Trophy className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>

          <Badge
            variant="outline"
            className="mb-2.5 px-2.5 py-0.5 bg-pink-500/15 border-pink-500/30 text-pink-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            <span>Mission Erfolgreich</span>
          </Badge>

          <h2 className="text-xl sm:text-3xl font-black text-white mb-2 sm:mb-3 tracking-tight">
            ALLES GUTE ZUM <span className="text-gradient">26. GEBURTSTAG!</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-5 leading-relaxed">
            Du hast alle <strong>17 Stationen</strong> gemeistert: Vom Schlafzimmer über den Dachboden, durch alle Flure, in die tiefsten Kellergewölbe, durch Garage und Garten, und zurück ins Wohnzimmer!
          </p>

          {/* Padlock Unlocked Banner */}
          <div className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-950/50 via-purple-950/50 to-pink-950/40 border border-amber-500/40 mb-4 sm:mb-5 text-left flex items-start gap-3 shadow-lg shadow-amber-500/10">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5" />
                <span>Schlüssel bereit &amp; Schatzkammer enttarnt</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                Öffne jetzt das Vorhängeschloss zu deiner Schatzkammer!
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                Gehe hinab in den Keller, stecke deinen gefundenen Schlüssel ins Vorhängeschloss der Kellertür und betrete deine persönliche Schatzkammer!
              </div>
            </div>
          </div>

          {/* Captured Photos Gallery */}
          {photoEntries.length > 0 && (
            <div className="w-full mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-300 mb-2.5">
                <Camera className="w-3.5 h-3.5" />
                <span>Deine Geburtstags-Erinnerungen</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 w-full">
                {photoEntries.map(([id, dataUrl], idx) => (
                  <div
                    key={id}
                    className="p-2 pb-3 bg-white text-slate-900 rounded-xl shadow-lg transform rotate-[-1deg] even:rotate-[1deg] hover:rotate-0 transition-transform flex flex-col items-center"
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-950">
                      <img src={dataUrl} alt={`Erinnerung ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-serif-title font-bold text-slate-800 mt-1.5">
                      Station {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-pink-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            <span>Schön, dass es dich gibt!</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full">
            <Button
              onClick={() => {
                confetti({
                  particleCount: 80,
                  spread: 60,
                  origin: { y: 0.6 }
                });
              }}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 cursor-pointer border-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mehr Konfetti!</span>
            </Button>

            <Button
              variant="outline"
              onClick={onRestart}
              className="h-11 sm:h-12 rounded-xl border-white/15 text-slate-300 hover:bg-white/10 active:scale-[0.98] text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              Nochmal von vorn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

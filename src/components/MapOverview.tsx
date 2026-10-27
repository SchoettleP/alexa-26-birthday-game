import React from 'react';
import type { Station } from '@/types/hunt';
import { CheckCircle2, Lock, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MapOverviewProps {
  stations: Station[];
  currentIndex: number;
  onClose: () => void;
}

export const MapOverview: React.FC<MapOverviewProps> = ({
  stations,
  currentIndex,
  onClose
}) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-1.25rem)] sm:max-w-xl bg-slate-950 border-white/15 text-white max-h-[88dvh] flex flex-col p-0 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-3.5 sm:p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-white">
                Haus- & Garten-Roadmap
              </DialogTitle>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                17 Stationen durch alle Stockwerke und Außenbereiche
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable station list */}
        <div className="p-2.5 sm:p-4 overflow-y-auto space-y-2 flex-1 overscroll-contain">
          {stations.map((st, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isLocked = idx > currentIndex;

            let cardStyle = 'bg-white/[0.02] border-white/5 opacity-60';
            if (isCompleted) {
              cardStyle = 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200';
            } else if (isCurrent) {
              cardStyle = 'bg-amber-950/25 border-amber-500/50 shadow-md shadow-amber-500/10 active-pulse';
            }

            return (
              <div
                key={st.id}
                className={`p-2.5 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${cardStyle}`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {/* Status badge */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                        : 'bg-white/5 text-slate-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : isCurrent ? (
                      st.step
                    ) : (
                      <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    )}
                  </div>

                  {/* Room details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {isCompleted ? st.room : isCurrent ? `Station ${st.step}: Geheimer Ort` : `Station ${st.step}: ???`}
                      </span>
                      {isCurrent && (
                        <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0 bg-amber-500/20 text-amber-300 border-amber-500/40">
                          Aktive Suche
                        </Badge>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <span className="truncate">{isCompleted ? st.title : 'Rätsel lösen zum Entdecken'}</span>
                      <span>·</span>
                      <span className="text-slate-500 shrink-0">{st.zone}</span>
                    </div>
                  </div>
                </div>

                {/* Right label */}
                <div className="shrink-0 text-right">
                  {isCompleted && (
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-400">
                      Fertig ✓
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] sm:text-xs font-bold text-amber-400">
                      Aktiv
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-[11px] sm:text-xs text-slate-500">
                      Gesperrt
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/30 shrink-0 text-center safe-bottom">
          <Button
            onClick={onClose}
            className="w-full h-12 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-sm sm:text-base cursor-pointer rounded-xl border-0 shadow-lg shadow-amber-500/20"
          >
            Zurück zum Rätsel
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

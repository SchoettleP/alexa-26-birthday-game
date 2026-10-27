import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Backpack, KeyRound, Snowflake, Flame, FileText, ExternalLink } from 'lucide-react';
import type { InventoryItem } from '@/types/hunt';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectedItems: InventoryItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  KeyRound: <KeyRound className="w-5 h-5 text-amber-400" />,
  Snowflake: <Snowflake className="w-5 h-5 text-cyan-400" />,
  Flame: <Flame className="w-5 h-5 text-orange-400" />,
};

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  collectedItems,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-950/95 border border-white/15 text-white max-w-md w-full p-5 rounded-2xl backdrop-blur-xl">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Backpack className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold font-serif-title text-white">
                Alexas Rucksack
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Gefundene Artefakte & Rätsel-Werkzeuge
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-3 flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {collectedItems.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-white/10 bg-white/5 text-center text-slate-400 text-sm">
              <p>🎒 Dein Rucksack ist noch leer.</p>
              <p className="text-xs text-slate-500 mt-1">
                Finde dein erstes Artefakt bei Station 1 (Schlafzimmer)!
              </p>
            </div>
          ) : (
            collectedItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-white/10 bg-gradient-to-r from-slate-900/90 to-slate-800/80 flex items-start gap-3 shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                  {iconMap[item.icon] || <KeyRound className="w-5 h-5 text-amber-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    {item.badge && (
                      <Badge variant="outline" className="text-[10px] bg-amber-500/15 border-amber-500/30 text-amber-300 font-mono shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Gefunden bei Station {item.stationAcquired}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Spielleiter / Print Quicklink */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <a
            href="/druckvorlagen.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Spielleiter-Druckvorlagen öffnen</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button
            size="sm"
            onClick={onClose}
            className="h-8 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
          >
            Schließen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

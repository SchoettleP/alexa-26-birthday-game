import React from "react";
import { Compass, KeyRound, Trophy, ArrowRight, Sparkles } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-between items-center px-4 sm:px-6 py-4 sm:py-8 max-w-lg mx-auto text-center animate-pop safe-top safe-bottom">
      {/* Top / Hero Section */}
      <div className="w-full flex flex-col items-center pt-2 sm:pt-4">
        {/* Birthday Emblem */}
        <div className="mb-3 sm:mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 glow-ambient mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-amber-300">
              <span className="text-2xl sm:text-3xl font-black font-serif-title tracking-tight text-amber-200">
                26
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-200 text-xs sm:text-sm font-medium tracking-wide mb-2.5 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Für Alexa · Zum 26. Geburtstag</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-white tracking-tight mb-2 sm:mb-3 leading-tight">
          Die Jagd nach dem <br />
          <span className="champagne-gradient-text italic font-normal">
            Verlorenen Schlüssel
          </span>
        </h1>

        {/* Narrative Lead */}
        <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-5 leading-relaxed max-w-sm mx-auto font-normal">
          Deine geheime Geburtstags-Schatzkammer ist mit einem echten Vorhängeschloss
          versiegelt! Folge der 17-teiligen Fährte quer durch das Anwesen,
          finde den echten Schlüssel und enttarne das geheime Versteck der Schatzkammer.
        </p>

        {/* Missions Briefing Card */}
        <div className="w-full bg-slate-900/70 border border-white/[0.08] rounded-2xl mb-4 sm:mb-6 text-left backdrop-blur-md overflow-hidden shadow-xl shadow-black/40">
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Missions-Briefing
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-300 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25">
              17 Stationen
            </span>
          </div>

          <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  Das gesamte Anwesen
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Vom Schlafzimmer über Dachboden, Keller und Werkstatt bis in
                  den Garten.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/15 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  Wegweiser & Fallen
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Entschlüssele den nächsten Ort. Achtung vor den ausgelegten
                  Fallen-Codes an falschen Orten!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/15 border border-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  Schlüssel & Schatzkammer
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Finde im vorletzten Rätsel den echten Schlüssel und enttarne
                  im großen Finale, hinter welcher Tür sich deine Schatzkammer verbirgt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button at Bottom */}
      <div className="w-full pt-2 pb-1">
        <button
          type="button"
          onClick={onStart}
          className="w-full h-12 sm:h-13 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 active:scale-[0.98] text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
        >
          <span>Die Schlüssel-Jagd starten</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

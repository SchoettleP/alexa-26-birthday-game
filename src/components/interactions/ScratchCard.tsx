import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { ScratchCardConfig } from '@/types/hunt';
import { Sparkles, CheckCircle2, Wand2 } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Button } from '@/components/ui/button';

interface ScratchCardProps {
  config: ScratchCardConfig;
  onSolve: () => void;
  isSolved: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ config, onSolve, isSolved }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);
  const lastSoundTime = useRef(0);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(isSolved);

  // Initialize Canvas scratch coating
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = 180;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Silver/Champagne metallic gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#64748b');
    grad.addColorStop(0.3, '#94a3b8');
    grad.addColorStop(0.5, '#cbd5e1');
    grad.addColorStop(0.7, '#94a3b8');
    grad.addColorStop(1, '#475569');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add playful text pattern & border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ HIER MIT DEM FINGER FREIRUBBELN ✨', width / 2, height / 2 - 10);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(config.coverSubtitle || 'Rubbel das Geheimnis frei', width / 2, height / 2 + 16);
  }, [config.coverSubtitle]);

  useEffect(() => {
    if (!isSolved) {
      setIsFullyRevealed(false);
      setScratchPercent(0);
      // Small timeout to allow container to layout
      const timer = setTimeout(() => {
        initCanvas();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsFullyRevealed(true);
      setScratchPercent(100);
    }
  }, [initCanvas, isSolved, config]);

  // Check how much percent has been scratched off
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;

      // Sample every 8th pixel for speed
      const step = 8;
      let sampled = 0;
      for (let i = 3; i < data.length; i += 4 * step) {
        sampled++;
        if (data[i] < 128) {
          transparentPixels++;
        }
      }

      if (sampled > 10) {
        const percent = Math.min(100, Math.round((transparentPixels / sampled) * 100));
        setScratchPercent(percent);

        if (percent >= 45 && !isFullyRevealed) {
          setIsFullyRevealed(true);
          sounds.playSuccess();
          onSolve();
        }
      }
    } catch {
      // Ignore security errors if canvas tainted
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Sound throttle
    const now = Date.now();
    if (now - lastSoundTime.current > 120) {
      sounds.playScratch();
      lastSoundTime.current = now;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isFullyRevealed) return;
    isDrawing.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current || isFullyRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    checkScratchPercentage();
  };

  const handleRevealAll = () => {
    setIsFullyRevealed(true);
    setScratchPercent(100);
    sounds.playSuccess();
    onSolve();
  };

  return (
    <div className="flex flex-col items-center w-full py-1">
      {/* Scratch Box Wrapper */}
      <div
        ref={containerRef}
        className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-amber-950/40 via-purple-950/40 to-slate-900 shadow-xl flex items-center justify-center p-4 text-center select-none"
      >
        {/* Hidden Content Revealed Underneath */}
        <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in px-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mb-1.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1">
            {config.coverTitle || 'Geheimes Versteck Entdeckt!'}
          </div>
          <div className="text-xs sm:text-sm font-medium text-slate-200 mb-2 leading-relaxed">
            {config.revealedClue}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-sm sm:text-base font-bold tracking-widest">
            {config.revealedCode}
          </div>
        </div>

        {/* Scratch Canvas on Top */}
        {!isFullyRevealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-500"
          />
        )}
      </div>

      {/* Progress & Quick Action */}
      <div className="flex items-center justify-between w-full mt-2.5 px-1">
        <span className="text-[11px] sm:text-xs text-slate-400 font-medium flex items-center gap-1.5">
          {isFullyRevealed ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Freigerubbelt!
            </span>
          ) : (
            <span>{scratchPercent}% freigerubbelt</span>
          )}
        </span>

        {!isFullyRevealed && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleRevealAll}
            className="h-7 px-2 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Wand2 className="w-3 h-3" />
            <span>Rest freirubbeln</span>
          </Button>
        )}
      </div>
    </div>
  );
};

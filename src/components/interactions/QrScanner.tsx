import React, { useRef, useState, useEffect } from "react";
import type { QrScanConfig } from "@/types/hunt";
import { QrCode, Camera, XCircle, Sparkles } from "lucide-react";
import { sounds } from "@/utils/audio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QrScannerProps {
  config: QrScanConfig;
  onSolve: () => void;
  isSolved: boolean;
}

export const QrScanner: React.FC<QrScannerProps> = ({
  config,
  onSolve,
  isSolved,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  // Stop camera on unmount or when solved
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    if (isSolved) return;
    setCameraError(null);
    try {
      if (typeof window !== "undefined" && !window.isSecureContext) {
        setCameraError(
          "Mobile Browser verlangen HTTPS für die Kamera (über WLAN-IP gesperrt). Tippe einfach den Not-Code 95 vom Schild unten ein!",
        );
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(
          "Kamera wird von diesem Browser nicht unterstützt. Bitte nutze den manuellen Not-Code 95 unten.",
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setStreamActive(true);

        // Check if BarcodeDetector is available
        if ("BarcodeDetector" in window) {
          const barcodeDetector = new (window as any).BarcodeDetector({
            formats: ["qr_code"],
          });
          const scanInterval = setInterval(async () => {
            if (!videoRef.current || videoRef.current.readyState < 2) return;
            try {
              const barcodes = await barcodeDetector.detect(videoRef.current);
              if (barcodes.length > 0) {
                const detectedValue = barcodes[0].rawValue.trim().toLowerCase();
                const expected = config.expectedPayload.trim().toLowerCase();
                if (detectedValue.includes(expected)) {
                  clearInterval(scanInterval);
                  stream.getTracks().forEach((t) => t.stop());
                  setStreamActive(false);
                  sounds.playSuccess();
                  onSolve();
                }
              }
            } catch {
              // Ignore single frame detection errors
            }
          }, 300);
        }
      }
    } catch {
      setCameraError(
        "Kamerazugriff wurde abgelehnt oder ist nicht verfügbar. Bitte gib den Code manuell ein.",
      );
      setStreamActive(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim() || isSolved) return;

    const normInput = manualCode.trim().toLowerCase();
    const normExpected = config.expectedPayload.trim().toLowerCase();
    const normFallback = config.manualFallbackCode.trim().toLowerCase();

    if (normInput === normExpected || normInput === normFallback) {
      setIsWrong(false);
      sounds.playSuccess();
      onSolve();
    } else {
      sounds.playError();
      setIsWrong(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-1">
      {/* QR Scanner Viewport / Card */}
      <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col items-center text-center mb-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-2.5">
          <QrCode className="w-5 h-5" />
        </div>

        <p className="text-xs sm:text-sm text-slate-200 mb-3 max-w-xs leading-relaxed">
          {config.instructionText}
        </p>

        {/* Video Scanner Element */}
        {streamActive ? (
          <div className="relative w-full aspect-square max-w-[240px] rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-2xl mb-3">
            <video ref={videoRef} className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-2 border-cyan-300/40 m-6 rounded-xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-2 left-0 right-0 text-[10px] text-cyan-200 bg-slate-950/80 py-1">
              QR-Code im Rahmen zentrieren
            </div>
          </div>
        ) : (
          !isSolved && (
            <Button
              type="button"
              onClick={startCamera}
              className="h-11 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/30 flex items-center gap-2 cursor-pointer border-0 mb-2"
            >
              <Camera className="w-4 h-4" />
              <span>QR-Kamera Scanner starten</span>
            </Button>
          )
        )}

        {cameraError && (
          <div className="text-[11px] text-amber-300 bg-amber-500/15 p-2 rounded-lg border border-amber-500/30 max-w-xs mb-2">
            {cameraError}
          </div>
        )}
      </div>

      {/* Manual Code Input Option */}
      {!isSolved && (
        <form onSubmit={handleManualSubmit} className="w-full space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
            Oder Code vom QR-Code-Schild abtippen:
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={manualCode}
              onChange={(e) => {
                setManualCode(e.target.value);
                setIsWrong(false);
              }}
              // placeholder={`z. B. ${config.manualFallbackCode}`}
              className="h-11 rounded-xl bg-slate-950/70 border-white/15 text-white text-base placeholder-slate-500"
            />
            <Button
              type="submit"
              disabled={!manualCode.trim()}
              className="h-11 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shrink-0 cursor-pointer border-0"
            >
              Prüfen
            </Button>
          </div>

          {isWrong && (
            <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Dieser Code stimmt nicht mit dem QR-Schild überein!</span>
            </div>
          )}
        </form>
      )}

      {isSolved && (
        <div className="w-full p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>QR-Code erfolgreich gescannt und verifiziert!</span>
        </div>
      )}
    </div>
  );
};

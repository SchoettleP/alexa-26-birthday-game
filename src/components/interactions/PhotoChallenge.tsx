import React, { useRef, useState } from 'react';
import type { PhotoChallengeConfig } from '@/types/hunt';
import { Camera, RefreshCw, Sparkles } from 'lucide-react';
import { sounds } from '@/utils/audio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PhotoChallengeProps {
  config: PhotoChallengeConfig;
  stationRoom: string;
  savedPhoto?: string;
  onSavePhoto: (dataUrl: string) => void;
  onSolve: () => void;
  isSolved?: boolean;
}

export const PhotoChallenge: React.FC<PhotoChallengeProps> = ({
  config,
  stationRoom,
  savedPhoto,
  onSavePhoto,
  onSolve
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(savedPhoto || null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCaptureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas for local storage efficiency
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
          setPreviewPhoto(compressedDataUrl);
          onSavePhoto(compressedDataUrl);
          sounds.playSuccess();
          onSolve();
        }
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center w-full py-1">
      {/* Hidden Native Camera Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture={config.cameraFacing || 'user'}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Polaroid Card or Capture Prompt */}
      {previewPhoto ? (
        <div className="w-full max-w-xs p-3.5 pb-4 bg-white text-slate-900 rounded-2xl shadow-2xl rotate-[-1deg] transition-transform hover:rotate-0 flex flex-col items-center animate-pop">
          {/* Photo Frame */}
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-950 relative border border-slate-200">
            <img
              src={previewPhoto}
              alt="Erinnerungs-Foto"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 border-0">
                Im Album gespeichert ✓
              </Badge>
            </div>
          </div>

          {/* Polaroid Footer */}
          <div className="w-full mt-2.5 px-1 flex items-center justify-between">
            <div>
              <div className="font-serif-title font-bold text-sm text-slate-900 leading-tight">
                {stationRoom}
              </div>
              <div className="text-[11px] text-slate-500 italic">
                {config.badgeText || 'Alexas 26. Geburtstag'}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCaptureClick}
              title="Foto wiederholen"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-950/30 via-slate-900 to-purple-950/30 border border-pink-500/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center mb-2.5 border border-pink-500/30">
            <Camera className="w-6 h-6" />
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white mb-1">
            {config.challengeTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 max-w-xs leading-relaxed">
            {config.prompt}
          </p>

          <Button
            type="button"
            onClick={handleCaptureClick}
            disabled={isProcessing}
            className="w-full h-12 rounded-xl bg-pink-600 hover:bg-pink-500 active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Foto wird verarbeitet...</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Foto aufnehmen / hochladen</span>
              </>
            )}
          </Button>

          <div className="flex items-center gap-1.5 text-[11px] text-pink-300/80 mt-2.5">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>Wird im großen Geburtstags-Album am Finale verewigt!</span>
          </div>
        </div>
      )}
    </div>
  );
};

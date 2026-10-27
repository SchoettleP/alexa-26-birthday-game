import React, { useState, useEffect } from 'react';
import { STATIONS } from './data/stations';
import { loadProgress, saveProgress, clearProgress, initialProgress } from './utils/storage';
import type { HuntProgress } from './types/hunt';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { QuizSection } from './components/QuizSection';
import { PhysicalTaskSection } from './components/PhysicalTaskSection';
import { HintSystem } from './components/HintSystem';
import { MapOverview } from './components/MapOverview';
import { CelebrationModal } from './components/CelebrationModal';
import { InventoryModal } from './components/InventoryModal';
import { sounds } from './utils/audio';
import { Card, CardContent } from '@/components/ui/card';



import {
  Moon,
  Mountain,
  Footprints,
  Sparkles,
  Droplets,
  Package,
  BookOpen,
  Compass,
  Key,
  Thermometer,
  Wrench,
  Flame,
  Car,
  TreePine,
  UtensilsCrossed,
  Crown,
  HelpCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


const iconMap: Record<string, LucideIcon> = {
  Moon,
  Mountain,
  Footprints,
  Sparkles,
  Droplets,
  Package,
  BookOpen,
  Compass,
  Key,
  Thermometer,
  Wrench,
  Flame,
  Car,
  TreePine,
  UtensilsCrossed,
  Crown
};

export const App: React.FC = () => {
  const [progress, setProgress] = useState<HuntProgress>(() => loadProgress());
  const [showMap, setShowMap] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [isCurrentPhysicalSolved, setIsCurrentPhysicalSolved] = useState(false);

  // Sync to storage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Current station data
  const currentStation = STATIONS[progress.currentStationIndex] || STATIONS[0];
  const stationId = currentStation.id;

  // Compute collected inventory artifacts up to current station
  const collectedItems = STATIONS.slice(0, progress.currentStationIndex + 1)
    .filter((s, idx) => {
      if (!s.inventoryAwarded) return false;
      if (idx < progress.currentStationIndex) return true;
      return isCurrentPhysicalSolved || idx === 0;
    })
    .map((s) => s.inventoryAwarded!)
    .filter(Boolean);

  const isQuizSolved = !currentStation.quiz || !!progress.quizSolvedForStation[stationId];
  const unlockedHints = progress.usedHintsForStation[stationId] || 0;
  const isLastStation = progress.currentStationIndex === STATIONS.length - 1;

  // Reset physical solved flag when switching stations
  useEffect(() => {
    setIsCurrentPhysicalSolved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [progress.currentStationIndex]);

  const handleStart = () => {
    sounds.playHint();
    setProgress((prev) => ({
      ...prev,
      isStarted: true,
      currentStationIndex: 0
    }));
  };

  const handleSolveQuiz = () => {
    setProgress((prev) => ({
      ...prev,
      quizSolvedForStation: {
        ...prev.quizSolvedForStation,
        [stationId]: true
      }
    }));
  };

  const handleSolvePhysical = () => {
    setIsCurrentPhysicalSolved(true);
  };

  const handleSavePhoto = (photoDataUrl: string) => {
    setProgress((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [stationId]: photoDataUrl
      }
    }));
  };

  const handleNextStation = () => {
    if (isLastStation) {
      setProgress((prev) => ({
        ...prev,
        isCompleted: true
      }));
    } else {
      setProgress((prev) => ({
        ...prev,
        currentStationIndex: prev.currentStationIndex + 1
      }));
    }
  };

  const handleUnlockHint = (count: number) => {
    setProgress((prev) => ({
      ...prev,
      usedHintsForStation: {
        ...prev.usedHintsForStation,
        [stationId]: count
      }
    }));
  };

  const handleReset = () => {
    clearProgress();
    setProgress(initialProgress);
    setIsCurrentPhysicalSolved(false);
  };

  const StationIcon = iconMap[currentStation.icon] || HelpCircle;

  return (
    <div className="min-h-screen w-full flex flex-col items-center text-slate-100">
      {!progress.isStarted ? (
        <IntroScreen onStart={handleStart} />
      ) : (
        <>
          {/* Persistent Header */}
          <Header
            currentStep={currentStation.step}
            totalSteps={STATIONS.length}
            currentRoom={currentStation.room}
            isRoomRevealed={isCurrentPhysicalSolved}
            inventoryCount={collectedItems.length}
            onOpenInventory={() => setShowInventory(true)}
            onOpenMap={() => setShowMap(true)}
            onReset={handleReset}
          />

          {/* Main Hunt Content Area */}
          <main className="flex-1 max-w-xl w-full mx-auto px-3.5 sm:px-6 py-3.5 sm:py-5 flex flex-col gap-3.5 sm:gap-5 pb-8 safe-bottom">
            {/* Station Header Card */}
            <Card className="bg-slate-900/70 border-white/10 relative overflow-hidden rounded-2xl backdrop-blur-md shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                      <StationIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 leading-tight mb-0.5">
                        {currentStation.zone} · Station {currentStation.step} von {STATIONS.length}
                      </div>
                      <h2 className="text-lg sm:text-2xl font-bold font-serif-title text-white leading-tight">
                        {currentStation.title}
                      </h2>
                      {isCurrentPhysicalSolved && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
                          <span>📍 Ort aufgedeckt: {currentStation.room}</span>
                          <span>✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ambiguous Room Riddle / Story Intro */}
                <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  <strong className="block text-amber-300 font-semibold mb-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
                    🕵️ Das Wegweiser-Rätsel: Wohin musst du jetzt?
                  </strong>
                  <p>{currentStation.storyIntro}</p>
                </div>
              </CardContent>
            </Card>

            {/* Riddle Section (Creative Room Riddles & Brain Teasers) */}
            {currentStation.quiz && (
              <QuizSection
                quiz={currentStation.quiz}
                isSolved={isQuizSolved}
                onSolve={handleSolveQuiz}
              />
            )}

            {/* Physical Task Section (Scavenger Hunt in Room with Varied Mechanics) */}
            <PhysicalTaskSection
              key={stationId}
              task={currentStation.physicalTask}
              stationRoom={currentStation.room}
              unlockedStory={currentStation.unlockedStory}
              isUnlocked={isQuizSolved}
              isSolved={isCurrentPhysicalSolved}
              isLastStation={isLastStation}
              savedPhoto={progress.photos[stationId]}
              onSavePhoto={handleSavePhoto}
              onSolve={handleSolvePhysical}
              onNextStation={handleNextStation}
            />

            {/* Progressive Hint System */}
            <HintSystem
              hints={currentStation.physicalTask.hints}
              unlockedHintCount={unlockedHints}
              onUnlockHint={handleUnlockHint}
            />
          </main>

          {/* Interactive House & Garden Map Overview Modal */}
          {showMap && (
            <MapOverview
              stations={STATIONS}
              currentIndex={progress.currentStationIndex}
              onClose={() => setShowMap(false)}
            />
          )}

          {/* Player Inventory Modal */}
          {showInventory && (
            <InventoryModal
              isOpen={showInventory}
              onClose={() => setShowInventory(false)}
              collectedItems={collectedItems}
            />
          )}

          {/* Epic Birthday Finale Modal */}
          {progress.isCompleted && (
            <CelebrationModal
              onRestart={handleReset}
              photos={progress.photos}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

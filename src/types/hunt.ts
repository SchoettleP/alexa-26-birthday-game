export type RoomZone = 'Dachgeschoss' | 'Obergeschoss' | 'Erdgeschoss' | 'Untergeschoss' | 'Außenbereich';

export type TaskType = 
  | 'code' 
  | 'directional' 
  | 'safe' 
  | 'scratch' 
  | 'audio' 
  | 'photo' 
  | 'qr';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DirectionalConfig {
  targetSequence: Direction[];
  gridTitle?: string;
}

export interface SafeDialConfig {
  targetCombination: number[]; // e.g. [2, 6, 0]
  dialLabels?: string[];
}

export interface ScratchCardConfig {
  coverTitle: string;
  coverSubtitle: string;
  revealedClue: string;
  revealedCode: string;
}

export interface AudioClueConfig {
  soundType: 'clock' | 'morse' | 'melody' | 'chime';
  soundTitle: string;
  soundDescription: string;
  question: string;
  options: {
    label: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
}

export interface PhotoChallengeConfig {
  challengeTitle: string;
  prompt: string;
  badgeText: string;
  cameraFacing?: 'user' | 'environment';
}

export interface QrScanConfig {
  expectedPayload: string;
  instructionText: string;
  manualFallbackCode: string;
}

export interface PhysicalTask {
  taskType?: TaskType; // Defaults to 'code'
  instruction: string;
  inputPlaceholder?: string;
  inputType?: 'number' | 'text';
  correctCode?: string;
  alternateCodes?: string[];
  decoys?: Record<string, string>; // specific wrong answers -> tailored hint
  hints: string[]; // progressive hints, e.g. [subtle hint, direct clue, exact solution]

  // Interactive variant configurations
  directional?: DirectionalConfig;
  safeDial?: SafeDialConfig;
  scratchCard?: ScratchCardConfig;
  audioClue?: AudioClueConfig;
  photoChallenge?: PhotoChallengeConfig;
  qrScan?: QrScanConfig;
}

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  stationAcquired: number;
  badge?: string;
}

export interface Station {
  id: string;
  step: number;
  room: string;
  zone: RoomZone;
  title: string;
  icon: string;
  storyIntro: string;
  quiz?: QuizQuestion;
  physicalTask: PhysicalTask;
  unlockedStory: string;
  inventoryAwarded?: InventoryItem;
  requiredInventoryId?: string;
}

export interface HuntProgress {
  currentStationIndex: number; // 0 to stations.length - 1
  isStarted: boolean;
  isCompleted: boolean;
  quizSolvedForStation: Record<string, boolean>;
  usedHintsForStation: Record<string, number>; // stationId -> count of hints unlocked (0, 1, 2, 3)
  photos: Record<string, string>; // stationId -> base64 photo data
  collectedInventoryIds?: string[];
  history: {
    stationId: string;
    completedAt: string;
    attempts: number;
  }[];
}

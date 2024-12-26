import { create } from 'zustand';
import { GameDifficulty, GameConfig } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../config/difficulties';

interface GameState {
  isPlaying: boolean;
  currentScore: number;
  gameConfig: (GameConfig & { difficulty: GameDifficulty }) | null;
  lives: number;
  setGameConfig: (difficulty: GameDifficulty) => void;
  startGame: () => void;
  endGame: () => void;
  addScore: (points: number) => void;
  reduceLives: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  currentScore: 0,
  gameConfig: null,
  lives: 0,
  
  setGameConfig: (difficulty) => set(() => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    return {
      gameConfig: { ...config, difficulty },
      lives: config.lives,
      currentScore: 0
    };
  }),
  
  startGame: () => set({ isPlaying: true }),
  
  endGame: () => set({ isPlaying: false }),
  
  addScore: (points) => set((state) => ({
    currentScore: state.currentScore + points * (state.gameConfig?.scoreMultiplier || 1)
  })),
  
  reduceLives: () => set((state) => ({
    lives: Math.max(0, state.lives - 1)
  }))
}));
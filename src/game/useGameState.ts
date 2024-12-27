import { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

export const useGameState = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { gameConfig } = useGameStore();

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const calculateScore = useCallback((basePoints: number) => {
    if (!gameConfig) return 0;
    const { scoreMultiplier } = gameConfig;
    return Math.floor(basePoints * scoreMultiplier);
  }, [gameConfig]);

  return {
    isPaused,
    togglePause,
    calculateScore
  };
};
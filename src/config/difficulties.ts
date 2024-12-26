import { GameDifficulty, GameConfig } from '../types/game';

export const DIFFICULTY_CONFIGS: Record<GameDifficulty, GameConfig> = {
  [GameDifficulty.CASUAL]: {
    timeLimit: 30,
    lives: 3,
    speed: 4,
    scoreMultiplier: 1.0,
    wallCollision: false,
    growthRate: 1
  },
  [GameDifficulty.HARD]: {
    timeLimit: 30,
    lives: 1,
    speed: 7,
    scoreMultiplier: 2.0,
    wallCollision: true,
    growthRate: 2
  },
  [GameDifficulty.HELL]: {
    timeLimit: 30,
    lives: 1,
    speed: 9,
    scoreMultiplier: 3.0,
    wallCollision: true,
    foodTimeout: 5,
    growthRate: 3,
    randomObstacles: true
  }
};
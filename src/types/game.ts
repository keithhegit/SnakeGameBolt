export enum GameDifficulty {
  CASUAL = 'CASUAL',
  HARD = 'HARD',
  HELL = 'HELL'
}

export interface GameConfig {
  timeLimit: number;
  lives: number;
  speed: number;
  foodTimeout?: number;
  scoreMultiplier: number;
  wallCollision: boolean;
  growthRate: number;
  randomObstacles?: boolean;
}
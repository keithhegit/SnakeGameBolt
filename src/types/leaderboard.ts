import { GameDifficulty } from './game';

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  score: number;
  difficulty: GameDifficulty;
  created_at: string;
}

export interface NewScore {
  player_name: string;
  score: number;
  difficulty: GameDifficulty;
}
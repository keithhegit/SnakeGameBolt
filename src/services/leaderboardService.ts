import { LeaderboardEntry, NewScore } from '../types/leaderboard';

const STORAGE_KEY = 'snake_leaderboard';

const getStoredScores = (): LeaderboardEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveScores = (scores: LeaderboardEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
};

export const leaderboardService = {
  async getTopScores(limit: number = 10): Promise<LeaderboardEntry[]> {
    const scores = getStoredScores();
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  },

  async addScore(newScore: NewScore): Promise<void> {
    const scores = getStoredScores();
    const entry: LeaderboardEntry = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...newScore
    };
    scores.push(entry);
    saveScores(scores);
  }
};
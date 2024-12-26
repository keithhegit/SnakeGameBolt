import React, { useState } from 'react';
import { GameDifficulty } from '../../types/game';
import { leaderboardService } from '../../services/leaderboardService';

interface NewScoreModalProps {
  score: number;
  difficulty: GameDifficulty;
  isOpen: boolean;
  onClose: () => void;
}

export const NewScoreModal: React.FC<NewScoreModalProps> = ({
  score,
  difficulty,
  isOpen,
  onClose
}) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setIsSubmitting(true);
    try {
      await leaderboardService.addScore({
        player_name: playerName.trim(),
        score,
        difficulty
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">提交分数</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="playerName" className="block text-gray-300 mb-2">
              玩家名称
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={20}
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-300">分数: {score}</p>
            <p className="text-gray-300">难度: {difficulty}</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isSubmitting ? '提交中...' : '提交分数'}
          </button>
        </form>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { GameDifficulty } from '../../types/game';
import { leaderboardService } from '../../services/leaderboardService';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  difficulty?: GameDifficulty;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  difficulty,
  onClose
}) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !difficulty) return;

    setIsSubmitting(true);
    try {
      await leaderboardService.addScore({
        player_name: playerName.trim(),
        score,
        difficulty
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">游戏结束</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-xl text-white mb-2">最终得分: {score}</p>
              <p className="text-gray-300 mb-4">难度: {difficulty}</p>
              
              <label htmlFor="playerName" className="block text-gray-300 mb-2">
                请输入你的名字以保存记录
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={20}
                required
                autoFocus
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {isSubmitting ? '提交中...' : '提交分数'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                不保存
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-400 text-lg mb-4">分数已成功保存！</p>
            <button
              onClick={onClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              返回主菜单
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
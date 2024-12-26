import React from 'react';
import { LeaderboardEntry } from '../../types/leaderboard';

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-4">排行榜</h2>
        
        <div className="overflow-y-auto max-h-96">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2 text-left">排名</th>
                <th className="py-2 text-left">玩家</th>
                <th className="py-2 text-right">分数</th>
                <th className="py-2 text-right">难度</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id} className="border-b border-gray-700">
                  <td className="py-2 text-white">{index + 1}</td>
                  <td className="py-2 text-white">{entry.player_name}</td>
                  <td className="py-2 text-white text-right">{entry.score}</td>
                  <td className="py-2 text-white text-right">{entry.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          关闭
        </button>
      </div>
    </div>
  );
};
import React from 'react';
import { GameDifficulty } from '../types/game';
import { DifficultyButton } from './DifficultyButton';

interface MainMenuProps {
  onDifficultySelect: (difficulty: GameDifficulty) => void;
  onLeaderboardClick: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  onDifficultySelect, 
  onLeaderboardClick 
}) => {
  const handleHomeClick = () => {
    window.location.href = 'https://www.ugphone.com';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-emerald-500 to-teal-700">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8 text-shadow">
          Ug贪食蛇
        </h1>
        
        <div className="space-y-3 mb-6">
          <DifficultyButton
            difficulty={GameDifficulty.CASUAL}
            onClick={onDifficultySelect}
            label="休闲模式"
            color="from-green-400 to-green-500"
          />
          <DifficultyButton
            difficulty={GameDifficulty.HARD}
            onClick={onDifficultySelect}
            label="困难模式"
            color="from-yellow-400 to-yellow-500"
          />
          <DifficultyButton
            difficulty={GameDifficulty.HELL}
            onClick={onDifficultySelect}
            label="地狱模式"
            color="from-red-400 to-red-500"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={onLeaderboardClick}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <img src="/icons/rank.png" alt="排名榜" className="w-6 h-6" />
          </button>
          <button 
            onClick={handleHomeClick}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <img src="/icons/home.png" alt="主页" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
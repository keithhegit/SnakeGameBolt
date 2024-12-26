import React from 'react';
import { GameDifficulty } from '../types/game';

interface DifficultyButtonProps {
  difficulty: GameDifficulty;
  onClick: (difficulty: GameDifficulty) => void;
  label: string;
  color: string;
}

export const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  difficulty,
  onClick,
  label,
  color
}) => {
  return (
    <button
      onClick={() => onClick(difficulty)}
      className={`w-full bg-gradient-to-r ${color} text-white font-bold 
        py-3 px-6 rounded-xl shadow-lg transform transition 
        duration-200 hover:scale-105 hover:brightness-110
        border-2 border-white/30`}
    >
      {label}
    </button>
  );
};
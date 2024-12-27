import React, { useState, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameStatus } from './GameStatus';
import { GameOverModal } from './GameOverModal';
import { useGameStore } from '../../store/gameStore';
import { useTimer } from '../../game/useTimer';

interface GameScreenProps {
  onExit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onExit }) => {
  const { currentScore, lives, gameConfig, reduceLives, endGame } = useGameStore();
  const [showGameOver, setShowGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleGameOver = useCallback(() => {
    reduceLives();
    if (lives <= 1) {
      endGame();
      setShowGameOver(true);
    }
  }, [lives, reduceLives, endGame]);

  const { timeLeft } = useTimer(gameConfig?.timeLimit || 0, handleGameOver);

  const togglePause = () => setIsPaused(prev => !prev);

  const handleGameOverClose = () => {
    setShowGameOver(false);
    onExit();
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <GameStatus
          score={currentScore}
          lives={lives}
          timeLeft={timeLeft}
        />
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={togglePause}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isPaused ? '继续' : '暂停'}
        </button>
        <button
          onClick={onExit}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          退出
        </button>
      </div>

      <div className="flex justify-center items-center h-full">
        <GameBoard onGameOver={handleGameOver} isPaused={isPaused} />
      </div>

      <GameOverModal
        isOpen={showGameOver}
        score={currentScore}
        difficulty={gameConfig?.difficulty}
        onClose={handleGameOverClose}
      />
    </div>
  );
}
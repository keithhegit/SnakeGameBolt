import React, { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/Game/GameScreen';
import { LeaderboardModal } from './components/Leaderboard/LeaderboardModal';
import { ThemeToggle } from './components/ThemeToggle';
import { GameDifficulty } from './types/game';
import { LeaderboardEntry } from './types/leaderboard';
import { useGameStore } from './store/gameStore';
import { leaderboardService } from './services/leaderboardService';

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const { setGameConfig, startGame, endGame } = useGameStore();

  const loadLeaderboard = async () => {
    try {
      const entries = await leaderboardService.getTopScores();
      setLeaderboardEntries(entries);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  const handleDifficultySelect = (difficulty: GameDifficulty) => {
    setGameConfig(difficulty);
    startGame();
    setShowGame(true);
  };

  const handleGameExit = () => {
    endGame();
    setShowGame(false);
  };

  const handleLeaderboardClick = async () => {
    await loadLeaderboard();
    setShowLeaderboard(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      
      {showGame ? (
        <GameScreen onExit={handleGameExit} />
      ) : (
        <MainMenu
          onDifficultySelect={handleDifficultySelect}
          onLeaderboardClick={handleLeaderboardClick}
        />
      )}

      <LeaderboardModal
        entries={leaderboardEntries}
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
    </div>
  );
};

export default App;
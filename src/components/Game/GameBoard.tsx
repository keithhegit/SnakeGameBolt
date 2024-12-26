import React, { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useSnake } from '../../game/useSnake';
import { useFood } from '../../game/useFood';
import { useObstacles } from '../../game/useObstacles';
import { useCollision } from '../../game/useCollision';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameState } from '../../game/useGameState';
import { BASE_SCORE } from '../../config/constants';
import { useGameDimensions } from '../../hooks/useGameDimensions';

interface GameBoardProps {
  onGameOver: () => void;
  isPaused: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onGameOver, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { GRID_SIZE, CELL_SIZE } = useGameDimensions();
  const gameConfig = useGameStore((state) => state.gameConfig);
  const isPlaying = useGameStore((state) => state.isPlaying);
  const addScore = useGameStore((state) => state.addScore);
  
  const { snake, moveSnake, changeDirection, grow } = useSnake();
  const { checkWallCollision, checkFoodCollision, checkSelfCollision, isPointOccupied } = useCollision(
    gameConfig?.wallCollision
  );

  const { obstacles, checkObstacleCollision, startObstacleGeneration, resetObstacles } = useObstacles(
    (point) => isPointOccupied(point, snake)
  );

  const { food, generateFood, removeFood, updateFoodTimer } = useFood(
    (point) => isPointOccupied(point, snake) || checkObstacleCollision(point),
    gameConfig?.foodTimeout
  );

  const { togglePause, calculateScore } = useGameState();

  useKeyboard(changeDirection, togglePause);

  // Handle collisions
  const handleCollisions = useCallback(() => {
    const head = snake.body[0];

    if (checkWallCollision(head)) {
      onGameOver();
      return;
    }

    if (checkSelfCollision(snake)) {
      onGameOver();
      return;
    }

    if (checkObstacleCollision(head)) {
      onGameOver();
      return;
    }

    if (checkFoodCollision(snake, food)) {
      for (let i = 0; i < (gameConfig?.growthRate || 1); i++) {
        grow();
      }
      const points = calculateScore(BASE_SCORE);
      addScore(points);
      removeFood();
      generateFood();
    }
  }, [snake, food, grow, addScore, generateFood, removeFood, onGameOver, checkFoodCollision, 
      checkSelfCollision, checkWallCollision, checkObstacleCollision, gameConfig?.growthRate, calculateScore]);

  // Game loop
  useEffect(() => {
    if (!canvasRef.current || !isPlaying || isPaused) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

      // Draw grid
      ctx.strokeStyle = '#E5E5E5';
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        ctx.stroke();
      }

      // Draw border
      ctx.strokeStyle = '#2C3E50';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

      // Draw snake
      ctx.fillStyle = '#3498DB';
      snake.body.forEach(({ x, y }, index) => {
        const size = index === 0 ? CELL_SIZE - 2 : CELL_SIZE - 4;
        ctx.fillRect(
          x * CELL_SIZE + (CELL_SIZE - size) / 2,
          y * CELL_SIZE + (CELL_SIZE - size) / 2,
          size,
          size
        );
      });

      // Draw food
      if (food) {
        ctx.fillStyle = '#E74C3C';
        ctx.beginPath();
        ctx.arc(
          food.position.x * CELL_SIZE + CELL_SIZE / 2,
          food.position.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Draw obstacles
      ctx.fillStyle = '#95A5A6';
      obstacles.forEach(({ position }) => {
        ctx.fillRect(
          position.x * CELL_SIZE + 2,
          position.y * CELL_SIZE + 2,
          CELL_SIZE - 4,
          CELL_SIZE - 4
        );
      });
    };

    const gameLoop = () => {
      moveSnake();
      handleCollisions();
      drawGame();
      
      if (food?.timeLeft !== undefined) {
        updateFoodTimer(0.1);
      }
    };

    const interval = setInterval(gameLoop, 1000 / (gameConfig?.speed || 5));
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, snake, food, obstacles, moveSnake, handleCollisions, 
      updateFoodTimer, gameConfig?.speed, GRID_SIZE, CELL_SIZE]);

  // Generate initial food
  useEffect(() => {
    if (!food && isPlaying && !isPaused) {
      generateFood();
    }
  }, [food, isPlaying, isPaused, generateFood]);

  // Start obstacle generation if enabled
  useEffect(() => {
    if (gameConfig?.randomObstacles) {
      const cleanup = startObstacleGeneration();
      return () => {
        cleanup();
        resetObstacles();
      };
    }
  }, [gameConfig?.randomObstacles, startObstacleGeneration, resetObstacles]);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="bg-white"
      />
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <span className="text-white text-4xl font-bold">暂停</span>
        </div>
      )}
    </div>
  );
};
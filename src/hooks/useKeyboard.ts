import { useEffect } from 'react';
import { Direction } from '../types/snake';

export const useKeyboard = (
  onDirectionChange: (direction: Direction) => void,
  onPause?: () => void
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          onDirectionChange(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          onDirectionChange(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          onDirectionChange(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          onDirectionChange(Direction.RIGHT);
          break;
        case ' ':
        case 'p':
        case 'P':
          onPause?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onDirectionChange, onPause]);
};
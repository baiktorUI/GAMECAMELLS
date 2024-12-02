import { useState, useCallback, useRef } from 'react';
import { GameState, Player } from '../types/game';
import { launchFireworks, launchSchoolPride, stopConfetti } from '../utils/confetti';

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentScreen: 'playerSelect',
    imageCount: 3,
    winner: null,
  });

  const [tempPlayerNames, setTempPlayerNames] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const confettiActiveRef = useRef<boolean>(false);

  const handleSelectPlayers = useCallback((count: number, names: string[]) => {
    setTempPlayerNames(names);
    setGameState(prev => ({
      ...prev,
      currentScreen: 'imageSelect',
      winner: null,
    }));
  }, []);

  const handleSelectImageCount = useCallback((count: number) => {
    const players: Player[] = tempPlayerNames.map((name, index) => ({
      id: index + 1,
      name,
      points: Array(count).fill(false),
    }));

    setGameState({
      players,
      currentScreen: 'game',
      imageCount: count,
      winner: null,
    });
  }, [tempPlayerNames]);

  const handleKeyPress = useCallback((key: string) => {
    setGameState((prev) => {
      if (prev.currentScreen !== 'game') return prev;

      const newPlayers = [...prev.players];
      const clearKeys = ['z', 'x', 'c', 'v'];
      
      if (clearKeys.includes(key.toLowerCase())) {
        if (confettiActiveRef.current) {
          stopConfetti(intervalRef, animationFrameRef);
          confettiActiveRef.current = false;
        }
        
        const clearKeyIndex = clearKeys.indexOf(key.toLowerCase());
        if (clearKeyIndex < prev.players.length) {
          const player = newPlayers[clearKeyIndex];
          const lastFilledIndex = player.points.lastIndexOf(true);
          
          if (lastFilledIndex !== -1) {
            const updatedPoints = [...player.points];
            updatedPoints[lastFilledIndex] = false;
            newPlayers[clearKeyIndex] = {
              ...player,
              points: updatedPoints,
            };
          }
        }
        
        return {
          ...prev,
          players: newPlayers,
          winner: null,
        };
      }

      const numberKey = parseInt(key);
      if (numberKey >= 1 && numberKey <= prev.players.length) {
        const playerIndex = numberKey - 1;
        const player = newPlayers[playerIndex];
        const firstEmptyIndex = player.points.findIndex(point => !point);
        
        if (firstEmptyIndex !== -1 && !prev.winner) {
          const updatedPoints = [...player.points];
          updatedPoints[firstEmptyIndex] = true;
          newPlayers[playerIndex] = {
            ...player,
            points: updatedPoints,
          };

          const hasWon = updatedPoints.every(point => point);
          if (hasWon && !confettiActiveRef.current) {
            confettiActiveRef.current = true;
            launchSchoolPride(animationFrameRef);
            setTimeout(() => {
              if (confettiActiveRef.current) {
                launchFireworks(intervalRef);
              }
            }, 500);
            
            return {
              ...prev,
              players: newPlayers,
              winner: player.id,
            };
          }
        }
        
        return {
          ...prev,
          players: newPlayers,
        };
      }

      return prev;
    });
  }, []);

  return {
    gameState,
    handleSelectPlayers,
    handleSelectImageCount,
    handleKeyPress,
  };
}
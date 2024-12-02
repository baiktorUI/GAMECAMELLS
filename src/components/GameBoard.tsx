import React from 'react';
import { Player } from '../types/game';
import { Layout } from './Layout';
import { PlayerRow } from './PlayerRow';

type GameBoardProps = {
  players: Player[];
  onKeyPress: (key: string) => void;
};

export function GameBoard({ players, onKeyPress }: GameBoardProps) {
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      onKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onKeyPress]);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6">
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </div>
    </Layout>
  );
}
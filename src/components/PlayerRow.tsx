import React from 'react';
import { Player } from '../types/game';
import { GameCircle } from './GameCircle';

type PlayerRowProps = {
  player: Player;
};

export function PlayerRow({ player }: PlayerRowProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-3xl font-bold text-white w-[140px]">{player.name}</span>
      <div className="flex items-center gap-3">
        {player.points.map((filled, index) => (
          <GameCircle key={index} index={index} filled={filled} />
        ))}
      </div>
    </div>
  );
}
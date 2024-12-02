export type Player = {
  id: number;
  name: string;
  points: boolean[];
};

export type GameState = {
  players: Player[];
  currentScreen: 'playerSelect' | 'imageSelect' | 'game';
  imageCount: number;
  winner: number | null;
};
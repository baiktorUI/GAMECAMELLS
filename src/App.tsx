import React from 'react';
import { PlayerSelect } from './components/PlayerSelect';
import { ImageCountSelect } from './components/ImageCountSelect';
import { GameBoard } from './components/GameBoard';
import { useGame } from './hooks/useGame';

function App() {
  const { gameState, handleSelectPlayers, handleSelectImageCount, handleKeyPress } = useGame();

  return (
    <>
      {gameState.currentScreen === 'playerSelect' ? (
        <PlayerSelect onSelectPlayers={handleSelectPlayers} />
      ) : gameState.currentScreen === 'imageSelect' ? (
        <ImageCountSelect 
          onSelectImageCount={handleSelectImageCount}
          playerNames={gameState.players.map(p => p.name)}
        />
      ) : (
        <GameBoard
          players={gameState.players}
          onKeyPress={handleKeyPress}
        />
      )}
    </>
  );
}

export default App;
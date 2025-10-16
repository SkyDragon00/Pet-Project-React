import React from 'react';
import type { Game } from '../types/Game';
import GameDetail from '../components/GameDetail';

interface GamePageProps {
  games: Game[];
}

const GamePage: React.FC<GamePageProps> = ({ games }) => {
  return <GameDetail games={games} />;
};

export default GamePage;
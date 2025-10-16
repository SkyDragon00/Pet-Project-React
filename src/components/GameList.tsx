import React from 'react';
import type { Game } from '../types/Game';
import GameCard from './GameCard';
import './GameList.css';

interface GameListProps {
  games: Game[];
  loading?: boolean;
  error?: string;
}

const GameList: React.FC<GameListProps> = ({ games, loading, error }) => {
  if (loading) {
    return (
      <div className="game-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-list-error">
        <h3>Error loading games</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="game-list-empty">
        <h3>No games found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="game-list">
      <div className="game-list-header">
        <h2>Games ({games.length})</h2>
      </div>
      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
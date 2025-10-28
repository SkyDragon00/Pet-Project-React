import React from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../types/Game';
import { gameUtils } from '../services/rawgApi';
import './GameCard.css';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const gameImage = gameUtils.getGameImage(game);
  const genres = gameUtils.getGenreNames(game);
  const developers = gameUtils.getDeveloperNames(game);
  const platforms = gameUtils.getPlatformNames(game);

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-image">
        <img 
          src={gameImage || '/placeholder-game.jpg'} 
          alt={game.name}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-game.jpg';
          }}
        />
        <div className="game-card-overlay">
          <div className="game-card-genres">
            {genres.slice(0, 2).map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
          {game.metacritic && (
            <div className="game-card-metacritic">
              {game.metacritic}
            </div>
          )}
        </div>
      </div>
      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        <div className="game-card-info">
          {developers.length > 0 && (
            <p className="game-card-developer">{developers[0]}</p>
          )}
          {game.released && (
            <p className="game-card-release">{gameUtils.getFormattedReleaseDate(game)}</p>
          )}
          {platforms.length > 0 && (
            <div className="game-card-platforms">
              {platforms.slice(0, 3).join(', ')}
            </div>
          )}
        </div>
        {game.rating && (
          <div className="game-card-rating">
            <span className="rating-score">{game.rating.toFixed(1)}/5</span>
            <span className="rating-count">({game.ratings_count} reviews)</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default GameCard;
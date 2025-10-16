import React from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../types/Game';
import './GameCard.css';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-image">
        <img 
          src={game.image || '/placeholder-game.jpg'} 
          alt={game.name}
          loading="lazy"
        />
        <div className="game-card-overlay">
          <div className="game-card-genres">
            {game.genres?.slice(0, 2).map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        <div className="game-card-info">
          {game.developer && (
            <p className="game-card-developer">{game.developer}</p>
          )}
          {game.price !== undefined && (
            <div className="game-card-price">
              {game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}
            </div>
          )}
        </div>
        {game.rating && (
          <div className="game-card-rating">
            <span className="rating-text">
              {game.rating >= 8 ? 'Overwhelmingly Positive' :
               game.rating >= 7 ? 'Very Positive' :
               game.rating >= 6 ? 'Mostly Positive' :
               game.rating >= 5 ? 'Mixed' : 'Mostly Negative'}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default GameCard;
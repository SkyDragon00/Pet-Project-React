import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Game } from '../types/Game';
import './GameDetail.css';

interface GameDetailProps {
  games: Game[];
}

const GameDetail: React.FC<GameDetailProps> = ({ games }) => {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === Number(id));

  if (!game) {
    return (
      <div className="game-detail-error">
        <h2>Game not found</h2>
        <p>The game you're looking for doesn't exist.</p>
        <Link to="/" className="back-button">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="game-detail">
      <div className="game-detail-container">
        <div className="game-detail-header">
          <Link to="/" className="back-link">
            ← Back to Store
          </Link>
          <h1 className="game-title">{game.name}</h1>
        </div>

        <div className="game-detail-content">
          <div className="game-media">
            <div className="game-main-image">
              <img 
                src={game.image || '/placeholder-game.jpg'} 
                alt={game.name}
              />
            </div>
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="game-screenshots">
                <h3>Screenshots</h3>
                <div className="screenshots-grid">
                  {game.screenshots.map((screenshot, index) => (
                    <img 
                      key={index}
                      src={screenshot} 
                      alt={`${game.name} screenshot ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="game-info">
            <div className="game-purchase">
              <div className="game-price">
                {game.price === 0 ? (
                  <span className="price-free">Free to Play</span>
                ) : (
                  <span className="price-amount">${game.price?.toFixed(2)}</span>
                )}
              </div>
              <button className="purchase-button">
                {game.price === 0 ? 'Play Game' : 'Add to Cart'}
              </button>
            </div>

            <div className="game-details">
              {game.description && (
                <div className="detail-section">
                  <h3>About This Game</h3>
                  <p>{game.description}</p>
                </div>
              )}

              <div className="detail-section">
                <h3>Game Details</h3>
                <div className="detail-grid">
                  {game.developer && (
                    <div className="detail-item">
                      <span className="detail-label">Developer:</span>
                      <span className="detail-value">{game.developer}</span>
                    </div>
                  )}
                  {game.publisher && (
                    <div className="detail-item">
                      <span className="detail-label">Publisher:</span>
                      <span className="detail-value">{game.publisher}</span>
                    </div>
                  )}
                  {game.releaseDate && (
                    <div className="detail-item">
                      <span className="detail-label">Release Date:</span>
                      <span className="detail-value">{game.releaseDate}</span>
                    </div>
                  )}
                  {game.platforms && (
                    <div className="detail-item">
                      <span className="detail-label">Platforms:</span>
                      <span className="detail-value">{game.platforms.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {game.genres && game.genres.length > 0 && (
                <div className="detail-section">
                  <h3>Genres</h3>
                  <div className="genres-list">
                    {game.genres.map((genre, index) => (
                      <span key={index} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {game.rating && (
                <div className="detail-section">
                  <h3>User Reviews</h3>
                  <div className="rating-display">
                    <span className="rating-score">{game.rating}/10</span>
                    <span className="rating-text">
                      {game.rating >= 8 ? 'Overwhelmingly Positive' :
                       game.rating >= 7 ? 'Very Positive' :
                       game.rating >= 6 ? 'Mostly Positive' :
                       game.rating >= 5 ? 'Mixed' : 'Mostly Negative'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
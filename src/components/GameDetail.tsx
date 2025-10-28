import React from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../types/Game';
import { gameUtils } from '../services/rawgApi';
import './GameDetail.css';

interface GameDetailProps {
  game: Game | null;
  loading?: boolean;
  error?: string;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, loading, error }) => {
  if (loading) {
    return (
      <div className="game-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-detail-error">
        <h2>Error loading game</h2>
        <p>{error}</p>
        <Link to="/" className="back-button">
          Back to Store
        </Link>
      </div>
    );
  }

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

  const gameImage = gameUtils.getGameImage(game);
  const platforms = gameUtils.getPlatformNames(game);
  const genres = gameUtils.getGenreNames(game);
  const developers = gameUtils.getDeveloperNames(game);
  const publishers = gameUtils.getPublisherNames(game);
  const releaseDate = gameUtils.getFormattedReleaseDate(game);
  const screenshots = gameUtils.getScreenshots(game);

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
                src={gameImage || '/placeholder-game.jpg'} 
                alt={game.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-game.jpg';
                }}
              />
            </div>
            {screenshots.length > 0 && (
              <div className="game-screenshots">
                <h3>Screenshots</h3>
                <div className="screenshots-grid">
                  {screenshots.slice(0, 6).map((screenshot, index) => (
                    <img 
                      key={index}
                      src={screenshot} 
                      alt={`${game.name} screenshot ${index + 1}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="game-info">
            <div className="game-purchase">
              <div className="game-price">
                <span className="price-free">Free to Play</span>
              </div>
              <button className="purchase-button">
                View on Store
              </button>
            </div>

            <div className="game-details">
              {game.description_raw && (
                <div className="detail-section">
                  <h3>About This Game</h3>
                  <p>{game.description_raw}</p>
                </div>
              )}

              <div className="detail-section">
                <h3>Game Details</h3>
                <div className="detail-grid">
                  {developers.length > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Developer:</span>
                      <span className="detail-value">{developers.join(', ')}</span>
                    </div>
                  )}
                  {publishers.length > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Publisher:</span>
                      <span className="detail-value">{publishers.join(', ')}</span>
                    </div>
                  )}
                  {game.released && (
                    <div className="detail-item">
                      <span className="detail-label">Release Date:</span>
                      <span className="detail-value">{releaseDate}</span>
                    </div>
                  )}
                  {platforms.length > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Platforms:</span>
                      <span className="detail-value">{platforms.join(', ')}</span>
                    </div>
                  )}
                  {game.metacritic && (
                    <div className="detail-item">
                      <span className="detail-label">Metacritic Score:</span>
                      <span className="detail-value">{game.metacritic}/100</span>
                    </div>
                  )}
                </div>
              </div>

              {genres.length > 0 && (
                <div className="detail-section">
                  <h3>Genres</h3>
                  <div className="genres-list">
                    {genres.map((genre, index) => (
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
                    <span className="rating-score">{game.rating.toFixed(1)}/5</span>
                    <span className="rating-text">
                      ({game.ratings_count} reviews)
                    </span>
                    {game.rating >= 4 ? ' - Overwhelmingly Positive' :
                     game.rating >= 3.5 ? ' - Very Positive' :
                     game.rating >= 3 ? ' - Mostly Positive' :
                     game.rating >= 2.5 ? ' - Mixed' : ' - Mostly Negative'}
                  </div>
                </div>
              )}

              {game.playtime > 0 && (
                <div className="detail-section">
                  <h3>Average Playtime</h3>
                  <p>{game.playtime} hours</p>
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
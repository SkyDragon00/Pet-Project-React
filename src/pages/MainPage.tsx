import React, { useState, useMemo } from 'react';
import type { Game } from '../types/Game';
import SearchBar from '../components/SearchBar';
import GameList from '../components/GameList';
import './MainPage.css';

interface MainPageProps {
  games: Game[];
  loading?: boolean;
  error?: string;
}

const MainPage: React.FC<MainPageProps> = ({ games, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) {
      return games;
    }
    
    const query = searchQuery.toLowerCase();
    return games.filter(game => 
      game.name.toLowerCase().includes(query) ||
      game.developer?.toLowerCase().includes(query) ||
      game.genres?.some(genre => genre.toLowerCase().includes(query))
    );
  }, [games, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="main-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Favorite Game</h1>
          <p className="hero-subtitle">
            Browse thousands of games and find your perfect match
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="featured-section">
        {searchQuery && (
          <div className="search-results-header">
            <h2>Search Results for "{searchQuery}"</h2>
            {filteredGames.length === 0 && !loading && (
              <p>No games found matching your search.</p>
            )}
          </div>
        )}
        
        <GameList 
          games={filteredGames}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default MainPage;
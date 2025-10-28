import React, { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types/Game';
import SearchBar from '../components/SearchBar';
import GameList from '../components/GameList';
import { rawgApi } from '../services/rawgApi';
import './MainPage.css';

interface MainPageProps {
  games: Game[];
  loading?: boolean;
  error?: string;
}

const MainPage: React.FC<MainPageProps> = ({ games: initialGames, loading: initialLoading, error: initialError }) => {
  const [displayGames, setDisplayGames] = useState<Game[]>(initialGames);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      setDisplayGames(initialGames);
    }
  }, [initialGames, isSearching]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setIsSearching(false);
      setDisplayGames(initialGames);
      setSearchError(null);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      setIsSearching(true);
      
      const response = await rawgApi.searchGames(query, { page_size: 40 });
      setDisplayGames(response.results);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Failed to search games');
      console.error('Error searching games:', err);
    } finally {
      setSearchLoading(false);
    }
  }, [initialGames]);

  const currentLoading = isSearching ? searchLoading : initialLoading;
  const currentError = isSearching ? searchError : initialError;

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
            {displayGames.length === 0 && !currentLoading && !currentError && (
              <p>No games found matching your search.</p>
            )}
          </div>
        )}
        
        {!searchQuery && !initialLoading && (
          <div className="section-header">
            <h2>Popular Games</h2>
            <p>Discover the most highly rated games</p>
          </div>
        )}
        
        <GameList 
          games={displayGames}
          loading={currentLoading}
          error={currentError || undefined}
        />
      </div>
    </div>
  );
};

export default MainPage;
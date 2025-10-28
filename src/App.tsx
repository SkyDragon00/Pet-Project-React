import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import type { Game } from './types/Game';
import { rawgApi } from './services/rawgApi';
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch popular games for the main page
        const response = await rawgApi.getPopularGames({ page_size: 40 });
        setGames(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <MainPage 
                  games={games} 
                  loading={loading} 
                  error={error || undefined} 
                />
              } 
            />
            <Route 
              path="/game/:id" 
              element={<GamePage />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

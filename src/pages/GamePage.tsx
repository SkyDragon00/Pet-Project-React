import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Game } from '../types/Game';
import GameDetail from '../components/GameDetail';
import { rawgApi } from '../services/rawgApi';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const gameData = await rawgApi.getGameById(Number(id));
        setGame(gameData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch game');
        console.error('Error fetching game:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  return (
    <GameDetail 
      game={game} 
      loading={loading} 
      error={error || undefined} 
    />
  );
};

export default GamePage;
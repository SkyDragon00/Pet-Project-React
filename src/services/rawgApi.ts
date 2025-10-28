import type { Game, GamesResponse } from '../types/Game';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const DEFAULT_PAGE_SIZE = 20;

export interface GameSearchParams {
  page?: number;
  page_size?: number;
  search?: string;
  search_precise?: boolean;
  search_exact?: boolean;
  parent_platforms?: string;
  platforms?: string;
  stores?: string;
  developers?: string;
  publishers?: string;
  genres?: string;
  tags?: string;
  creators?: string;
  dates?: string;
  updated?: string;
  platforms_count?: number;
  metacritic?: string;
  exclude_collection?: number;
  exclude_additions?: boolean;
  exclude_parents?: boolean;
  exclude_game_series?: boolean;
  ordering?: string;
}

const buildQueryString = (params: GameSearchParams): string => {
  const searchParams = new URLSearchParams();
  
  searchParams.append('key', API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
};

export const rawgApi = {
  async getGames(params: GameSearchParams = {}): Promise<GamesResponse> {
    const defaultParams = {
      page_size: DEFAULT_PAGE_SIZE,
      ...params
    };
    
    const queryString = buildQueryString(defaultParams);
    const response = await fetch(`${BASE_URL}/games?${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    
    return response.json();
  },

  async getGameById(id: number): Promise<Game> {
    const queryString = buildQueryString({});
    const response = await fetch(`${BASE_URL}/games/${id}?${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch game: ${response.statusText}`);
    }
    
    return response.json();
  },

  async searchGames(query: string, params: Omit<GameSearchParams, 'search'> = {}): Promise<GamesResponse> {
    return this.getGames({
      search: query,
      ...params
    });
  },

  async getPopularGames(params: GameSearchParams = {}): Promise<GamesResponse> {
    return this.getGames({
      ordering: '-rating,-reviews_count',
      metacritic: '80,100',
      ...params
    });
  },

  async getRecentGames(params: GameSearchParams = {}): Promise<GamesResponse> {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
    const dateString = threeMonthsAgo.toISOString().split('T')[0];
    
    return this.getGames({
      dates: `${dateString},${new Date().toISOString().split('T')[0]}`,
      ordering: '-released',
      ...params
    });
  },

  async getGamesByGenre(genreSlug: string, params: GameSearchParams = {}): Promise<GamesResponse> {
    return this.getGames({
      genres: genreSlug,
      ...params
    });
  },

  async getGamesByPlatform(platformId: string, params: GameSearchParams = {}): Promise<GamesResponse> {
    return this.getGames({
      platforms: platformId,
      ...params
    });
  },

  async getFreeGames(params: GameSearchParams = {}): Promise<GamesResponse> {
    return this.getGames({
      tags: 'free-to-play',
      ...params
    });
  }
};

export const gameUtils = {
  getGameImage(game: Game): string {
    return game.background_image || 
           (game.short_screenshots && game.short_screenshots.length > 0 
            ? game.short_screenshots[0].image 
            : '');
  },

  getPlatformNames(game: Game): string[] {
    return game.parent_platforms?.map(p => p.platform.name) || [];
  },

  getGenreNames(game: Game): string[] {
    return game.genres?.map(g => g.name) || [];
  },

  getDeveloperNames(game: Game): string[] {
    return game.developers?.map(d => d.name) || [];
  },

  getPublisherNames(game: Game): string[] {
    return game.publishers?.map(p => p.name) || [];
  },

  getFormattedReleaseDate(game: Game): string {
    if (!game.released) return 'TBA';
    
    try {
      return new Date(game.released).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return game.released;
    }
  },

  getScreenshots(game: Game): string[] {
    return game.short_screenshots?.map(s => s.image) || [];
  }
};

export default rawgApi;
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { rawgApi } from '../services/rawgApi'
import type { GamesResponse, Game } from '../types/Game'

// Mock fetch globally
const mockFetch = vi.fn()
globalThis.fetch = mockFetch

// Mock import.meta.env
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_RAWG_API_KEY: 'test-api-key'
  },
  configurable: true
})

const mockGamesResponse: GamesResponse = {
  count: 2,
  results: [
    {
      id: 1,
      slug: 'test-game',
      name: 'Test Game',
      name_original: 'Test Game',
      tba: false,
      updated: '2023-01-01T00:00:00Z',
      rating: 4.5,
      rating_top: 5,
      ratings: [],
      ratings_count: 100,
      reviews_text_count: 50,
      added: 1000,
      added_by_status: {},
      playtime: 10,
      screenshots_count: 5,
      movies_count: 0,
      creators_count: 2,
      achievements_count: 20,
      parent_achievements_count: 0,
      reddit_count: 0,
      twitch_count: 0,
      youtube_count: 0,
      reviews_count: 50,
      saturated_color: '#ffffff',
      dominant_color: '#000000',
      short_screenshots: [],
      parent_platforms: [],
      platforms: [],
      developers: [],
      genres: [],
      tags: [],
      publishers: [],
      released: '2023-01-01'
    }
  ]
}

const mockGame: Game = {
  id: 1,
  slug: 'test-game',
  name: 'Test Game',
  name_original: 'Test Game',
  description: 'A test game',
  tba: false,
  updated: '2023-01-01T00:00:00Z',
  background_image: 'https://example.com/test.jpg',
  rating: 4.5,
  rating_top: 5,
  ratings: [],
  ratings_count: 100,
  reviews_text_count: 50,
  added: 1000,
  added_by_status: {},
  playtime: 10,
  screenshots_count: 5,
  movies_count: 0,
  creators_count: 2,
  achievements_count: 20,
  parent_achievements_count: 0,
  reddit_count: 0,
  twitch_count: 0,
  youtube_count: 0,
  reviews_count: 50,
  saturated_color: '#ffffff',
  dominant_color: '#000000',
  short_screenshots: [],
  parent_platforms: [],
  platforms: [],
  developers: [],
  genres: [],
  tags: [],
  publishers: [],
  released: '2023-01-01'
}

describe('rawgApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getGames', () => {
    it('should fetch games with default parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      const result = await rawgApi.getGames()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.rawg.io/api/games')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page_size=20')
      )
      expect(result).toEqual(mockGamesResponse)
    })

    it('should fetch games with custom parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.getGames({ page: 2, page_size: 10, search: 'cyberpunk' })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page_size=10')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=cyberpunk')
      )
    })

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      })

      await expect(rawgApi.getGames()).rejects.toThrow('Failed to fetch games: Not Found')
    })
  })

  describe('getGameById', () => {
    it('should fetch game by id', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGame)
      })

      const result = await rawgApi.getGameById(1)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.rawg.io/api/games/1')
      )
      expect(result).toEqual(mockGame)
    })

    it('should throw error when game fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      })

      await expect(rawgApi.getGameById(999)).rejects.toThrow('Failed to fetch game: Not Found')
    })
  })

  describe('searchGames', () => {
    it('should search games with query', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.searchGames('cyberpunk', { page_size: 5 })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=cyberpunk')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page_size=5')
      )
    })
  })

  describe('getPopularGames', () => {
    it('should fetch popular games with correct ordering and metacritic filter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.getPopularGames()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('ordering=-rating%2C-reviews_count')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('metacritic=80%2C100')
      )
    })
  })

  describe('getRecentGames', () => {
    it('should fetch recent games with date range', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.getRecentGames()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('ordering=-released')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('dates=')
      )
    })
  })

  describe('getGamesByGenre', () => {
    it('should fetch games by genre', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.getGamesByGenre('action')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('genres=action')
      )
    })
  })

  describe('getGamesByPlatform', () => {
    it('should fetch games by platform', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.getGamesByPlatform('4')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('platforms=4')
      )
    })
  })

  describe('getFreeGames', () => {
    it('should fetch free games', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse)
      })

      await rawgApi.getFreeGames()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('tags=free-to-play')
      )
    })
  })
})
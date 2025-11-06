import { describe, it, expect } from 'vitest'
import { gameUtils } from '../services/rawgApi'
import type { Game } from '../types/Game'

const mockGame: Game = {
  id: 1,
  slug: 'test-game',
  name: 'Test Game',
  name_original: 'Test Game',
  tba: false,
  updated: '2023-01-01T00:00:00Z',
  background_image: 'https://example.com/background.jpg',
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
  short_screenshots: [
    { id: 1, image: 'https://example.com/screenshot1.jpg' },
    { id: 2, image: 'https://example.com/screenshot2.jpg' }
  ],
  parent_platforms: [
    { platform: { id: 1, name: 'PC', slug: 'pc' } },
    { platform: { id: 2, name: 'PlayStation', slug: 'playstation' } }
  ],
  platforms: [
    { platform: { id: 1, name: 'PC', slug: 'pc' } },
    { platform: { id: 2, name: 'PlayStation 5', slug: 'playstation5' } }
  ],
  developers: [
    { id: 1, name: 'Test Developer', slug: 'test-developer' },
    { id: 2, name: 'Another Developer', slug: 'another-developer' }
  ],
  genres: [
    { id: 1, name: 'Action', slug: 'action' },
    { id: 2, name: 'Adventure', slug: 'adventure' }
  ],
  tags: [],
  publishers: [
    { id: 1, name: 'Test Publisher', slug: 'test-publisher' }
  ],
  released: '2023-12-15'
}

describe('gameUtils', () => {
  describe('getGameImage', () => {
    it('should return background_image when available', () => {
      const result = gameUtils.getGameImage(mockGame)
      expect(result).toBe('https://example.com/background.jpg')
    })

    it('should return first screenshot when background_image is not available', () => {
      const gameWithoutBackground = { ...mockGame, background_image: undefined }
      const result = gameUtils.getGameImage(gameWithoutBackground)
      expect(result).toBe('https://example.com/screenshot1.jpg')
    })

    it('should return empty string when no images are available', () => {
      const gameWithoutImages = { 
        ...mockGame, 
        background_image: undefined, 
        short_screenshots: [] 
      }
      const result = gameUtils.getGameImage(gameWithoutImages)
      expect(result).toBe('')
    })
  })

  describe('getPlatformNames', () => {
    it('should return platform names from parent_platforms', () => {
      const result = gameUtils.getPlatformNames(mockGame)
      expect(result).toEqual(['PC', 'PlayStation'])
    })

    it('should return empty array when parent_platforms is undefined', () => {
      const gameWithoutPlatforms = { ...mockGame, parent_platforms: undefined } as any
      const result = gameUtils.getPlatformNames(gameWithoutPlatforms)
      expect(result).toEqual([])
    })
  })

  describe('getGenreNames', () => {
    it('should return genre names', () => {
      const result = gameUtils.getGenreNames(mockGame)
      expect(result).toEqual(['Action', 'Adventure'])
    })

    it('should return empty array when genres is undefined', () => {
      const gameWithoutGenres = { ...mockGame, genres: undefined } as any
      const result = gameUtils.getGenreNames(gameWithoutGenres)
      expect(result).toEqual([])
    })
  })

  describe('getDeveloperNames', () => {
    it('should return developer names', () => {
      const result = gameUtils.getDeveloperNames(mockGame)
      expect(result).toEqual(['Test Developer', 'Another Developer'])
    })

    it('should return empty array when developers is undefined', () => {
      const gameWithoutDevelopers = { ...mockGame, developers: undefined } as any
      const result = gameUtils.getDeveloperNames(gameWithoutDevelopers)
      expect(result).toEqual([])
    })
  })

  describe('getPublisherNames', () => {
    it('should return publisher names', () => {
      const result = gameUtils.getPublisherNames(mockGame)
      expect(result).toEqual(['Test Publisher'])
    })

    it('should return empty array when publishers is undefined', () => {
      const gameWithoutPublishers = { ...mockGame, publishers: undefined } as any
      const result = gameUtils.getPublisherNames(gameWithoutPublishers)
      expect(result).toEqual([])
    })
  })

  describe('getFormattedReleaseDate', () => {
    it('should format valid date correctly', () => {
      const result = gameUtils.getFormattedReleaseDate(mockGame)
      expect(result).toBe('December 14, 2023')
    })

    it('should return "TBA" when released date is not available', () => {
      const gameWithoutReleaseDate = { ...mockGame, released: undefined }
      const result = gameUtils.getFormattedReleaseDate(gameWithoutReleaseDate)
      expect(result).toBe('TBA')
    })

    it('should return original string when date is invalid', () => {
      const gameWithInvalidDate = { ...mockGame, released: 'invalid-date' }
      const result = gameUtils.getFormattedReleaseDate(gameWithInvalidDate)
      expect(result).toBe('Invalid Date')
    })
  })

  describe('getScreenshots', () => {
    it('should return screenshot URLs', () => {
      const result = gameUtils.getScreenshots(mockGame)
      expect(result).toEqual([
        'https://example.com/screenshot1.jpg',
        'https://example.com/screenshot2.jpg'
      ])
    })

    it('should return empty array when short_screenshots is undefined', () => {
      const gameWithoutScreenshots = { ...mockGame, short_screenshots: undefined } as any
      const result = gameUtils.getScreenshots(gameWithoutScreenshots)
      expect(result).toEqual([])
    })
  })
})
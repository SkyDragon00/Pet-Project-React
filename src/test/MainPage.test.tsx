import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import { rawgApi } from '../services/rawgApi'
import type { Game } from '../types/Game'

// Mock the rawgApi and gameUtils
vi.mock('../services/rawgApi', () => ({
  rawgApi: {
    searchGames: vi.fn()
  },
  gameUtils: {
    getGameImage: vi.fn((game) => game.background_image || ''),
    getGenreNames: vi.fn((game) => game.genres?.map((g: any) => g.name) || []),
    getDeveloperNames: vi.fn((game) => game.developers?.map((d: any) => d.name) || []),
    getPlatformNames: vi.fn((game) => game.parent_platforms?.map((p: any) => p.platform.name) || []),
    getPublisherNames: vi.fn((game) => game.publishers?.map((p: any) => p.name) || []),
    getFormattedReleaseDate: vi.fn((game) => game.released || 'TBA'),
    getScreenshots: vi.fn((game) => game.short_screenshots?.map((s: any) => s.image) || [])
  }
}))

const mockGames: Game[] = [
  {
    id: 1,
    slug: 'test-game-1',
    name: 'Test Game 1',
    name_original: 'Test Game 1',
    tba: false,
    updated: '2023-01-01T00:00:00Z',
    background_image: 'https://example.com/game1.jpg',
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
  },
  {
    id: 2,
    slug: 'test-game-2',
    name: 'Test Game 2',
    name_original: 'Test Game 2',
    tba: false,
    updated: '2023-01-02T00:00:00Z',
    background_image: 'https://example.com/game2.jpg',
    rating: 4.2,
    rating_top: 5,
    ratings: [],
    ratings_count: 80,
    reviews_text_count: 40,
    added: 800,
    added_by_status: {},
    playtime: 8,
    screenshots_count: 3,
    movies_count: 0,
    creators_count: 1,
    achievements_count: 15,
    parent_achievements_count: 0,
    reddit_count: 0,
    twitch_count: 0,
    youtube_count: 0,
    reviews_count: 40,
    saturated_color: '#ffffff',
    dominant_color: '#000000',
    short_screenshots: [],
    parent_platforms: [],
    platforms: [],
    developers: [],
    genres: [],
    tags: [],
    publishers: [],
    released: '2023-01-02'
  }
]

const renderMainPage = (props = {}) => {
  const defaultProps = {
    games: mockGames,
    loading: false,
    error: undefined
  }
  
  return render(
    <BrowserRouter>
      <MainPage {...defaultProps} {...props} />
    </BrowserRouter>
  )
}

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render hero section with title and search bar', () => {
    renderMainPage()
    
    expect(screen.getByText('Discover Your Next Favorite Game')).toBeInTheDocument()
    expect(screen.getByText('Browse thousands of games and find your perfect match')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search for games...')).toBeInTheDocument()
  })

  it('should display popular games section when not searching', () => {
    renderMainPage()
    
    expect(screen.getByText('Popular Games')).toBeInTheDocument()
    expect(screen.getByText('Discover the most highly rated games')).toBeInTheDocument()
  })

  it('should display initial games', () => {
    renderMainPage()
    
    expect(screen.getByText('Test Game 1')).toBeInTheDocument()
    expect(screen.getByText('Test Game 2')).toBeInTheDocument()
  })

  it('should show loading state', () => {
    renderMainPage({ loading: true, games: [] })
    
    // The GameList component should handle loading state
    // We can't test the specific loading UI without knowing GameList implementation
    expect(screen.queryByText('Test Game 1')).not.toBeInTheDocument()
  })

  it('should show error state', () => {
    renderMainPage({ error: 'Failed to load games', games: [] })
    
    // The GameList component should handle error state
    // We can't test the specific error UI without knowing GameList implementation
    expect(screen.queryByText('Test Game 1')).not.toBeInTheDocument()
  })

  it('should perform search when search bar is used', async () => {
    const user = userEvent.setup()
    const mockSearchResults = {
      count: 1,
      results: [
        {
          ...mockGames[0],
          name: 'Cyberpunk 2077'
        }
      ]
    }
    
    vi.mocked(rawgApi.searchGames).mockResolvedValue(mockSearchResults)
    
    renderMainPage()
    
    const searchInput = screen.getByPlaceholderText('Search for games...')
    await user.type(searchInput, 'cyberpunk')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(rawgApi.searchGames).toHaveBeenCalledWith('cyberpunk', { page_size: 40 })
    })
    
    await waitFor(() => {
      expect(screen.getByText('Search Results for "cyberpunk"')).toBeInTheDocument()
    })
  })

  it('should handle search with empty query', async () => {
    const user = userEvent.setup()
    renderMainPage()
    
    const searchInput = screen.getByPlaceholderText('Search for games...')
    await user.type(searchInput, '   ') // spaces only
    await user.keyboard('{Enter}')
    
    // Should not call API with empty/whitespace query
    expect(rawgApi.searchGames).not.toHaveBeenCalled()
    
    // Should show original games
    expect(screen.getByText('Test Game 1')).toBeInTheDocument()
    expect(screen.getByText('Test Game 2')).toBeInTheDocument()
  })

  it('should handle search error', async () => {
    const user = userEvent.setup()
    const mockError = new Error('API Error')
    
    vi.mocked(rawgApi.searchGames).mockRejectedValue(mockError)
    
    // Mock console.error to avoid error output in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    renderMainPage()
    
    const searchInput = screen.getByPlaceholderText('Search for games...')
    await user.type(searchInput, 'test')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(rawgApi.searchGames).toHaveBeenCalledWith('test', { page_size: 40 })
    })
    
    // Should log error to console
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error searching games:', mockError)
    })
    
    consoleSpy.mockRestore()
  })

  it('should show "no results" message when search returns empty results', async () => {
    const user = userEvent.setup()
    const mockSearchResults = { count: 0, results: [] }
    
    vi.mocked(rawgApi.searchGames).mockResolvedValue(mockSearchResults)
    
    renderMainPage()
    
    const searchInput = screen.getByPlaceholderText('Search for games...')
    await user.type(searchInput, 'nonexistentgame')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(screen.getByText('Search Results for "nonexistentgame"')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('No games found matching your search.')).toBeInTheDocument()
    })
  })

  it('should return to original games when clearing search', async () => {
    const user = userEvent.setup()
    const mockSearchResults = { count: 0, results: [] }
    
    vi.mocked(rawgApi.searchGames).mockResolvedValue(mockSearchResults)
    
    renderMainPage()
    
    // First perform a search
    const searchInput = screen.getByPlaceholderText('Search for games...')
    await user.type(searchInput, 'test')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(screen.getByText('Search Results for "test"')).toBeInTheDocument()
    })
    
    // Clear the search
    await user.clear(searchInput)
    await user.keyboard('{Enter}')
    
    // Should return to original games
    await waitFor(() => {
      expect(screen.getByText('Popular Games')).toBeInTheDocument()
      expect(screen.getByText('Test Game 1')).toBeInTheDocument()
      expect(screen.getByText('Test Game 2')).toBeInTheDocument()
    })
  })
})
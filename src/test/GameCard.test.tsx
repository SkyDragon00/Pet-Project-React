import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GameCard from '../components/GameCard'
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
    { id: 1, image: 'https://example.com/screenshot1.jpg' }
  ],
  parent_platforms: [
    { platform: { id: 1, name: 'PC', slug: 'pc' } },
    { platform: { id: 2, name: 'PlayStation', slug: 'playstation' } }
  ],
  platforms: [
    { platform: { id: 1, name: 'PC', slug: 'pc' } }
  ],
  developers: [
    { id: 1, name: 'Test Developer', slug: 'test-developer' }
  ],
  genres: [
    { id: 1, name: 'Action', slug: 'action' },
    { id: 2, name: 'Adventure', slug: 'adventure' },
    { id: 3, name: 'RPG', slug: 'rpg' }
  ],
  tags: [],
  publishers: [
    { id: 1, name: 'Test Publisher', slug: 'test-publisher' }
  ],
  released: '2023-12-15',
  metacritic: 85
}

const renderGameCard = (game = mockGame) => {
  return render(
    <BrowserRouter>
      <GameCard game={game} />
    </BrowserRouter>
  )
}

describe('GameCard', () => {
  it('should render game name', () => {
    renderGameCard()
    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })

  it('should render game image with correct alt text', () => {
    renderGameCard()
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://example.com/background.jpg')
    expect(image).toHaveAttribute('alt', 'Test Game')
  })

  it('should render metacritic score when available', () => {
    renderGameCard()
    expect(screen.getByText('85')).toBeInTheDocument()
  })

  it('should not render metacritic score when not available', () => {
    const gameWithoutMetacritic = { ...mockGame, metacritic: undefined }
    renderGameCard(gameWithoutMetacritic)
    expect(screen.queryByText('85')).not.toBeInTheDocument()
  })

  it('should render developer name', () => {
    renderGameCard()
    expect(screen.getByText('Test Developer')).toBeInTheDocument()
  })

  it('should render formatted release date', () => {
    renderGameCard()
    expect(screen.getByText('December 14, 2023')).toBeInTheDocument()
  })

  it('should render rating when available', () => {
    renderGameCard()
    expect(screen.getByText('4.5/5')).toBeInTheDocument()
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument()
  })

  it('should not render rating when not available', () => {
    const gameWithoutRating = { ...mockGame, rating: 0 }
    renderGameCard(gameWithoutRating)
    expect(screen.queryByText('4.5/5')).not.toBeInTheDocument()
  })

  it('should render first two genres as tags', () => {
    renderGameCard()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.queryByText('RPG')).not.toBeInTheDocument()
  })

  it('should render platforms', () => {
    renderGameCard()
    expect(screen.getByText('PC, PlayStation')).toBeInTheDocument()
  })

  it('should create correct link to game detail page', () => {
    renderGameCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/game/1')
  })

  it('should handle image error by setting fallback src', () => {
    renderGameCard()
    const image = screen.getByRole('img') as HTMLImageElement
    
    // Simulate image error
    const errorEvent = new Event('error')
    Object.defineProperty(errorEvent, 'target', {
      value: image,
      enumerable: true
    })
    
    image.dispatchEvent(errorEvent)
    expect(image.src).toContain('/placeholder-game.jpg')
  })

  it('should render without crashing when game data is minimal', () => {
    const minimalGame: Game = {
      ...mockGame,
      background_image: undefined,
      metacritic: undefined,
      developers: [],
      genres: [],
      rating: 0,
      released: undefined,
      parent_platforms: []
    }
    
    expect(() => renderGameCard(minimalGame)).not.toThrow()
    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })
})
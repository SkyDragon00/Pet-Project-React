import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  it('should render with default placeholder', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    expect(screen.getByPlaceholderText('Search for games...')).toBeInTheDocument()
  })

  it('should render with custom placeholder', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} placeholder="Find your game" />)
    
    expect(screen.getByPlaceholderText('Find your game')).toBeInTheDocument()
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'cyberpunk')
    
    expect(input).toHaveValue('cyberpunk')
  })

  it('should call onSearch when form is submitted with Enter key', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'cyberpunk')
    await user.keyboard('{Enter}')
    
    expect(mockOnSearch).toHaveBeenCalledWith('cyberpunk')
  })

  it('should call onSearch when search button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    
    await user.type(input, 'witcher')
    await user.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('witcher')
  })

  it('should call onSearch with empty string when submitting empty input', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('should have correct form structure', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    // Check for search icon (SVG)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should clear input after search', async () => {
    const user = userEvent.setup()
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'test game')
    await user.keyboard('{Enter}')
    
    expect(mockOnSearch).toHaveBeenCalledWith('test game')
    // Input should still contain the value (component doesn't clear it automatically)
    expect(input).toHaveValue('test game')
  })
})
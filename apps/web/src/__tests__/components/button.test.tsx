import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../utils/test-utils'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
  })

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>)

    const button = screen.getByRole('button', { name: /outline/i })
    expect(button).toHaveClass('border')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const { user } = render(<Button onClick={handleClick}>Click</Button>)

    const button = screen.getByRole('button', { name: /click/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)

    let button = screen.getByRole('button', { name: /small/i })
    expect(button).toHaveClass('h-8')

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button', { name: /large/i })
    expect(button).toHaveClass('h-10')
  })
})

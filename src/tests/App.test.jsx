import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders the header', () => {
    render(<App />)
    expect(screen.getByText(/PortfolioHub/i)).toBeInTheDocument()
  })

  it('shows initial projects', () => {
    render(<App />)
    expect(screen.getByText(/Blood Bank System/i)).toBeInTheDocument()
    expect(screen.getByText(/School Portal/i)).toBeInTheDocument()
    expect(screen.getByText(/E-Commerce Store/i)).toBeInTheDocument()
  })

  it('filters projects based on search input', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/Search projects/i)
    await userEvent.type(input, 'school')
    expect(screen.getByText(/School Portal/i)).toBeInTheDocument()
    expect(screen.queryByText(/Blood Bank System/i)).not.toBeInTheDocument()
  })

  it('adds a new project and clears the form', async () => {
    render(<App />)
    await userEvent.type(screen.getByPlaceholderText(/Project Title/i), 'My New App')
    await userEvent.type(screen.getByPlaceholderText(/Description/i), 'New project description')
    await userEvent.type(screen.getByPlaceholderText(/Category/i), 'Productivity')
    await userEvent.type(screen.getByPlaceholderText(/Technology/i), 'React')

    await userEvent.click(screen.getByRole('button', { name: /add project/i }))

    expect(screen.getByText(/My New App/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Project Title/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Description/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Category/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Technology/i)).toHaveValue('')
  })
})
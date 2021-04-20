import { render, screen, waitFor } from '@redwoodjs/testing'

import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Navigation />)
    }).not.toThrow()
  })
  it('renders login button wehn not logged in', () => {
    render(<Navigation />)
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument()
  })
  it('does not render a login button when logged in', async () => {
    mockCurrentUser({ name: 'Rob' })

    render(<Navigation />)

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Log in' })
      ).not.toBeInTheDocument()
    })
  })
  it('renders a welcome message when logged in', async () => {
    mockCurrentUser({ user_metadata: { full_name: 'Esteban' } })

    render(<Navigation />)

    expect(await screen.findByText('Welcome, Esteban')).toBeInTheDocument()
  })
  it('renders admin navitem when logged in with admin role', async () => {
    mockCurrentUser({
      user_metadata: { full_name: 'Esteban' },
      roles: ['admin'],
    })

    render(<Navigation />)
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Admin' })).toBeInTheDocument()
    })
  })
})

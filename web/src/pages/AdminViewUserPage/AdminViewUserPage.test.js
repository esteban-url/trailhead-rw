import { render } from '@redwoodjs/testing'

import AdminViewUserPage from './AdminViewUserPage'

describe('AdminViewUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminViewUserPage />)
    }).not.toThrow()
  })
})

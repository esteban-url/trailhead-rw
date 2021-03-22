import { render } from '@redwoodjs/testing'

import AdminUserPage from './AdminUserPage'

describe('AdminUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUserPage />)
    }).not.toThrow()
  })
})

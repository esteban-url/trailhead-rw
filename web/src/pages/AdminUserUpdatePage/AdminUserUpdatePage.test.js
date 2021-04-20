import { render } from '@redwoodjs/testing'

import AdminUserUpdatePage from './AdminUserUpdatePage'

describe('AdminUserUpdatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUserUpdatePage />)
    }).not.toThrow()
  })
})

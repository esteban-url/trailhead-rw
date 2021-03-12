import { render } from '@redwoodjs/testing'

import AdminUpdateUserPage from './AdminUpdateUserPage'

describe('AdminUpdateUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUpdateUserPage />)
    }).not.toThrow()
  })
})

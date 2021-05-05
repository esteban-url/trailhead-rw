import { render } from 'src/utils/testing'

import AdminUsersPage from './AdminUsersPage'

describe('AdminUsersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUsersPage />)
    }).not.toThrow()
  })
})

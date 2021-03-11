import { render } from '@redwoodjs/testing'

import AdminNewUserPage from './AdminNewUserPage'

describe('AdminNewUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewUserPage />)
    }).not.toThrow()
  })
})

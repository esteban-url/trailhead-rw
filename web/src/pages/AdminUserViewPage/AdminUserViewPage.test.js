import { render } from '@redwoodjs/testing'

import AdminUserViewPage from './AdminUserViewPage'

describe('AdminUserViewPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUserViewPage />)
    }).not.toThrow()
  })
})

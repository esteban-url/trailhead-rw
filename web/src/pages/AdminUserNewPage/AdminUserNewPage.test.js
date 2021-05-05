import { render } from 'src/utils/testing'

import AdminUserNewPage from './AdminUserNewPage'

describe('AdminUserNewPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUserNewPage />)
    }).not.toThrow()
  })
})

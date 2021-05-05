import { render } from 'src/utils/testing'
import AdminUserUpdatePage from './AdminUserUpdatePage'

describe('AdminUserUpdatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUserUpdatePage />)
    }).not.toThrow()
  })
})

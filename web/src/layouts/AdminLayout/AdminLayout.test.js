import { render } from 'src/utils/testing'

import AdminLayout from './AdminLayout'

describe('AdminLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminLayout />)
    }).not.toThrow()
  })
})

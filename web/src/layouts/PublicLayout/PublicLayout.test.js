import { render } from 'src/utils/testing'
import PublicLayout from './PublicLayout'

describe('PublicLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicLayout />)
    }).not.toThrow()
  })
})

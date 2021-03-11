import { render } from '@redwoodjs/testing'

import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Navigation />)
    }).not.toThrow()
  })
})

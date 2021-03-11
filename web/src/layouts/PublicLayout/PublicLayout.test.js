import { render } from '@redwoodjs/testing'

import PublicLayout from './PublicLayout'

describe('PublicLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicLayout />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing'

import Switch from './Switch'

describe('Switch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Switch />)
    }).not.toThrow()
  })
})

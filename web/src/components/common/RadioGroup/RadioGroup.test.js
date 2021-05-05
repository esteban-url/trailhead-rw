import { render } from '@redwoodjs/testing'

import RadioGroup from './RadioGroup'

describe('RadioGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RadioGroup />)
    }).not.toThrow()
  })
})

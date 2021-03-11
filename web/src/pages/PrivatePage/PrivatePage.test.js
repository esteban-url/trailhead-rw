import { render } from '@redwoodjs/testing'

import PrivatePage from './PrivatePage'

describe('PrivatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrivatePage />)
    }).not.toThrow()
  })
})

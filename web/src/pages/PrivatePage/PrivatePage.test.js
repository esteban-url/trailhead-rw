import { render } from 'src/utils/testing'

import PrivatePage from './PrivatePage'

describe('PrivatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrivatePage />)
    }).not.toThrow()
  })
})

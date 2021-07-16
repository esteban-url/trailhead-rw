import { render } from '@redwoodjs/testing'

import AvatarTypesRadio from './AvatarTypesRadio'

describe('AvatarTypesRadio', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AvatarTypesRadio />)
    }).not.toThrow()
  })
})

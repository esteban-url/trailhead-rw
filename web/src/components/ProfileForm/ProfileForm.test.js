import { render } from '@redwoodjs/testing'

import ProfileForm from './ProfileForm'

describe('ProfileForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileForm />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing'

import FormField from './FormField'

describe('FormField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormField />)
    }).not.toThrow()
  })
})

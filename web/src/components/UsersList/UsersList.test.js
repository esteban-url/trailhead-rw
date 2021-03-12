import { render } from '@redwoodjs/testing'

import UsersList from './UsersList'

describe('UsersList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersList />)
    }).not.toThrow()
  })
})

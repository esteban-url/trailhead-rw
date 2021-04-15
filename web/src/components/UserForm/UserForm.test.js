import { render, screen } from '@redwoodjs/testing'
import { user } from './UserForm.mock'

import UserForm from './UserForm'

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserForm />)
    }).not.toThrow()
  })
  it('renders user correctly', () => {
    render(<UserForm {...user()} />)
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
      user().user.email
    )
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
      user().user.user_metadata.full_name
    )
    expect(
      screen.getByRole('checkbox', { name: /reset password/i })
    ).toBeInTheDocument()
  })
  it('renders user correctly', () => {
    render(<UserForm {...user()} />)
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
      user().user.email
    )
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
      user().user.user_metadata.full_name
    )
    expect(
      screen.getByRole('checkbox', { name: /reset password/i })
    ).toBeInTheDocument()
  })
  it('renders can save a user', () => {
    render(<UserForm {...user()} />)
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
      user().user.email
    )
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
      user().user.user_metadata.full_name
    )
    expect(
      screen.getByRole('checkbox', { name: /reset password/i })
    ).toBeInTheDocument()
  })
})

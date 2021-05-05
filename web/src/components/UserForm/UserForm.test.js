import { render, screen, waitFor } from '@redwoodjs/testing'
import userEvent from '@testing-library/user-event'
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
      screen.getByRole('switch', { name: /reset password/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /save user/i })
    ).toBeInTheDocument()
  })
  it('password is initially hidden when editing user', () => {
    render(<UserForm {...user()} />)

    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument()
  })
  it('shows password field when reseting password', () => {
    render(<UserForm {...user()} />)

    const resetPasswordSwitch = screen.getByRole('switch', {
      name: /reset password/i,
    })

    expect(resetPasswordSwitch).toBeInTheDocument()

    userEvent.click(resetPasswordSwitch)

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })
  it('shows error when name is empty', async () => {
    render(<UserForm />)

    const saveButton = screen.getByRole('button', { name: /save user/i })

    expect(saveButton).toBeInTheDocument()

    userEvent.click(saveButton)

    await waitFor(() => screen.queryByText(/name is required/i))

    expect(screen.queryByText(/name is required/i)).toBeInTheDocument()
  })
  it('shows error when email is empty', async () => {
    render(<UserForm />)

    const saveButton = screen.getByRole('button', { name: /save user/i })

    expect(saveButton).toBeInTheDocument()

    userEvent.click(saveButton)

    await waitFor(() => screen.queryByText(/email is required/i))

    expect(screen.queryByText(/email is required/i)).toBeInTheDocument()
  })
  it('shows error when password is empty', async () => {
    render(<UserForm />)

    const saveButton = screen.getByRole('button', { name: /save user/i })

    expect(saveButton).toBeInTheDocument()

    userEvent.click(saveButton)

    await waitFor(() => screen.queryByText(/password is required/i))

    expect(screen.queryByText(/password is required/i)).toBeInTheDocument()
  })

  it('triggers onSave when creating user', async () => {
    const mockUser = {
      id: undefined,
      email: 'fake@email.com',
      password: 'fakePassword',
      user_metadata: { full_name: 'Ada Lovelace' },
    }
    const handleSubmit = jest.fn()
    render(<UserForm onSave={handleSubmit} />)

    const nameField = screen.getByRole('textbox', {
      name: /name/i,
    })
    const emailField = screen.getByRole('textbox', {
      name: /email address/i,
    })
    const passwordField = screen.getByLabelText(/password/i)

    await waitFor(() =>
      userEvent.type(nameField, mockUser.user_metadata.full_name)
    )
    await waitFor(() => userEvent.type(emailField, mockUser.email))
    await waitFor(() => userEvent.type(passwordField, mockUser.password))

    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: /save user/i }))
    )

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toBeCalledWith(mockUser)
  })

  it('triggers onSave when updating a user', async () => {
    const mockUser = {
      email: 'fake@email.com',
    }
    const handleSubmit = jest.fn()
    render(<UserForm {...user()} onSave={handleSubmit} />)

    const emailField = screen.getByRole('textbox', {
      name: /email address/i,
    })

    await waitFor(() => userEvent.clear(emailField))
    await waitFor(() => userEvent.type(emailField, mockUser.email))

    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: /save user/i }))
    )

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toBeCalledWith({
      ...user().user,
      email: mockUser.email,
    })
  })
})

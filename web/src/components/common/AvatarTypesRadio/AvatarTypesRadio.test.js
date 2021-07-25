import { render, screen, waitFor } from '@redwoodjs/testing'
import userEvent from '@testing-library/user-event'

import { standard } from './AvatarTypesRadio.mock'
import AvatarTypesRadio from './AvatarTypesRadio'

describe('AvatarTypesRadio', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AvatarTypesRadio />)
    }).not.toThrow()
  })
  it('renders avatars', () => {
    render(<AvatarTypesRadio {...standard()} />)

    expect(screen.getByText(/marble/i)).toBeInTheDocument()
    expect(screen.getByText(/beam/i)).toBeInTheDocument()
    expect(screen.getByText(/pixel/i)).toBeInTheDocument()
    expect(screen.getByText(/sunset/i)).toBeInTheDocument()
    expect(screen.getByText(/bauhaus/i)).toBeInTheDocument()
    expect(screen.getByText(/ring/i)).toBeInTheDocument()
  })
  it('has selected value', async () => {
    render(<AvatarTypesRadio {...standard()} defaultValue={{ name: 'ring' }} />)
    await waitFor(() => screen.getByText(/ring/i))
    expect(screen.getByTestId('ring')).toBeInTheDocument()
  })
  it('changes the selected value', () => {
    const onChange = jest.fn()
    render(<AvatarTypesRadio {...standard()} onChange={onChange} />)

    const bauhaus = screen.getByText(/bauhaus/i)

    expect(bauhaus).toBeInTheDocument()

    userEvent.click(bauhaus)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toBeCalledWith({ name: 'bauhaus' })
  })
})

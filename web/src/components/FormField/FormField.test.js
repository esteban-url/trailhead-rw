import { CheckboxField, Form, TextField } from '@redwoodjs/forms'
import { render, screen } from '@redwoodjs/testing'

import FormField from './FormField'

describe('FormField', () => {
  it('renders as textfield', () => {
    render(
      <Form>
        <FormField as={TextField} name="Name" label="Full Name" />
      </Form>
    )
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  it('renders as checkbox', () => {
    render(
      <Form>
        <FormField as={CheckboxField} name="Name" label="Full Name" />
      </Form>
    )
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
})

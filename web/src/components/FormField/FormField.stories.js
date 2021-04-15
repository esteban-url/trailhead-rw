import { CheckboxField, Form, TextField } from '@redwoodjs/forms'
import FormField from './FormField'

export const textbox = () => {
  return (
    <Form>
      <FormField as={TextField} label="Full name" name="Name" />
    </Form>
  )
}
export const checkbox = () => {
  return (
    <Form>
      <FormField as={CheckboxField} label="Active" name="Active" />
    </Form>
  )
}

export default { title: 'Components/FormField' }

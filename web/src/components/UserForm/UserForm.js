import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CheckboxField,
  EmailField,
  Form,
  PasswordField,
  Submit,
  TextField,
} from '@redwoodjs/forms/dist'
import FormField from 'src/components/FormField/FormField'

const UserForm = ({ user, onSave, error, loading }) => {
  const [resetPassword, setResetPassword] = useState()
  const { register } = useForm({
    defaultValues: user
      ? {
          name: user?.user_metadata?.full_name,
          email: user?.email,
          admin: user?.app_metadata?.roles?.includes('admin'),
          other: user?.app_metadata?.roles?.includes('other'),
        }
      : {},
  })

  const handleSubmit = (data) => {
    let roles = []
    if (data.admin) roles = [...roles, 'admin']
    if (data.other) roles = [...roles, 'other']
    const updatedUser = {
      id: user?.id,
      email: data.email,
      password: data.password,
      user_metadata: { full_name: data.name },
      app_metadata: { roles: roles },
    }
    onSave(updatedUser)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        as={TextField}
        name="name"
        label="Name"
        register={register}
        validation={{ required: true }}
      />
      <FormField
        as={EmailField}
        name="email"
        label="Email Address"
        register={register}
        validation={{
          required: true,
        }}
      />

      {user ? (
        <FormField
          as={CheckboxField}
          name="resetPassword"
          label="Reset Password"
          register={register}
          onClick={() => setResetPassword(!resetPassword)}
        />
      ) : null}
      {!user || resetPassword ? (
        <FormField
          as={PasswordField}
          name="password"
          label="Password"
          register={register}
          validation={{ required: true }}
        />
      ) : null}
      {user ? (
        <div>
          <FormField
            as={CheckboxField}
            name="admin"
            label="Admin role"
            register={register}
          />
          <FormField
            as={CheckboxField}
            name="other"
            label="Other role"
            register={register}
          />
        </div>
      ) : null}
      {error ? <span>{error.message}</span> : null}
      {loading ? <span>loading</span> : null}
      <Submit disabled={loading}>Save User</Submit>
    </Form>
  )
}

export default UserForm

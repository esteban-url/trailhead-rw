import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  EmailField,
  Form,
  PasswordField,
  Submit,
  TextField,
} from '@redwoodjs/forms/dist'
import FormField from 'src/components/common/FormField/FormField'
import { navigate, routes } from '@redwoodjs/router'
import RadioGroup from 'src/components/common/RadioGroup/RadioGroup'
import Switch from '../common/Switch/Switch'
import Button from '../common/Button/Button'

const roles = [
  {
    name: 'Regular user role',
    description:
      'This is a regular user, no special privileges will be granted.',
    value: 'user',
  },
  {
    name: 'Admin role',
    description: 'This user will have acces to the administraction features.',
    value: 'admin',
  },
]

const UserForm = ({ user, onSave, error, loading }) => {
  const [manuallyResetPassword, setManuallyResetPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState(() =>
    roles.find((x) => user?.app_metadata?.roles.includes(x.value))
  )
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
    const updatedUser = {
      id: user?.id,
      email: data.email,
      user_metadata: { full_name: data.name },
    }
    if (selectedRole) {
      updatedUser.app_metadata = { roles: [selectedRole.value] }
    }
    if (data.password) {
      updatedUser.password = data.password
    }
    onSave(updatedUser)
  }
  const handleCancel = () => {
    navigate(routes.adminUsers())
  }
  const handleRoleChange = (option) => {
    setSelectedRole(option.value)
  }
  const handleManualPassword = () => {
    console.log('holi ')
    setManuallyResetPassword(!manuallyResetPassword)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
          <>
            <FormField label="Role">
              <RadioGroup
                options={roles}
                label="role"
                defaultValue={selectedRole}
                onChange={handleRoleChange}
              />
            </FormField>
            <div className="bg-gray-50 sm:rounded-lg sm:col-span-4">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="leading-3 font-medium text-gray-900">
                  Resetting the password?
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    You can send an email to this user so they reset the
                    password on their own.
                  </p>
                  <div className="my-4">
                    <Button
                      onClick={() => alert('no implemented yet!')}
                      type="basic"
                    >
                      Let the user reset their own password
                    </Button>
                  </div>
                  <p>
                    Are you sure you want to manually reset the user's password?
                  </p>
                </div>
                <div className="mt-5">
                  <Button onClick={handleManualPassword} type="basic">
                    Yes, manually reset password
                  </Button>
                  {manuallyResetPassword ? (
                    <FormField
                      as={PasswordField}
                      name="password"
                      label="New password"
                      className="sm:col-span-4 mt-4"
                      register={register}
                      validation={{ required: true }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : null}
        {!user ? (
          <FormField
            as={PasswordField}
            name="password"
            label="Password"
            className="sm:col-span-4"
            register={register}
            validation={{ required: true }}
          />
        ) : null}

        {error ? <span>{error.message}</span> : null}
        {loading ? <span>saving</span> : null}
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <Submit
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={loading}
          >
            Save User
          </Submit>
        </div>
      </div>
    </Form>
  )
}

export default UserForm

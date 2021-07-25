import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailField, Form, PasswordField, TextField } from '@redwoodjs/forms'
import FormField from 'src/components/common/FormField/FormField'
import { navigate, routes } from '@redwoodjs/router'
import RadioGroup from 'src/components/common/RadioGroup/RadioGroup'
import { Button, Submit } from '../common/Button/Button'
import AvatarTypesRadio from '../common/AvatarTypesRadio/AvatarTypesRadio'
const roles = [
  {
    name: 'Regular user role',
    description:
      'This is a regular user, no special privileges will be granted.',
    value: 'user',
  },
  {
    name: 'Admin user role',
    description: 'This user will have acces to the administraction features.',
    value: 'admin',
  },
]
const avatarTypes = [
  { name: 'marble' },
  { name: 'beam' },
  { name: 'pixel' },
  { name: 'sunset' },
  { name: 'bauhaus' },
  { name: 'ring' },
]

const UserForm = ({ user, onSave, error, loading }) => {
  const [manuallyResetPassword, setManuallyResetPassword] = useState(false)
  const [selectedAvatarType, setSelectedAvatarType] = useState(() =>
    avatarTypes.find((x) => x.name === user?.user_metadata?.avatar_type)
  )
  const [selectedRole, setSelectedRole] = useState(() =>
    roles.find((x) => user?.app_metadata?.roles?.includes(x.value))
  )
  const { register } = useForm({
    defaultValues: user
      ? {
          name: user?.user_metadata?.full_name,
          email: user?.email,
          admin: user?.app_metadata?.roles?.includes('admin'),
          user: user?.app_metadata?.roles?.includes('user'),
        }
      : {},
  })

  const handleSubmit = (data) => {
    const updatedUser = {
      id: user?.id,
      email: data.email,
      user_metadata: {
        full_name: data.name,
        avatar_type: selectedAvatarType?.name,
      },
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
    setSelectedRole(option)
  }
  const handleAvatarTypeChange = (option) => {
    console.log(option)
    setSelectedAvatarType(option)
  }
  const handleManualPassword = () => {
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
        <FormField label="Avatar">
          <AvatarTypesRadio
            options={avatarTypes}
            user={user}
            defaultValue={selectedAvatarType}
            onChange={handleAvatarTypeChange}
          />
        </FormField>
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
            <div className="bg-gray-50 rounded-lg sm:col-span-6">
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
                    <Button onClick={() => alert('no implemented yet!')}>
                      Let the user reset their own password
                    </Button>
                  </div>
                  <p>
                    Are you sure you want to manually reset the user&apos;s
                    password?
                  </p>
                </div>
                <div className="mt-5">
                  <Button onClick={handleManualPassword} variant="basic">
                    {`${
                      manuallyResetPassword ? "Nevermind, don't" : 'Yes,'
                    } manually reset the password`}
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
            register={register}
            validation={{ required: true }}
          />
        ) : null}

        {error ? <span>{error.message}</span> : null}
        {loading ? <span>saving</span> : null}
      </div>

      <div className="pt-5">
        <div className="flex justify-end space-x-4">
          <Button onClick={handleCancel}>Cancel</Button>
          <Submit variant="primary" disabled={loading}>
            Save User
          </Submit>
        </div>
      </div>
    </Form>
  )
}

export default UserForm

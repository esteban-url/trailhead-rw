import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailField, Form, PasswordField, TextField } from '@redwoodjs/forms'
import FormField from 'src/components/common/FormField/FormField'
import { navigate, routes } from '@redwoodjs/router'
import RadioGroup from 'src/components/common/RadioGroup/RadioGroup'
import { Button, Submit } from '../common/Button/Button'
import { RadioGroup as HUIRadioGroup } from '@headlessui/react'
import Avatar from 'boring-avatars'
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
    avatarTypes.find((x) => user?.user_metadata?.avatar_type === x.name)
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
        avatar_type: selectedAvatarType?.name || 'beam',
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

const AvatarTypesRadio = ({ user, options, defaultValue, onChange }) => {
  const [selected, setSelected] = useState(
    () => options.find((x) => x.name === defaultValue?.name) || options[1]
  )

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <HUIRadioGroup value={selected} onChange={setSelected}>
      <HUIRadioGroup.Label className="sr-only">Avatar Type</HUIRadioGroup.Label>
      <div className="flex justify-items-center w-full  space-x-4">
        {options.map((avatarType) => (
          <HUIRadioGroup.Option
            key={avatarType.name}
            value={avatarType}
            className={({ active }) =>
              classNames(
                active ? 'ring-1 ring-offset-2 ring-primary-500' : '',
                'relative block rounded-full border border-gray-300 bg-white shadow-sm p-1.5 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <HUIRadioGroup.Label className="text-center font-medium text-gray-900">
                      <Avatar
                        className="w-16 h-16"
                        name={user?.email || 'new user'}
                        variant={avatarType.name}
                      />
                      <span className="sr-only">{avatarType.name}</span>
                    </HUIRadioGroup.Label>
                  </div>
                </div>
                <div
                  className={classNames(
                    checked ? 'border-primary-500' : 'border-transparent',
                    'absolute -inset-px rounded-full border-2 pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </HUIRadioGroup.Option>
        ))}
      </div>
    </HUIRadioGroup>
  )
}
export default UserForm

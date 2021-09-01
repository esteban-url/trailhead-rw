import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailField, Form, TextField } from '@redwoodjs/forms'
import FormField from 'src/components/common/FormField/FormField'
import { navigate, routes } from '@redwoodjs/router'
import { Button, Submit } from '../common/Button/Button'
import AvatarTypesRadio from '../common/AvatarTypesRadio/AvatarTypesRadio'

const avatarTypes = [
  { name: 'marble' },
  { name: 'beam' },
  { name: 'pixel' },
  { name: 'sunset' },
  { name: 'bauhaus' },
  { name: 'ring' },
]

const ProfileForm = ({ user, onSave, onPasswordReset, error, loading }) => {
  const [selectedAvatarType, setSelectedAvatarType] = useState(() =>
    avatarTypes.find((x) => x.name === user?.user_metadata?.avatar_type)
  )

  const { register } = useForm({
    defaultValues: user
      ? {
          name: user?.user_metadata?.full_name,
          email: user?.email,
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

    if (data.password) {
      updatedUser.password = data.password
    }
    onSave(updatedUser)
  }
  const handleCancel = () => {
    navigate(routes.profile())
  }

  const handleAvatarTypeChange = (option) => {
    setSelectedAvatarType(option)
  }

  const handleResetPassword = () => {
    onPasswordReset()
  }

  return (
    <>
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
          {user ? <></> : null}

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

      <div className="mt-8 bg-gray-50 rounded-lg sm:col-span-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="leading-3 font-medium text-gray-900">
            Resetting your password?
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>We will send you an email with a link to reset you password</p>
          </div>
          <div className="mt-5">
            <Button onClick={handleResetPassword} variant="basic">
              Yes, I want to reset my password
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileForm

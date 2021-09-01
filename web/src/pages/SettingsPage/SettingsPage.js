import { Link, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { useAuth } from '@redwoodjs/auth'
import { PageTitle } from 'src/utils/PageTitle'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { ExclamationIcon } from '@heroicons/react/outline'
const SettingsPage = () => {
  const { currentUser, client } = useAuth()
  const [done, setDone] = useState()
  const handlePasswordReset = () => {
    client.gotrue.requestPasswordRecovery(currentUser.email)
  }
  const handleChange = (user) => {
    const updatePromise = client.gotrue
      .currentUser()
      .update({ email: user.email, data: user.user_metadata })
      .then(setDone(true))

    toast.promise(updatePromise, {
      loading: <h1 className="bg-primary-600">asdasd</h1>,
      success: 'User successfuly updated!',
      error: 'Unable to save changes',
    })
    // TODO: refresh user so they dont have to log out and back in
  }
  return (
    <>
      <PageTitle>Settings</PageTitle>
      <div className="bg-white pr-4 py-5 border-b border-gray-200 sm:pr-6 mb-8">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Avatar
                  className="h-16 w-16 rounded-full"
                  name={currentUser.email}
                  variant={currentUser.user_metadata.avatar_type || 'beam'}
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentUser.user_metadata.full_name}
                </h3>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {done ? (
        <Banner />
      ) : (
        <ProfileForm
          user={currentUser}
          onSave={handleChange}
          onPasswordReset={handlePasswordReset}
        />
      )}
    </>
  )
}

const Banner = () => {
  return (
    <div className=" flex flex-col justify-center text-gray-600">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="h-12 w-12 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 text-sm text-yellow-700">
            <p className="font-bold text-lg">Good news!</p>
            <p>We&apos;ve successfuly saved the changes to your profile!</p>
            <p className="font-bold mt-4">Not so good news:</p>{' '}
            <p>
              If you want to see the changes right away, you need to sign out an
              sign back in.
            </p>
            <p className="mt-2">
              We know how annpying this is, we hope to fix it soon, promise!
            </p>
            <p className="mt-4">
              <Link
                to={routes.login()}
                className="font-medium underline text-yellow-700 hover:text-yellow-600"
              >
                Click here to sign out and go to the login page
              </Link>
              , or you can go back to{' '}
              <Link
                to={routes.profile()}
                className="font-medium underline text-yellow-700 hover:text-yellow-600"
              >
                your profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

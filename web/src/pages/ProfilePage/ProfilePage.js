import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  return (
    <div className="mt-8 mb-96">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <Avatar
                className="h-32 w-32 rounded-full"
                name={currentUser.email}
                variant={currentUser.user_metadata.avatar_type || 'beam'}
              />

              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentUser.user_metadata.full_name}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Member since{' '}
              <time dateTime={currentUser.created_at}>
                {currentUser.created_at}
              </time>
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <Link
            to={routes.settings()}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
          >
            Edit profile
          </Link>
          {/* <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
          >
            Advance to offer
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

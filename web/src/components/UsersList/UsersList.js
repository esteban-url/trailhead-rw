import { Link, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import {
  MailIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline'
const UsersList = ({ users }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.email}>
            <Link
              className="block hover:bg-gray-50"
              to={routes.adminUserView({ id: user.id })}
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar
                      className="h-12 w-12 rounded-full"
                      variant={user.user_metadata.avatar_type || 'beam'}
                      name={user.email}
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {user.user_metadata.full_name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MailIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{user.email}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <ShieldCheckIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                          {user.app_metadata.roles?.length > 0
                            ? user.app_metadata.roles[0]
                            : 'user'}
                        </p>
                        <p className="text-sm text-gray-900">
                          Member since{' '}
                          <time dateTime={user.created_at}>
                            {user.created_at}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList

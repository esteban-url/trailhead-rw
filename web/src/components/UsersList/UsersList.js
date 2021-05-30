import { Link, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import Button from '../common/Button/Button'
import { TrashIcon } from '@heroicons/react/outline'
const UsersList = ({ users, onDelete }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar variant={`beam`} name={user.email} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.user_metadata.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.title}</div>
                      <div className="text-sm text-gray-500">
                        {user.department}
                      </div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.app_metadata?.roles
                        ? user.app_metadata.roles.map((role) => (
                            // inline styles to be removed
                            <span key={role} style={{ marginRight: '1rem' }}>
                              {role}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-4">
                      <Button
                        type="delete"
                        size="xs"
                        onClick={() => onDelete(user)}
                      >
                        <TrashIcon className="h-4 " />
                      </Button>

                      <Link
                        to={routes.adminUserView({ id: user.id })}
                        className="text-primary-600 hover:text-primary-900 py-1.5"
                      >
                        View
                      </Link>
                      <Link
                        to={routes.adminUserUpdate({ id: user.id })}
                        className="text-primary-600 hover:text-primary-900  py-1.5"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList

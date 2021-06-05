import { routes } from '@redwoodjs/router'
import { LinkButton } from '../common/Button/Button'
import UsersList from '../UsersList/UsersList'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      email
      created_at
      user_metadata {
        full_name
        avatar_type
      }
      app_metadata {
        roles
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ users }) => {
  return (
    <>
      <div className="bg-white px-1 py-5 border-b border-gray-200 sm:px-0 mb-8 ">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Users List
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <LinkButton to={routes.adminUserNew()} variant="primary">
              Create new user
            </LinkButton>
          </div>
        </div>
      </div>
      <UsersList users={users} />
    </>
  )
}

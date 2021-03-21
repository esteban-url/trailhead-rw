import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      email
      user_metadata {
        full_name
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
    <ul>
      {users?.map((user) => (
        <li key={user.email}>
          {/* // inline styles to be removed */}
          <span style={{ marginRight: '1rem' }}>
            {user.user_metadata.full_name} - {user.email}
          </span>

          {user.app_metadata?.roles
            ? user.app_metadata.roles.map((role) => (
                // inline styles to be removed
                <span key={role} style={{ marginRight: '1rem' }}>
                  {' '}
                  {role}{' '}
                </span>
              ))
            : null}
          {/* // inline styles to be removed */}
          <Link
            to={routes.adminViewUser({ id: user.id })}
            style={{ marginRight: '1rem' }}
          >
            {' '}
            view{' '}
          </Link>
          <Link to={routes.adminUpdateUser({ id: user.id })}> edit </Link>
        </li>
      ))}
    </ul>
  )
}

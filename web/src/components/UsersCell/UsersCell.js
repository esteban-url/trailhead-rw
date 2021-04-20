import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_USER = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id)
  }
`
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
  const [deleteUser, { error }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      navigate(routes.adminUsers())
      toast.success('User successfuly deleted')
    },
    onError: () => {
      toast.error(`the user could not be deleted.`)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onDelete = (user) => {
    if (confirm(`Are you sure you want to delete ${user.email}?`)) {
      deleteUser({ variables: { id: user.id } })
    }
  }
  return (
    <>
      {error ? <div>{error}</div> : null}
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
                    {role}
                  </span>
                ))
              : null}
            {/* // inline styles to be removed */}
            <Link
              to={routes.adminUserView({ id: user.id })}
              style={{ marginRight: '1rem' }}
            >
              view
            </Link>
            {/* // inline styles to be removed */}
            <Link
              to={routes.adminUserUpdate({ id: user.id })}
              style={{ marginRight: '1rem' }}
            >
              edit
            </Link>
            <button onClick={() => onDelete(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

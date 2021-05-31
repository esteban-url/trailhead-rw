import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import UsersList from '../UsersList/UsersList'

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
      <UsersList users={users} onDelete={onDelete} />
    </>
  )
}

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import UserForm from '../UserForm/UserForm'

export const QUERY = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      email
      user_metadata {
        full_name
      }
      app_metadata {
        roles
        created_by
        lastUpdated_by
      }
      created_at
      updated_at
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ user, update = false }) => {
  const [createUser, { error, loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      navigate(routes.adminUsers())
      toast.success('User successfuly updated')
    },
    onError: () => {
      toast.error(`the user could not be updated.`)
    },
  })
  const onSave = (user) => {
    createUser({ variables: { id: user.id, input: user } })
  }
  return update ? (
    <UserForm user={user} onSave={onSave} error={error} loading={loading} />
  ) : (
    <>
      <h3>{user.user_metadata.full_name}</h3>
      <p>Email: {user.email}</p>
      <p>Created: {user?.created_at?.toISOString()}</p>
      <p>Updated: {user?.updated_at?.toISOString()}</p>
      <p>Created by: {user.app_metadata?.created_by}</p>
      <p>Last Updated by: {user.app_metadata?.lastUpdated_by}</p>
      <p>Confirmed at: {user.confirmated_at?.toISOString()}</p>
      <p>Confirmation sent at: {user.confirmation_sent_at?.toISOString()}</p>
    </>
  )
}

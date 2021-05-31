import { navigate, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { PageTitle } from 'src/utils/PageTitle'
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
  const DataField = ({ label, children }) => {
    if (!children) return null
    return (
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{children}</dd>
      </div>
    )
  }
  return update ? (
    <UserForm user={user} onSave={onSave} error={error} loading={loading} />
  ) : (
    <>
      <PageTitle>{user.user_metadata.full_name}</PageTitle>

      <div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Avatar className="h-16 w-16" name={user.email} variant="beam" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {user.user_metadata.full_name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <DataField label="Full name">
              {user.user_metadata.full_name}
            </DataField>
            <DataField label="Email">{user.email}</DataField>
            <DataField label="Created">{user.created_at}</DataField>
            <DataField label="Updated">{user.updated_at}</DataField>
            <DataField label="Created by">
              {user.app_metadata.created_by}
            </DataField>
            <DataField label="Last Updated by">
              {user.app_metadata.lastUpdated_by}
            </DataField>
            <DataField label="Confirmed at">{user.confirmed_at}</DataField>
            <DataField label="Confirmation sent at:">
              {user.confirmation_sent_at}
            </DataField>
          </dl>
        </div>
      </div>
    </>
  )
}

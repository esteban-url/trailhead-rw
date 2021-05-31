import { navigate, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { PageTitle } from 'src/utils/PageTitle'
import UserForm from '../UserForm/UserForm'
import { Button, LinkButton } from '../common/Button/Button'

export const QUERY_USERS = gql`
  query UsersQuery {
    users {
      id
      email
      created_at
      user_metadata {
        full_name
      }
      app_metadata {
        roles
      }
    }
  }
`
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
const DELETE_USER = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id)
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
  const [deleteUser, { error: deleteError }] = useMutation(DELETE_USER, {
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
    refetchQueries: [{ query: QUERY_USERS }],
    awaitRefetchQueries: true,
  })
  const onDelete = (user) => {
    if (confirm(`Are you sure you want to delete ${user.email}?`)) {
      deleteUser({ variables: { id: user.id } })
    }
  }

  const [updateUser, { error, loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success('User successfuly updated')
      navigate(routes.adminUsers())
    },
    onError: () => {
      toast.error(`the user could not be updated.`)
    },

    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY_USERS }],
    awaitRefetchQueries: true,
  })

  const onSave = (user) => {
    console.log(user)
    updateUser({ variables: { id: user.id, input: user } })
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
  return (
    <>
      <PageTitle>{user.user_metadata.full_name}</PageTitle>
      {deleteError ? <div>{JSON.stringify(deleteError)}</div> : null}

      <div>
        <div className="bg-white pr-4 py-5 border-b border-gray-200 sm:pr-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Avatar
                    className="h-16 w-16 rounded-full"
                    name={user.email}
                    variant="beam"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {user.user_metadata.full_name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0 flex">
              {update ? (
                <LinkButton to={routes.adminUserView({ id: user.id })}>
                  View User
                </LinkButton>
              ) : (
                <LinkButton to={routes.adminUserUpdate({ id: user.id })}>
                  Edit User
                </LinkButton>
              )}
            </div>
          </div>
        </div>
        {update ? (
          <>
            <UserForm
              user={user}
              onSave={onSave}
              error={error}
              loading={loading}
            />
            <div className="bg-red-50 border border-red-500 rounded-lg mt-6">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete this user
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Deleting a user is an irreversible action.</p>
                </div>
                <div className="mt-5">
                  <Button onClick={() => onDelete(user)} variant="delete">
                    Delete user
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-4">
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
        )}
      </div>
    </>
  )
}

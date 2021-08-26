import { navigate, routes } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { useAuth } from '@redwoodjs/auth'
import { PageTitle } from 'src/utils/PageTitle'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

const UPDATE_OWN_USER = gql`
  mutation UpdateOwnUserMutation($input: UpdateUserInput!) {
    updateOwnUser(input: $input) {
      id
    }
  }
`

const SettingsPage = () => {
  const { currentUser } = useAuth()

  const [updateUser, { error, loading }] = useMutation(UPDATE_OWN_USER, {
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
    // refetchQueries: [{ query: QUERY_USERS }],
    awaitRefetchQueries: true,
  })

  const handleChange = (user) => {
    updateUser({ variables: { id: user.id, input: user } })
    console.log(user)
  }
  return (
    <>
      <PageTitle>Settings</PageTitle>
      <div className="bg-white pr-4 py-5 border-b border-gray-200 sm:pr-6 mb-8">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Avatar
                  className="h-16 w-16 rounded-full"
                  name={currentUser.email}
                  variant={currentUser.user_metadata.avatar_type || 'beam'}
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentUser.user_metadata.full_name}
                </h3>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileForm user={currentUser} onSave={handleChange} />
    </>
  )
}

export default SettingsPage

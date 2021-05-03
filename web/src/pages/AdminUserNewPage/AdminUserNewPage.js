import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import UserForm from 'src/components/UserForm/UserForm'
import { PageTitle } from 'src/utils/PageTitle'

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`
const AdminUserNewPage = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      navigate(routes.adminUsers())
      toast.success('User successfuly created')
    },
    onError: () => {
      toast.error(`The user could not be created.`)
    },
  })
  const onCreate = (user) => {
    createUser({ variables: { input: user } })
  }
  return (
    <>
      <PageTitle>New user</PageTitle>

      <UserForm onSave={onCreate} error={error} loading={loading} />
    </>
  )
}

export default AdminUserNewPage

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import UserForm from 'src/components/UserForm/UserForm'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`
const AdminUserNewPage = () => {
  const [createUser, { error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      navigate(routes.adminUsers())
      toast.success('User successfuly created')
    },
    onError: () => {
      toast.error(`the user could not be deleted: ${error}`)
    },
  })
  const onCreate = (user) => {
    console.log(user)
    createUser({ variables: { input: user } })
  }
  return (
    <AdminLayout>
      <Link to={routes.adminUsers()}>Back to users</Link>
      <h2>Create new User</h2>
      <UserForm onSave={onCreate} />
    </AdminLayout>
  )
}

export default AdminUserNewPage

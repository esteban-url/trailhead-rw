import { Link, routes } from '@redwoodjs/router'
import UserForm from 'src/components/UserForm/UserForm'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminNewUserPage = () => {
  return (
    <AdminLayout>
      <h1>Create a new user</h1>
      <Link to={routes.adminUsers()}>Users</Link>
      <UserForm />
    </AdminLayout>
  )
}

export default AdminNewUserPage

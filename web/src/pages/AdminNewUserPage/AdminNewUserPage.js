import { Link, routes } from '@redwoodjs/router'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminNewUserPage = () => {
  return (
    <AdminLayout>
      <h1>Create a new user</h1>
      <Link to={routes.adminUsers()}>Users</Link>
    </AdminLayout>
  )
}

export default AdminNewUserPage

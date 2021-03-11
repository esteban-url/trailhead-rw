import { Link, routes } from '@redwoodjs/router'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <h1>Users</h1>
      <p>
        <Link to={routes.adminNewUser()}>Create new user</Link>
      </p>
    </AdminLayout>
  )
}

export default AdminUsersPage

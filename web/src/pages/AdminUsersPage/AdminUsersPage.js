import { Link, routes } from '@redwoodjs/router'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
import UsersCell from 'src/components/UsersCell/UsersCell'

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <Link to={routes.adminUserNew()}>Create new user</Link>
      <UsersCell />
    </AdminLayout>
  )
}

export default AdminUsersPage

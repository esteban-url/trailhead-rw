import { Link, routes } from '@redwoodjs/router'
import UserCell from 'src/components/UserCell/UserCell'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminUserUpdatePage = ({ id }) => {
  return (
    <AdminLayout>
      <Link to={routes.adminUsers()}>Back to users</Link>
      <UserCell id={id} update={true} />
    </AdminLayout>
  )
}

export default AdminUserUpdatePage

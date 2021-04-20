import { Link, routes } from '@redwoodjs/router'
import UsersCell from 'src/components/UsersCell/UsersCell'

const AdminUsersPage = () => {
  return (
    <>
      <Link to={routes.adminUserNew()}>Create new user</Link>
      <UsersCell />
    </>
  )
}

export default AdminUsersPage

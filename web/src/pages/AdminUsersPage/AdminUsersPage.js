import { Link, routes } from '@redwoodjs/router'

const AdminUsersPage = () => {
  return (
    <Link>
      <h1>Users</h1>
      <p>
        <Link to={routes.adminNewUser()}>Create new user</Link>
      </p>
      <p>
        <Link to={routes.home()}>Home</Link>
      </p>
    </Link>
  )
}

export default AdminUsersPage

import { Link, routes } from '@redwoodjs/router'

const AdminNewUserPage = () => {
  return (
    <>
      <h1>Create a new user</h1>

      <p>
        <Link to={routes.adminUsers()}>Users</Link>
      </p>
      <p>
        <Link to={routes.home()}>Home</Link>
      </p>
    </>
  )
}

export default AdminNewUserPage

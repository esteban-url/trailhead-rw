import { Link, routes } from '@redwoodjs/router'
import UserCell from 'src/components/UserCell/UserCell'

const AdminUserUpdatePage = ({ id }) => {
  return (
    <>
      <Link to={routes.adminUsers()}>Back to users</Link>
      <UserCell id={id} update={true} />
    </>
  )
}

export default AdminUserUpdatePage

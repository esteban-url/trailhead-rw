import { Link, routes } from '@redwoodjs/router'
import UserCell from 'src/components/UserCell/UserCell'

const AdminUserViewPage = ({ id }) => {
  return (
    <>
      <Link to={routes.adminUsers()}>Back to users</Link>
      <UserCell id={id} />
    </>
  )
}

export default AdminUserViewPage

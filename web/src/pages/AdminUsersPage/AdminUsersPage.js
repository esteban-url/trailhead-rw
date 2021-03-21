// import { useEffect } from 'react'
import { Link, routes } from '@redwoodjs/router'
// import { useAuth } from '@redwoodjs/auth'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
// import { useAsync, authorizedFetch } from 'src/utils/authorizedFetch'
// import UsersList from 'src/components/UsersList/UsersList'
import UsersCell from 'src/components/UsersCell/UsersCell'

const AdminUsersPage = () => {
  // const { client } = useAuth()
  // const { data, isLoading, isError, isSuccess, error, run } = useAsync()

  // useEffect(() => {
  //   run(authorizedFetch(client, '/.netlify/functions/usersList'))
  // }, [client, run])

  return (
    <AdminLayout>
      <UsersCell />
      <Link to={routes.adminNewUser()} className="rw-link">
        Create new user
      </Link>

      {/* {isSuccess ? <UsersList users={data.users} /> : null}
      {isLoading ? <p>loading...</p> : null}
      {isError ? <p>{error.message}</p> : null} */}
    </AdminLayout>
  )
}

export default AdminUsersPage

import { useAsync, authorizedFetch } from 'src/utils/authorizedFetch'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
import { Link, routes } from '@redwoodjs/router'

const AdminViewUserPage = ({ id }) => {
  const { client } = useAuth()

  const { data: user, isLoading, isError, isSuccess, error, run } = useAsync()
  useEffect(() => {
    run(
      authorizedFetch(client, '/.netlify/functions/userGet', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
    )
  }, [client, id, run])
  return (
    <AdminLayout>
      <Link to={routes.adminUsers()}>back to list</Link>
      {isSuccess ? (
        <>
          <h3>{user.user_metadata.full_name}</h3>
          <p>{user.email}</p>
          <p>created: {user.created_at}</p>
          <p>updated: {user.updated_at}</p>
        </>
      ) : null}
      {isLoading ? <p>loading...</p> : null}
      {isError ? <p>{error}</p> : null}
    </AdminLayout>
  )
}

export default AdminViewUserPage

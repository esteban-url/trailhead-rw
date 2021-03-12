import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
import UserForm from 'src/components/UserForm/UserForm'
import { authorizedFetch, useAsync } from 'src/utils/authorizedFetch'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminUpdateUserPage = ({ id }) => {
  const { client } = useAuth()
  const { data: user, isLoading, isError, isSuccess, error, run } = useAsync()

  const [deletingUser, setDeletingUser] = useState(false)

  useEffect(() => {
    if (deletingUser) {
      if (isError) {
        toast.error('User not deleted!')
      }
      if (isSuccess) {
        toast.success('User deleted!')
        navigate(routes.adminUsers())
      }
    }
  }, [deletingUser, isSuccess, isError, error])
  //initial data load
  useEffect(() => {
    run(
      authorizedFetch(client, '/.netlify/functions/userGet', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
    )
  }, [client, id, run])

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${user.email}?`)) {
      setDeletingUser(true)
      run(
        authorizedFetch(client, '/.netlify/functions/userDelete', {
          method: 'POST',
          body: JSON.stringify({ id: user.id }),
        })
      )
    }
  }

  return (
    <AdminLayout>
      <Link to={routes.adminUsers()}>back to list</Link>
      {isSuccess ? (
        <>
          <UserForm user={user} />
          <button type="button" onClick={() => handleDelete()}>
            delete user
          </button>
        </>
      ) : null}
      {isLoading ? <p>loading...</p> : null}
      {isError ? <p>{error}</p> : null}
    </AdminLayout>
  )
}

export default AdminUpdateUserPage

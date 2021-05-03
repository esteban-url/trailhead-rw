import UserCell from 'src/components/UserCell/UserCell'
import { PageTitle } from 'src/utils/PageTitle'

const AdminUserUpdatePage = ({ id }) => {
  return (
    <>
      <PageTitle>Update user</PageTitle>
      <UserCell id={id} update={true} />
    </>
  )
}

export default AdminUserUpdatePage

import UsersList from './UsersList'
import { standard } from './UsersList.mock'

export const generated = () => {
  return <UsersList {...standard()} />
}

export default { title: 'Components/UsersList' }

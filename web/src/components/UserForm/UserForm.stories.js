import UserForm from './UserForm'
import { user, adminUser, loading, userWithErrorSaving } from './UserForm.mock'

export const newUser = () => {
  return <UserForm onSave={console.log} />
}

export const editingAUser = () => {
  return <UserForm {...user()} onSave={console.log} />
}
export const editingAnAdminUser = () => {
  return <UserForm {...adminUser()} onSave={console.log} />
}

export const error = () => {
  return <UserForm {...userWithErrorSaving()} />
}
export const formLoading = () => {
  return <UserForm {...loading()} />
}

export default { title: 'Components/UserForm' }

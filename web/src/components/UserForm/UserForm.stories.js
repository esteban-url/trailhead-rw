import UserForm from './UserForm'
import { user, loading, userWithErrorSaving } from './UserForm.mock'

export const newUser = () => {
  return <UserForm />
}

export const editingAUser = () => {
  return <UserForm {...user()} />
}

export const error = () => {
  return <UserForm {...userWithErrorSaving()} />
}
export const formLoading = () => {
  return <UserForm {...loading()} />
}

export default { title: 'Components/UserForm' }

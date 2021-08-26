import ProfileForm from './ProfileForm'
import { standard } from './ProfileForm.mock'

export const generated = () => {
  return <ProfileForm {...standard()} />
}

export default { title: 'Components/ProfileForm' }

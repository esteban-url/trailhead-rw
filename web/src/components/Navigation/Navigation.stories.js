import Navigation from './Navigation'

export const generated = () => {
  return <Navigation />
}

export const regularUser = () => {
  mockCurrentUser({
    user_metadata: { full_name: 'Esteban' },
    roles: ['user'],
  })
  return <Navigation />
}
export const admin = () => {
  mockCurrentUser({
    user_metadata: { full_name: 'Esteban' },
    roles: ['admin'],
  })
  return <Navigation />
}

export default { title: 'Components/Navigation' }

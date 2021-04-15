import AdminLayout from './AdminLayout'

export const admin = () => {
  mockCurrentUser({
    user_metadata: { full_name: 'Esteban' },
    roles: ['admin'],
  })
  return <AdminLayout />
}

export default { title: 'Layouts/AdminLayout' }

import Navigation from 'src/components/Navigation/Navigation'
import { Toaster } from '@redwoodjs/web/toast'

const AdminLayout = ({ children }) => {
  return (
    // inline styles to be removed
    <div style={{ backgroundColor: '#ccc' }}>
      <Navigation />
      <Toaster
        position="top-right"
        toastOptions={{ success: { duration: 3000 } }}
      />
      {children}
    </div>
  )
}

export default AdminLayout

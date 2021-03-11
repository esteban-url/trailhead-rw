import Navigation from 'src/components/Navigation/Navigation'
import { Toaster } from '@redwoodjs/web/toast'

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Toaster
        position="top-right"
        toastOptions={{ success: { duration: 3000 } }}
      />
      {children}
    </>
  )
}

export default PublicLayout

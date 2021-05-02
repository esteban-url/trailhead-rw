import { Toaster } from '@redwoodjs/web/toast'
import Footer from 'src/components/Footer/Footer'

const PublicLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-white">
        {children}
        <Footer />
      </div>
      <Toaster position="top" toastOptions={{ success: { duration: 3000 } }} />
    </>
  )
}

export default PublicLayout

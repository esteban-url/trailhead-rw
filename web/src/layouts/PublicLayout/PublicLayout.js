import { Toaster } from '@redwoodjs/web/toast'
import { Helmet } from 'react-helmet-async'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'
import { usePageTitle } from 'src/utils/PageTitle'

const PublicLayout = ({ children }) => {
  const [pageTitle] = usePageTitle()
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header title={pageTitle} />
        <main className="bg-white">
          <div className="max-w-md mx-auto pb-36 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:py-8 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      <Toaster position="top" toastOptions={{ success: { duration: 3000 } }} />
    </>
  )
}

export default PublicLayout

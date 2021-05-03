import { Toaster } from '@redwoodjs/web/toast'
import Footer from 'src/components/Footer/Footer'
import { usePageTitle } from 'src/utils/PageTitle'

import Navigation from 'src/components/Navigation/Navigation'

const PublicLayout = ({ children }) => {
  const [pageTitle] = usePageTitle()
  return (
    <div>
      <div className="bg-gray-800 pb-32">
        <Navigation />
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">{pageTitle}</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top" toastOptions={{ success: { duration: 3000 } }} />
    </div>
  )
}

export default PublicLayout

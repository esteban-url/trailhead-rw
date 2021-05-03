import { createContext, useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const PageTitleContext = createContext()
const usePageTitle = () => {
  const context = useContext(PageTitleContext)
  if (!context)
    throw new Error(
      'usePageTitleCache must be used within the PageTitleProvider'
    )
  return context
}

const PageTitleProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState()
  return (
    <PageTitleContext.Provider value={[pageTitle, setPageTitle]}>
      {children}
    </PageTitleContext.Provider>
  )
}

const PageTitle = ({ children }) => {
  const [, setPageTitle] = usePageTitle()
  useEffect(() => {
    setPageTitle(children)
  }, [setPageTitle, children])
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  )
}
export { usePageTitle, PageTitleProvider, PageTitle }

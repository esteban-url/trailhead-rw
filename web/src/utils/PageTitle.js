import { createContext, useContext, useState, useEffect } from 'react'

const PageTitleContext = createContext()
const usePageTitle = () => {
  const context = useContext(PageTitleContext)
  if (!context)
    throw new Error('usePageTitleCache must be within the PageTitleProvider')
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
  return null
}
export { usePageTitle, PageTitleProvider, PageTitle }

import { render as rtlRender } from '@redwoodjs/testing'
import { HelmetProvider } from 'react-helmet-async'
import { PageTitleProvider } from 'src/utils/PageTitle'
const render = ({ ui, options }) => {
  const Wrapper = ({ children }) => {
    return (
      <HelmetProvider>
        <PageTitleProvider>{children}</PageTitleProvider>
      </HelmetProvider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}
export { render }

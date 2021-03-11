import Navigation from 'src/components/Navigation/Navigation'

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default PublicLayout

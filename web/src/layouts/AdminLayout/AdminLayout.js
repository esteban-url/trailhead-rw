import Navigation from 'src/components/Navigation/Navigation'

const AdminLayout = ({ children }) => {
  return (
    // inline styles to be removed
    <div style={{ backgroundColor: '#ccc' }}>
      <Navigation />
      {children}
    </div>
  )
}

export default AdminLayout

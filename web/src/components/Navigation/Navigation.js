import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
const Navigation = () => {
  const { logIn, logOut, isAuthenticated, currentUser, hasRole } = useAuth()
  return (
    <nav
      // inline styles to be removed
      style={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 'stretch',
      }}
    >
      <Link to={routes.home()} style={{ marginRight: '1rem' }}>
        <h1>Trailhead</h1>
      </Link>

      {isAuthenticated ? (
        // inline styles to be removed
        <Link to={routes.private()} style={{ marginRight: '1rem' }}>
          Private
        </Link>
      ) : null}
      {hasRole('admin') ? (
        // inline styles to be removed
        <Link to={routes.adminUsers()} style={{ marginRight: '1rem' }}>
          Admin
        </Link>
      ) : null}
      {/* // inline styles to be removed */}
      <Link to={routes.about()} style={{ marginRight: '1rem' }}>
        About
      </Link>
      {isAuthenticated ? (
        <>
          {/* // inline styles to be removed */}
          <p style={{ marginRight: '1rem' }}>
            Welcome, {currentUser.user_metadata.full_name}
          </p>
          <button onClick={logOut}>Sign out</button>
        </>
      ) : (
        <button onClick={logIn}>Log in</button>
      )}
    </nav>
  )
}

export default Navigation

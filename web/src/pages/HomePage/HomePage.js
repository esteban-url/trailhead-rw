import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const HomePage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <h1>Trailhead</h1>

      {isAuthenticated ? (
        <p>
          <Link to={routes.private()}>Private</Link>
        </p>
      ) : null}
      <p>
        <Link to={routes.about()}>About</Link>
      </p>
      <p>
        {isAuthenticated ? (
          <a href="#" onClick={logOut}>
            Sign out
          </a>
        ) : (
          <a href="#" onClick={logIn}>
            Log in
          </a>
        )}
      </p>
      {isAuthenticated ? (
        <p>Welcome, {currentUser.user_metadata.full_name}</p>
      ) : null}
    </>
  )
}

export default HomePage

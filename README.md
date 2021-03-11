# Trailhead

Trailhead is a starter point for your app, based on top of [Redwoodjs](https://github.com/redwoodjs/redwood) , it adds common functionalities so you don't have to!

- auth, provided by netlify identity
- user management, provided via lambda functions

## Step by step guide
This on how I built trailhead.

To be perfectly honest this is not how I actually build it. This is the "_clean_"  version.

There was pain, blood and tears, way many commits, errors, re-tries, deploys to get everything working.

### Create the app

```sh
yarn create redwood-app trailhead-rw
```
```sh
cd  trailhead-rw
```
### Setup the auth configuration
Using netlify
```sh
yarn rw setup auth netlify
```

### Setup the deployment configuration
Using netlify
```sh
yarn rw setup deploy netlify
```
### Add navigation and layouts
```sh
yarn rw g component navigation
```
```jsx
// src/components/Navigation/Navigation.js

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
```
```sh
yarn rw g layout public
```
```jsx
// src/layouts/PublicLayout/PublicLayout.js

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
```
```sh
yarn rw g layout admin
```
```jsx
// src/layouts/AdminLayout/AdminLayout.js

import Navigation from 'src/components/Navigation/Navigation'

const AdminLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#ccc' }}>
      <Navigation />
      {children}
    </div>
  )
}

export default AdminLayout
```
### Admin pages
```sh
yarn rw g page admin-new-user
```
```sh
yarn rw g page admin-users
```
### Add basic pages
These pages will create the basic for for initially testing auth

```sh
yarn rw g page about --tests false
```
```jsx
// src/pages/AboutPage/AboutPage.js

import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'

const AboutPage = () => {
  return (
    <PublicLayout>
      <h1>About Trailhead</h1>
    </PublicLayout>
  )
}

export default AboutPage

```
```sh
yarn rw g page private
```
```jsx
// src/pages/PrivatePage/PrivatePage.js

import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'

const PrivatePage = () => {
  return (
    <PublicLayout>
      <h1>Private Page</h1>
      <p>this is for logged in trailhead users only</p>
    </PublicLayout>
  )
}

export default PrivatePage

export default PrivatePage
```
```sh
yarn rw g page home --tests false
```
```jsx
// src/pages/HomePage/HomePage.js

import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'

const HomePage = () => {
  return (
    <PublicLayout>
      <h1>hi there!</h1>
    </PublicLayout>
  )
}

export default HomePage
```
Edit the routes so that private is in fact private
```jsx
// src/Routes.js

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Private unauthenticated="home">
        <Route path="/private" page={PrivatePage} name="private" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
```


### Add Admin pages
```sh
yarn rw g page admin-users
```
```jsx
// src/pages/AdminNewUserPage/AdminUsersPage.js

import { Link, routes } from '@redwoodjs/router'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <h1>Users</h1>
      <p>
        <Link to={routes.adminNewUser()}>Create new user</Link>
      </p>
    </AdminLayout>
  )
}

export default AdminUsersPage
```
```sh
yarn rw g page admin-new-user
```
```jsx
// src/pages/AdminNewUserPage/AdminNewUserPage.js

import { Link, routes } from '@redwoodjs/router'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

const AdminNewUserPage = () => {
  return (
    <AdminLayout>
      <h1>Create a new user</h1>
      <Link to={routes.adminUsers()}>Users</Link>
    </AdminLayout>
  )
}

export default AdminNewUserPage
```


update navigation
```jsx
// src/components/Navigation/Navigation.js

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
```

---
# Redwood
 **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

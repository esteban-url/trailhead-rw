# Trailhead

Trailhead is a starter point for your app, based on top of [Redwoodjs](https://github.com/redwoodjs/redwood) , it adds common functionalities so you don't have to!

- auth, provided by netlify identity
- user management, provided via lambda functions

## Step by step guide
This on how I built trailhead.

To be perfectly honest this is not how I actually build it. This is the "_clean_"  version.

There was pain, blood and tears, way many commits, errors, re-tries, deploys to get everything working.

```sh
yarn create redwood-app trailhead-rw
```
```sh
cd  trailhead-rw
```
```sh
yarn rw setup auth netlify
```
```sh
yarn rw g page private
```
```sh
yarn rw g page about --tests false
```
```jsx
// src/pages/AboutPage/AboutPage.js
import { Link, routes } from '@redwoodjs/router'

const AboutPage = () => {
  return (
    <>
      <h1>About Trailhead</h1>
      <Link to={routes.home()}>Home</Link>
    </>
  )
}

export default AboutPage
```
```yarn rw g page private```
```jsx
// src/pages/PrivatePage/PrivatePage.js
import { Link, routes } from '@redwoodjs/router'

const PrivatePage = () => {
  return (
    <>
      <h1>Private Page</h1>
      <p>this is for logged in trailhead users only</p>

      <Link to={routes.home()}>Home</Link>
    </>
  )
}

export default PrivatePage
```
```sh
yarn rw g page home --tests false
```
```jsx
// src/pages/HomePage/HomePage.js
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
```
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

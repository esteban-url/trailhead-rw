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


### User management pages
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


### Usermanagement API

```sh
yarn rw generate function userCreate
```
```js
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  const roles = user ? user.app_metadata.roles : false
  const allowedRoles = ['admin']
  const usersUrl = `${identity.url}/admin/users`
  const adminAuthHeader = 'Bearer ' + identity.token

  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(usersUrl, {
        method: 'POST',
        headers: { Authorization: adminAuthHeader },
        body: JSON.stringify({ ...JSON.parse(event.body), confirm: true }),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.code) {
            console.info(`Error ${data.code}: ${data.msg}`)

            return {
              statusCode: data.code,
              body: JSON.stringify({ error: data.msg }),
            }
          }
          console.info('Created a user! 204!')
          console.info(JSON.stringify({ data }))
          return { statusCode: 204 }
        })
        .catch((error) => {
          console.info(error)
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + error,
          }
        })
    } else {
      return { statusCode: 401 }
    }
  } catch (error) {
    console.info(error)
    return error
  }
}

```
```sh
yarn rw generate function userDelete
```
```js
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  const { id } = JSON.parse(event.body)
  const roles = user ? user.app_metadata.roles : false
  const allowedRoles = ['admin']
  const userUrl = `${identity.url}/admin/users/{${id}}`
  const adminAuthHeader = 'Bearer ' + identity.token

  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(userUrl, {
        method: 'DELETE',
        headers: { Authorization: adminAuthHeader },
      })
        .then((response) => {
          console.info(`Deleted a user: ${id}`)
          return response.json()
        })
        .then(() => {
          return { statusCode: 204 }
        })
        .catch((error) => {
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + error,
          }
        })
    } else {
      return { statusCode: 401 }
    }
  } catch (error) {
    console.info(error)
    return error
  }
}
```
```sh
yarn rw generate function userGet
```
```js
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  const { id } = JSON.parse(event.body)
  const roles = user.app_metadata?.roles || []
  const allowedRoles = ['admin']
  const userUrl = `${identity.url}/admin/users/{${id}}`
  const adminAuthHeader = 'Bearer ' + identity.token
  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(userUrl, {
        method: 'GET',
        headers: { Authorization: adminAuthHeader },
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.code) {
            console.info(`Error ${data.code}: ${data.msg}`)
            return {
              statusCode: data.code,
              body: JSON.stringify({ error: data.msg }),
            }
          }
          return { statusCode: 200, body: JSON.stringify(data) }
        })
        .catch((e) => {
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + e,
          }
        })
    } else {
      return { statusCode: 401 }
    }
  } catch (error) {
    console.info(error)
    return {
      statusCode: 500,
      body: 'Internal Server Error: ' + error,
    }
  }
}
```
```sh
yarn rw generate function userUpdate
```
```js
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  const roles = user ? user.app_metadata.roles : false
  const updatedUser = JSON.parse(event.body)
  const allowedRoles = ['admin']
  const usersUrl = `${identity.url}/admin/users/${updatedUser.id}`
  const adminAuthHeader = 'Bearer ' + identity.token

  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(usersUrl, {
        method: 'PUT',
        headers: { Authorization: adminAuthHeader },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.info('Updated a user! 204!')
          console.info(JSON.stringify({ data }))
          return { statusCode: 204 }
        })
        .catch((error) => {
          console.info(error)
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + error,
          }
        })
    } else {
      return { statusCode: 401 }
    }
  } catch (error) {
    console.info(error)
    return error
  }
}
```
```sh
yarn rw generate function usersList
```
```js
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  const roles = user.app_metadata?.roles || []
  const allowedRoles = ['admin']
  const usersUrl = `${identity.url}/admin/users`
  const adminAuthHeader = 'Bearer ' + identity.token
  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(usersUrl, {
        method: 'GET',
        headers: { Authorization: adminAuthHeader },
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.code) {
            console.info(`Error ${data.code}: ${data.msg}`)
            return {
              statusCode: data.code,
              body: JSON.stringify({ error: data.msg }),
            }
          }
          return { statusCode: 200, body: JSON.stringify(data) }
        })
        .catch((e) => {
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + e,
          }
        })
    } else {
      return { statusCode: 401 }
    }
  } catch (error) {
    console.info(error)
    return {
      statusCode: 500,
      body: 'Internal Server Error: ' + error,
    }
  }
}
```

### Authorized fetch
Netlify exposes admin methods to interact with Identity, but you need to make an authoried fetch to the user management API [read more](https://github.com/netlify/gotrue-js#admin-methods).
This file exposes a Async wrapper around fetch so those calls can me made


```sh
# create directory
mkdir web/src/utils
```
```sh
# create file
touch web/src/utils/authorizedFetch.js
```
```jsx
const authorizedFetch = (client, url, options) => {
  if (!client?.currentUser().token)
    throw new Error('Cannot authorizedFetch while logged out')
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${client.currentUser().token.access_token}`,
    },
  }).then(async (response) => {
    const data = await response
    if (data.ok) {
      switch (data.status) {
        case 204:
          return data
        default:
          return data.json()
      }
    } else {
      const error = {
        message: data?.statusText,
      }
      return Promise.reject(error)
    }
  })
}

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])
  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  )
}

// Example usage:
// const { client } = useAuth()
// const {data, error, status, run} = useAsync()
// useEffect(() => {
//   run(authorizedFetch(client, '/.netlify/functions/usersList'))
// }, [client, run])
const defaultInitialState = { status: 'idle', data: null, error: null }
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{ status, data, error }, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data) => safeSetState({ data, status: 'resolved' }),
    [safeSetState]
  )
  const setError = React.useCallback(
    (error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState]
  )
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ])

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }
      safeSetState({ status: 'pending' })
      return promise.then(
        (data) => {
          setData(data)
          return data
        },
        (error) => {
          setError(error)
          return Promise.reject(error)
        }
      )
    },
    [safeSetState, setData, setError]
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export { useAsync, authorizedFetch }
```


### User management components

Extracting some of more repeated components makes the code celaner and easier to maintaing. specially when styling

```sh
yarn rw g component formField
```
```jsx
// src/components/FormField/FormField.js

import { Label, FieldError } from '@redwoodjs/forms'

const FormField = ({ as: As, name, label, register, validation, ...rest }) => {
  return (
    <div className="">
      <Label name={name} className="" errorClassName="">
        {label}
      </Label>

      <As
        name={name}
        className=""
        errorClassName=""
        ref={register}
        validation={validation}
        {...rest}
      />
      <FieldError name={name} className="" />
    </div>
  )
}

export default FormField

```

```sh
yarn rw g component userForm
```
```jsx
// src/components/UserForm/UserForm.js

import { useEffect, useState } from 'react'
import { useAsync, authorizedFetch } from 'src/utils/authorizedFetch'
import { useAuth } from '@redwoodjs/auth'
import { useForm } from 'react-hook-form'
import {
  CheckboxField,
  EmailField,
  Form,
  PasswordField,
  Submit,
  TextField,
} from '@redwoodjs/forms/dist'
import FormField from 'src/components/FormField/FormField'

const UserForm = ({ user, onUserSaved }) => {
  const { client } = useAuth()

  const { isSuccess, isError, error, run } = useAsync()
  const [resetPassword, setResetPassword] = useState()
  const { register } = useForm({
    defaultValues: user
      ? {
          name: user?.user_metadata?.full_name,
          email: user?.email,
          admin: user?.app_metadata?.roles?.includes('admin'),
          other: user?.app_metadata?.roles?.includes('other'),
        }
      : {},
  })
  useEffect(() => {
    if (isError) {
      console.error({ error })
    }
    if (isSuccess) {
      onUserSaved()
    }
  }, [error, isSuccess, isError, onUserSaved])

  const onSubmit = (data) => {
    let roles = []
    if (data.admin) roles = [...roles, 'admin']
    if (data.other) roles = [...roles, 'other']
    const updatedUser = {
      id: user?.id,
      email: data.email,
      password: data.password,
      user_metadata: { full_name: data.name },
      app_metadata: { roles: roles },
    }

    run(
      authorizedFetch(
        client,
        user?.id
          ? '/.netlify/functions/userUpdate'
          : '/.netlify/functions/userCreate',
        {
          method: 'POST',
          body: JSON.stringify(updatedUser),
        }
      )
    )
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField
        as={TextField}
        name="name"
        label="Name"
        register={register}
        validation={{ required: true }}
      />
      <FormField
        as={EmailField}
        name="email"
        label="Email Address"
        register={register}
        validation={{
          required: true,
        }}
      />

      {user ? (
        <FormField
          as={CheckboxField}
          name="resetPassword"
          label="Reset Password"
          register={register}
          onClick={() => setResetPassword(!resetPassword)}
        />
      ) : null}
      {!user || resetPassword ? (
        <FormField
          as={PasswordField}
          name="password"
          label="Password"
          register={register}
          validation={{ required: true }}
        />
      ) : null}
      {user ? (
        <div>
          <FormField
            as={CheckboxField}
            name="admin"
            label="Admin role"
            register={register}
          />
          <FormField
            as={CheckboxField}
            name="other"
            label="Other role"
            register={register}
          />
        </div>
      ) : null}
      {isError ? <div>{error.message}</div> : null}
      <Submit>Save User</Submit>
    </Form>
  )
}

export default UserForm
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

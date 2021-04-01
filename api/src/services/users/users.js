import got from 'got'
import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

const getContextData = () => {
  return {
    adminToken: context.clientContext?.identity?.token,
    identityEndpoint: context.clientContext?.identity?.url,
  }
}
const getRequestOptions = (overrides) => {
  const { adminToken } = getContextData()

  return {
    responseType: 'json',
    headers: {
      authorization: `Bearer ${adminToken}`,
    },
    ...overrides,
  }
}
const userDummy = {
  id: `${Date.now()}`,
  email: 'example@example.com',
  app_metadata: { roles: [] },
  user_metadata: { full_name: 'Ariel Doe' },
}
const logError = (title, url, error) => {
  // console.error(title, url, error.response?.body, {
  //   error,
  // })
  logger.error(
    {
      url: url,
      errorBody: error.response?.body,
      error,
    },
    title
  )
}
const logTrace = (title, url, data) => {
  logger.warn(
    {
      url: url,
      data,
    },
    title
  )
}

export const deleteUser = async ({ id }) => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users/${id}`
  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.get(
        url,
        getRequestOptions({ method: 'DELETE' })
      )
      logTrace('deleting user', url, { body })
      return body
    } catch (error) {
      logError(`Identity: Failed to delete user`, url, error)
    }
  } else {
    return userDummy
  }
}
export const updateUser = async ({ input }) => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users/${input.id}`
  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.put(
        url,
        getRequestOptions({
          body: JSON.stringify({
            ...input,
            user_metadata: { lastUpdatedBy: context.currentUser.email },
          }),
        })
      )
      logTrace('updating user', url, { body })
      return body
    } catch (error) {
      logError(`Identity: Failed to update user`, url, error)
    }
  } else {
    return userDummy
  }
}
export const createUser = async ({ input }) => {
  requireAuth({ role: 'admin' })

  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users`
  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.post(
        url,
        getRequestOptions({
          body: JSON.stringify({
            ...input,
            confirm: true,
            app_metadata: {
              roles: ['user'],
            },
            user_metadata: {
              createdBy: context.currentUser.email,
              lastUpdatedBy: context.currentUser.email,
            },
          }),
        })
      )
      logTrace('creating user', url, { body })

      return body
    } catch (error) {
      logError(`Identity: Failed to create user`, url, error)
    }
  } else {
    return userDummy
  }
}
export const user = async ({ id }) => {
  requireAuth({ role: 'admin' })

  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users/${id}`

  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.get(url, getRequestOptions())
      logTrace('getting user', url, { body })
      return body
    } catch (error) {
      logError(`Identity: Failed to get single user`, url, error)
    }
  } else {
    return userDummy
  }
}
export const users = async () => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users`
  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.get(url, getRequestOptions())
      logTrace('listing users', url, { body })
      return body['users']
    } catch (error) {
      logError(`Identity: Failed to get users list`, url, error)
    }
  } else {
    return [userDummy, userDummy, userDummy]
  }
}

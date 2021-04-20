import got from 'got'
import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

const mockedUser = {
  id: `${Date.now()}`,
  email: 'example@example.com',
  app_metadata: { roles: [] },
  user_metadata: { full_name: 'Ariel Doe' },
}

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

const logError = (title, url, error) => {
  logger.error(
    {
      url: url,
      errorBody: error.response?.body,
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
      await got.delete(url, getRequestOptions())
    } catch (error) {
      logError(`Identity: Failed to delete user`, url, error)
      throw new Error(error.response?.body.msg || "Can't delete the user")
    }
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
      return body
    } catch (error) {
      logError(`Identity: Failed to update user`, url, error)
      throw new Error(error.response?.body.msg || "Can't update the user")
    }
  } else {
    return mockedUser
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
              ...input.user_metadata,
              created_by: context.currentUser.email,
              lastUpdated_by: context.currentUser.email,
            },
          }),
        })
      )
      return body
    } catch (error) {
      logError(`Identity: Failed to create user`, url, error)
      throw new Error(error.response?.body.msg || "Can't create the new user")
    }
  } else {
    return mockedUser
  }
}

export const user = async ({ id }) => {
  requireAuth({ role: 'admin' })

  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users/${id}`

  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.get(url, getRequestOptions())
      return body
    } catch (error) {
      logError(`Identity: Failed to get single user`, url, error)
      throw new Error(error.response?.body.msg || "Can't get the user")
    }
  } else {
    return mockedUser
  }
}

export const users = async () => {
  requireAuth({ role: 'admin' })

  const { adminToken, identityEndpoint } = getContextData()
  const url = `${identityEndpoint}/admin/users`

  if (adminToken && identityEndpoint) {
    try {
      const { body } = await got.get(url, getRequestOptions())
      return body['users']
    } catch (error) {
      logError(`Identity: Failed to get users list`, url, error)
      throw new Error(error.response?.body.msg || "Can't get the users list")
    }
  } else {
    return [mockedUser, mockedUser, mockedUser]
  }
}

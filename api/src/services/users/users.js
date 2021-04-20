// trailhead-rw

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
    return mockedUsers.find((x) => x.id === input.id)
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
    return mockedUsers[Math.floor(Math.random() * mockedUsers.length)]
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
    return mockedUsers.find((x) => x.id === id)
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
    return mockedUsers
  }
}

const mockedUsers = [
  {
    id: 'd58c26d5-c3e4-4f4c-97af-a3838976e7f1',
    email: 'regular@user.com',
    user_metadata: { full_name: 'Regular user', __typename: 'UserMetadata' },
    app_metadata: {
      roles: ['user'],
      created_by: 'esteban@fakemail.com',
      lastUpdated_by: 'esteban@fakemail.com',
      __typename: 'AppMetadata',
    },
    created_at: '2021-04-20T21:56:23.000Z',
    updated_at: '2021-04-20T21:56:23.000Z',
    __typename: 'User',
  },
  {
    id: '793e9bb1-6ca2-44d2-8fc2-e135a88708c4',
    email: 'test@admin.com',
    user_metadata: { full_name: 'test admin', __typename: 'UserMetadata' },
    app_metadata: {
      roles: ['admin'],
      created_by: null,
      lastUpdated_by: null,
      __typename: 'AppMetadata',
    },
    created_at: '2021-04-20T15:51:28.000Z',
    updated_at: '2021-04-20T15:51:28.000Z',
    __typename: 'User',
  },
  {
    id: 'f7d63030-2233-4a7c-8568-3a9e28c9551b',
    email: 'estebanjrojas@gmail.com',
    user_metadata: { full_name: 'Esteban', __typename: 'UserMetadata' },
    app_metadata: {
      roles: ['admin'],
      created_by: null,
      lastUpdated_by: null,
      __typename: 'AppMetadata',
    },
    created_at: '2020-10-10T01:12:42.000Z',
    updated_at: '2020-10-10T01:12:42.000Z',
    __typename: 'User',
  },
]

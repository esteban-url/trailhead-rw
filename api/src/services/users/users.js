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

export const deleteUser = async (id) => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()
  if (adminToken && identityEndpoint) {
    const { body } = await got.get(
      `${identityEndpoint}/admin/users/${id}`,
      getRequestOptions({ method: 'DELETE' })
    )

    return body['user']
  } else {
    return userDummy
  }
}
export const updateUser = async ({ input }) => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()
  if (adminToken && identityEndpoint) {
    const { body } = await got.put(
      `${identityEndpoint}/admin/users/${input.id}`,
      getRequestOptions({
        body: JSON.stringify({
          ...input,
          user_metadata: { lastUpdatedBy: context.currentUser.email },
        }),
      })
    )

    return body['user']
  } else {
    return userDummy
  }
}
export const createUser = async ({ input }) => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()
  if (adminToken && identityEndpoint) {
    const { body } = await got.post(
      `${identityEndpoint}/admin/users`,
      getRequestOptions({
        body: JSON.stringify({
          ...input,
          confirm: true,
          user_metadata: {
            createdBy: context.currentUser.email,
            lastUpdatedBy: context.currentUser.email,
          },
        }),
      })
    )

    return body['user']
  } else {
    return userDummy
  }
}
export const user = async (id) => {
  requireAuth({ role: 'admin' })

  const { adminToken, identityEndpoint } = getContextData()
  if (adminToken && identityEndpoint) {
    const { body } = await got.get(
      `${identityEndpoint}/admin/users/${id}`,
      getRequestOptions()
    )

    return body['user']
  } else {
    return userDummy
  }
}
export const users = async () => {
  requireAuth({ role: 'admin' })
  const { adminToken, identityEndpoint } = getContextData()

  logger.trace({ adminToken }, { identityEndpoint })
  if (adminToken && identityEndpoint) {
    const { body } = await got.get(
      `${identityEndpoint}/admin/users`,
      getRequestOptions()
    )

    return body['users']
  } else {
    return [userDummy, userDummy, userDummy]
  }
}

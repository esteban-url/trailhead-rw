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

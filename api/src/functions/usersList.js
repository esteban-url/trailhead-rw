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

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

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/API_Responses')

const usersTable = process.env.USERS_TABLE_NAME

exports.handler = async event => {
  const body = JSON.parse(event.body)

  const user = await Dynamo.get(body.id, usersTable)

  if (user) {
    return Responses._200(user)
  }

  const item = {
    id: body.id,
    username: body.username,
    subscribedRepos: [],
    notifications: []
  }

  try {
    await Dynamo.write(item, usersTable)
  } catch (err) {
    console.error(err)
  }

  return Responses._200(item)
}

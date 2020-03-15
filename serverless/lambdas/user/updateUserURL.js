const Dynamo = require('../common/Dynamo')
const Responses = require('../common/API_Responses')

const usersTable = process.env.USERS_TABLE_NAME

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const user = await Dynamo.get(body.id, usersTable)

  if (!user) {
    return Responses._404({ message: 'User not found' })
  }

  const item = { ...user, callbackURL: body.callbackURL }

  try {
    await Dynamo.write(item, usersTable)
  } catch (err) {
    console.error(err)
  }

  return Responses._200(item)
}

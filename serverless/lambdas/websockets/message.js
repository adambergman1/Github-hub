const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.TABLE_NAME

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID } = event.requestContext

  const { message } = JSON.parse(event.body)

  try {
    const record = await Dynamo.get(connectionID, tableName)
    const messages = record.messages

    messages.push(message)

    const data = {
      ...record,
      messages
    }

    await Dynamo.write(data, tableName)
    return Responses._200({ message: 'Got a message' })
  } catch (error) {
    return Responses._400({ message: 'Message could not be received' })
  }
}

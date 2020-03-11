const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.WSS_TABLE_NAME

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID } = event.requestContext

  const data = {
    id: connectionID,
    date: Date.now(),
    userId: event.queryStringParameters.userId
  }

  await Dynamo.write(data, tableName)

  return Responses._200({ message: 'Connected' })
}

const Responses = require('./common/API_Responses')
// const { ApiGatewayManagementApi } = require('aws-sdk')
// const Dynamo = require('./common/Dynamo')

// const wssTableName = process.env.WSS_TABLE_NAME
// const usersTableName = process.env.USERS_TABLE_NAME

exports.handler = async event => {
  console.log('event', event)

  const body = JSON.parse(event.body)

  console.log('BOOOOODYYY::: ', body)

  return Responses._200({ message: 'OK!' })
}

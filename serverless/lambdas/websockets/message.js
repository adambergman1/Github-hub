const AWS = require('aws-sdk')

const create = () => {
  return new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: 'uw9jdvyktk.execute-api.us-east-1.amazonaws.com/dev'
  })
}

const send = (connectionID, message) => {
  const ws = create()

  const postParams = {
    Data: JSON.stringify(message),
    ConnectionId: connectionID
  }

  return ws.postToConnection(postParams).promise()
}

module.exports = {
  send
}

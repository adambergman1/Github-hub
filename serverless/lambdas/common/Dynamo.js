const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
  async get (id, TableName) {
    const params = {
      TableName,
      Key: { id }
    }

    const data = await documentClient.get(params).promise()

    return data.Item
  },

  async write (data, TableName) {
    if (!data.id) {
      throw Error('No ID on the data')
    }

    const params = {
      TableName,
      Item: data
    }

    const res = await documentClient.put(params).promise()

    if (!res) {
      throw Error(`There was an error inserting ID of ${data.id} in table ${TableName}`)
    }

    return data
  },

  async delete (id, TableName) {
    const params = {
      TableName,
      Key: { id }
    }

    return documentClient.delete(params).promise()
  }
}
module.exports = Dynamo

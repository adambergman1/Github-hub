const responses = require('./common/API_Responses')

exports.handler = async event => {
  return responses._200({ message: 'Hello there!' })
}

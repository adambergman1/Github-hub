const Responses = require('../common/API_Responses')

exports.handler = async event => {
  console.log('Event', event)

  return Responses._200({ message: 'Default' })
}

const Responses = require('./common/API_Responses')

exports.handler = async event => {
  const superagent = require('superagent')
  const { code } = event.queryStringParameters

  if (!code) {
    return Responses._400({ message: 'Code is missing' })
  }

  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  }

  const response = await superagent
    .post('https://github.com/login/oauth/access_token')
    .send(data)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')

  const { access_token: token } = response.body

  return {
    statusCode: 302,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': process.env.CLIENT_URL,
      Location: `${process.env.CLIENT_URL}/?access_token=${token}`
    }
  }
}

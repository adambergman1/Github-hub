// const axios = require('axios')

module.exports.login = async event => {
  const superagent = require('superagent')
  const { code } = event.queryStringParameters

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

  const token = response.body.access_token

  return {
    statusCode: 302,
    headers: {
      Location: `http://localhost:3000/?access_token=${token}`,
      Authorization: token
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true
    }
    // body: JSON.stringify(token)
  }
}

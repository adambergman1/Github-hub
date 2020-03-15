const Responses = require('./common/API_Responses')
const fetch = require('node-fetch')

const serverURL = process.env.SERVER_URL
const secret = process.env.SECRET_TOKEN

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const { token, url } = body

  const config = {
    name: 'web',
    active: true,
    events: ['release', 'issues', 'push'],
    config: {
      url: serverURL + '/webhook',
      content_type: 'json',
      secret
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'token ' + token },
    body: JSON.stringify(config)
  })

  const response = await res.json()

  console.log(response)

  return Responses._200({ message: 'Added webhook' })
}

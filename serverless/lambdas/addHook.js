exports.handler = async event => {
  const hookPayload = await window.fetch(`https://api.github.com/orgs/${event.org}/hooks`, {
    method: 'POST',
    body: {
      name: 'web',
      config: { url: 'http://localhost:3000/webhook', content_type: 'json' },
      active: true,
      events: '*'
    },
    headers: { Authorization: 'token ' + event.access_token }
  })

  const result = hookPayload.json()

  return {
    statusCode: 200,
    body: result
  }
}

exports.handler = async event => {
  const body = JSON.parse(event.body)

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(body)
  }
}

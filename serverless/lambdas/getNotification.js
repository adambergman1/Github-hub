const Responses = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')
const { send } = require('./common/WebSocketMessage')

const wssTableName = process.env.WSS_TABLE_NAME
const usersTableName = process.env.USERS_TABLE_NAME

exports.handler = async event => {
  const receivedEvent = event.headers['X-GitHub-Event']
  const githubEvent = capitalizeFirstLetter(receivedEvent)
  const body = JSON.parse(event.body)

  const repositoryId = body.repository.id

  const users = await Dynamo.getAllFromTable(usersTableName)

  console.log({ users }, { githubEvent })

  const subscribedUsers = users.filter(user => user.subscribedRepos.find(r => r.repoId === repositoryId && r.data.includes(githubEvent)))

  console.log({ subscribedUsers })

  if (subscribedUsers.length) {
    const connections = await Dynamo.getAllFromTable(wssTableName)

    console.log({ connections })

    // const onlineUsers = connections.filter(c => parseInt(c.id) === subscribedUsers.filter(u => u.id === parseInt(c.id)))

    for (let i = 0; i < subscribedUsers.length; i++) {
      const user = subscribedUsers[i]
      const connection = connections.find(c => parseInt(c.userId) === user.id)

      if (connection) {
        console.log('Sending socket...')
        await send(connection.id, body)
        console.log('Socket sent')
      } else {
        // Send hook
      }
    }
  }

  return Responses._200({ message: 'OK!' })
}

function capitalizeFirstLetter (str) {
  return str[0].toUpperCase() + str.slice(1)
}

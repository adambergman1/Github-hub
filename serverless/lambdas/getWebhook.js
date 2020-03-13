const Responses = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')
const { send } = require('./websockets/message')

const wssTableName = process.env.WSS_TABLE_NAME
const usersTableName = process.env.USERS_TABLE_NAME

exports.handler = async event => {
  const superagent = require('superagent')

  const receivedEvent = event.headers['X-GitHub-Event']
  const body = JSON.parse(event.body)
  const repositoryId = body.repository.id

  const { data: bodyToSend, message } = buildMessage(receivedEvent, body)

  if (!bodyToSend) {
    return Responses._200({ message: 'Nothing sent' })
  }

  const githubEvent = capitalizeFirstLetter(receivedEvent)
  const users = await Dynamo.getAllFromTable(usersTableName)

  const subscribedUsers = users.filter(user =>
    user.subscribedRepos.find(
      r => r.repoId === repositoryId && r.data.includes(githubEvent)
    )
  )

  if (subscribedUsers.length) {
    const connections = await Dynamo.getAllFromTable(wssTableName)

    for (let i = 0; i < subscribedUsers.length; i++) {
      const user = subscribedUsers[i]
      const connection = connections.find(c => parseInt(c.userId) === user.id)

      if (connection) {
        console.log({ bodyToSend })
        await send(connection.id, bodyToSend)
      } else {
        if (user.callbackURL) {
          try {
            user.notifications = user.notifications ? [...user.notifications, bodyToSend] : [bodyToSend]
            await Dynamo.write(user, usersTableName) // Update user

            await superagent
              .post(user.callbackURL)
              .send({ message })
              .set('Content-Type', 'application/json')

            console.log('Sent offline notification to', user.username)
          } catch (error) {
            console.log({ error })
          }
        }
      }
    }
  }

  return Responses._200({ message: 'OK!' })
}

function capitalizeFirstLetter (str) {
  return str[0].toUpperCase() + str.slice(1)
}

function buildMessage (event, body) {
  let data = {}
  let message = 'You have received a new notification! \n'

  if (event === 'issues') {
    data = {
      event,
      action: body.action,
      repository: body.repository.name,
      issue: body.issue.title,
      description: body.issue.body,
      sender: body.sender.login,
      link: body.issue.url
    }
    message += `Event: ${data.event}\n Action: ${data.action}\n Title: ${data.title}\n Description: ${data.description}\n Link: ${data.link}\n Repository: ${data.repository}\n Sender: ${data.sender}`
  } else if (event === 'push') {
    data = {
      event,
      repository: body.repository.name,
      pusher: body.pusher.name,
      link: body.repository.url
    }
    message += `Event: ${data.event}\n Repository: ${data.repository}\n Pusher: ${data.pusher}\n Link: ${data.link}`
  } else if (event === 'release') {
    data = {
      event,
      action: body.action,
      repository: body.repository.name,
      release: body.release.tag_name + ' ' + body.release.name,
      link: body.release.url
    }
    message += `Event: ${data.event}\n Action: ${data.action}\n Repository: ${data.repository}\n Release: ${data.release}\n Link: ${data.link}`
  }
  return { data, message }
}

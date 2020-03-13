const Dynamo = require('../common/Dynamo')
const Responses = require('../common/API_Responses')

const usersTable = process.env.USERS_TABLE_NAME

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const user = await Dynamo.get(body.id, usersTable)

  if (!user) {
    return Responses._404({ message: 'User not found' })
  }

  const item = {
    id: user.id,
    username: user.username
  }

  if (body.repo.data.length === 0) {
    item.subscribedRepos = user.subscribedRepos.filter(r => r.repoId !== body.repo.repoId)

    try {
      await Dynamo.write(item, usersTable)
    } catch (err) {
      console.error(err)
    }

    return Responses._200(item)
  }

  const repo = user.subscribedRepos.find(r => r.repoId === body.repo.repoId)

  if (repo) {
    const subscribedExceptEdited = user.subscribedRepos.filter(r => r.repoId !== body.repo.repoId)
    item.subscribedRepos = [body.repo, ...subscribedExceptEdited]
  } else {
    item.subscribedRepos = [body.repo, ...user.subscribedRepos]
  }

  try {
    await Dynamo.write(item, usersTable)
  } catch (err) {
    console.error(err)
  }

  return Responses._200(item)
}

import React, { useEffect, useState, useContext } from 'react'

import { Paper, List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, Switch, CircularProgress } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { GithubContext } from '../context/GithubContext'
import { getCookie } from '../helpers/cookies'

const Repositories = ({ repos }) => {
  const [fullHeight, setFullHeight] = useState(false)
  const [subscribed, setSubscribed] = useState([])
  const [isLoading, setLoading] = useState(false)

  const { user, activeOrg } = useContext(GithubContext)
  const token = getCookie()

  useEffect(() => {
    if (repos[activeOrg]) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [repos, activeOrg])

  const changeHeight = () => {
    setFullHeight(!fullHeight)
  }

  const handleToggle = (repo) => () => {
    const currentIndex = subscribed.indexOf(repo)
    const newChecked = [...subscribed]

    if (currentIndex === -1) {
      newChecked.push(repo)
      addHook(repo.hooks_url)
      updateUserSettings(repo, true)
    } else {
      newChecked.splice(currentIndex, 1)
      updateUserSettings(repo, false)
    }
    setSubscribed(newChecked)
  }

  const addHook = (url) => {
    const config = {
      name: 'web',
      active: true,
      events: ['push', 'issues', 'release'],
      config: {
        url: 'https://sls-github.adambergman.me/webhook',
        content_type: 'json',
        insecure_ssl: 0
      }
    }

    window.fetch(url, {
      method: 'POST',
      headers: { Authorization: 'token ' + token },
      body: JSON.stringify(config)
    }).then(res => res.json().then(result => {
      return result
    })).catch(err => console.log(err))
  }

  const updateUserSettings = (repo, wantsToSubscribe) => {
    const data = {
      id: user.id,
      repo: { id: repo.id }
    }
    if (wantsToSubscribe) {
      data.repo.actions = ['push', 'issues']
    } else {
      data.repo.actions = []
    }

    window.fetch('https://sls-github.adambergman.me/', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    }).catch(err => console.log(err))
  }

  return (
    <div className='repositories'>
      <Paper>
        <List
          className={!fullHeight ? 'small-height' : ''}
          dense
          subheader={
            <ListSubheader className='flex align-center space-between' style={{ background: '#eee' }}>
          Repositories
              {!fullHeight
                ? <ExpandMoreIcon className='toggle-button' onClick={changeHeight} />
                : <ExpandLessIcon className='toggle-button' onClick={changeHeight} />}
            </ListSubheader>
          }
        >
          {isLoading ? (
            <ListItem key='loading'>
              <div className='loading'>
                <CircularProgress />
              </div>
            </ListItem>
          ) : (
            repos[activeOrg] && repos[activeOrg].length ? repos[activeOrg].map(repo => {
              return (
                <ListItem key={repo.id} style={{ borderBottom: '1px solid #eee' }}>
                  <ListItemAvatar>
                    <Avatar src={repo.owner.avatar_url} />
                  </ListItemAvatar>

                  <ListItemText primary={repo.name} secondary={repo.description} />
                  <ListItemSecondaryAction>
                    <Switch
                      edge='end'
                      onChange={handleToggle(repo)}
                      checked={subscribed.indexOf(repo) !== -1}
                      inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
                    />
                  </ListItemSecondaryAction>

                </ListItem>
              )
            }) : (
              <ListItem key='no-repo-items'>
                <ListItemText
                  primary='No repositories found'
                  secondary='Only repositories with admin permissions are listed here'
                />
              </ListItem>
            )
          )}
        </List>
      </Paper>
    </div>
  )
}

export default Repositories

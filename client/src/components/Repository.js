import React, { useState, useContext, useEffect } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Switch, Collapse, List } from '@material-ui/core'
import { GithubContext } from '../context/GithubContext'
import { getCookie } from '../helpers/cookies'

const Repository = ({ repo }) => {
  const [open, setOpen] = useState(false)
  const [subscribed, setSubscribed] = useState([])
  const values = ['Release', 'Issues', 'Push']

  const { userSettings, updateUserSettings, addHook } = useContext(GithubContext)

  useEffect(() => {
    if (userSettings && userSettings.subscribedRepos && subscribed.length === 0) {
      const repos = userSettings.subscribedRepos.find(d => d.repoId === repo.id)
      if (repos) {
        setOpen(true)
        setSubscribed(repos.data)
      }
    }
  }, [userSettings])

  const toggleNotifications = () => {
    if (open === false) {
      setOpen(true)
      setSubscribed(values)
      addHook(getCookie(), repo.hooks_url)
    } else {
      setOpen(false)
      setSubscribed([])
      updateUserSettings(repo.id, [])
    }
  }

  const handleChange = value => {
    const includes = subscribed.includes(value)

    if (!includes) {
      setSubscribed([...subscribed, value])
    } else if (subscribed.length === 1) {
      setOpen(false)
      setSubscribed([])
      updateUserSettings(repo.id, [])
    } else {
      setSubscribed(subscribed.filter(s => s !== value))
    }
  }

  useEffect(() => {
    if (subscribed.length > 0) {
      updateUserSettings(repo.id, [...subscribed])
    }
  }, [subscribed])

  return (
    <>
      <ListItem key={repo.id} style={{ borderBottom: '1px solid #eee' }}>
        <ListItemAvatar>
          <Avatar src={repo.owner.avatar_url} />
        </ListItemAvatar>

        <ListItemText primary={repo.name} secondary={repo.description} />
        <ListItemSecondaryAction>
          <Switch
            edge='end'
            onChange={toggleNotifications}
            checked={open}
            inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
          />
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List style={{ paddingRight: '7px', backgroundColor: '#fafafa' }} dense disablePadding>
          {
            values.map(value => (
              <ListItem key={value}>
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                  <Switch
                    size='small'
                    edge='end'
                    id={value}
                    onChange={() => handleChange(value)}
                    checked={subscribed ? subscribed.includes(value) : false}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Collapse>
    </>
  )
}

export default Repository

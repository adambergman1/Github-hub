import React, { useEffect, useState, useContext } from 'react'

import { Paper, List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, Switch, CircularProgress } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { UserContext } from '../context/UserContext'

const Repositories = ({ repos }) => {
  const [fullHeight, setFullHeight] = useState(false)
  const [subscribed, setSubscribed] = useState([])
  const [isLoading, setLoading] = useState(false)

  const { activeOrg } = useContext(UserContext)

  const changeHeight = () => {
    setFullHeight(!fullHeight)
  }

  useEffect(() => {
    if (repos[activeOrg]) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [repos, activeOrg])

  const handleToggle = value => () => {
    const currentIndex = subscribed.indexOf(value)
    const newChecked = [...subscribed]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setSubscribed(newChecked)
  }

  useEffect(() => {
    if (subscribed.length > 0) {
      console.log('Subscribed ', subscribed)
    }
  }, [subscribed])

  return (
    <div className='repositories'>
      <Paper>
        <List
          className={!fullHeight ? 'small-height' : ''} dense subheader={
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

                  <ListItemText id='switch-list-label-notifications' primary={repo.name} secondary={repo.description} />
                  <ListItemSecondaryAction>
                    <Switch
                      edge='end'
                      onChange={handleToggle(repo.id)}
                      checked={subscribed.indexOf(repo.id) !== -1}
                      inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
                    />
                  </ListItemSecondaryAction>

                </ListItem>
              )
            }) : (
              <ListItem key='no-repo-items'>No repositories found</ListItem>
            )
          )}
        </List>
      </Paper>
    </div>
  )
}

export default Repositories

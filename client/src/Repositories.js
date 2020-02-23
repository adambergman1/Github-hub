import React, { useEffect, useState } from 'react'

import { List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core'

const Repositories = ({ repos }) => {
  const [subscribed, setSubscribed] = useState([])

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
    if (subscribed) {
      console.log(subscribed)
    }
  }, [subscribed])

  return (
    <List dense='true' subheader={<ListSubheader style={{ background: '#eee' }}>Repositories</ListSubheader>}>
      {repos.map(repo => {
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
      })}
    </List>
  )
}

export default Repositories

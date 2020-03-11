import React, { useState } from 'react'
import { Paper, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const Notifications = () => {
  const [fullHeight, setFullHeight] = useState(false)
  const [notifications, setNotifications] = useState([])

  const changeHeight = () => {
    setFullHeight(!fullHeight)
  }

  useEffect(() => {
    if (user) {
      const socket = new window.WebSocket(`wss://uw9jdvyktk.execute-api.us-east-1.amazonaws.com/dev?userId=${user.id}`)

      socket.addEventListener('open', event => {
        console.log('Socket is open')
      })

      socket.addEventListener('message', event => {
        const data = JSON.parse(event.data)
        console.log('Data from socket', data)
      })
    }
  }, [user])

  return (
    <div className='notifications-feed'>
      <Paper>
        <List
          className={!fullHeight ? 'small-height' : ''}
          subheader={
            <ListSubheader
              style={{ background: '#eee' }}
              className='flex align-center space-between'
            >
              Activity feed based on your subscriptions
              {!fullHeight
                ? <ExpandMoreIcon className='toggle-button' onClick={changeHeight} />
                : <ExpandLessIcon className='toggle-button' onClick={changeHeight} />}
            </ListSubheader>
          }
        >
          {
            notifications.map(n => (
              <ListItem key={n}>
                <ListItemText
                  primary='Single-line item'
                  secondary='Secondary text'
                />
              </ListItem>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}

export default Notifications

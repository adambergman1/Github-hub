import React, { useState, useContext, useEffect } from 'react'
import { GithubContext } from '../context/GithubContext'

import { Paper, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { WebSocketContext } from '../context/WebSocketContext'

const Notifications = () => {
  const [fullHeight, setFullHeight] = useState(false)
  const [notifications, setNotifications] = useState([])

  const { socket, setSocket } = useContext(WebSocketContext)
  const { user } = useContext(GithubContext)

  const changeHeight = () => {
    setFullHeight(!fullHeight)
  }

  // useEffect(() => {
  //   if (user) {
  //     const socket = new window.WebSocket(`wss://uw9jdvyktk.execute-api.us-east-1.amazonaws.com/dev?userId=${user.id}`)
  //     setSocket(socket)

  //     socket.addEventListener('open', event => {
  //       console.log('Socket is open')
  //     })

  //     socket.addEventListener('message', event => {
  //       const data = JSON.parse(event.data)
  //       setNotifications([...notifications, data])
  //     })
  //   }
  // }, [user])

  useEffect(() => {
    console.log(notifications)
    const data = [
      {
        event: 'push',
        repository: 'ab224qr-examination-3',
        pusher: 'WPUtvecklare',
        link: 'https://github.com/1dv023/ab224qr-examination-3'
      }
    ]
    setNotifications([...notifications, data])
  }, [])

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
            notifications.length > 0 && notifications.map(n => (
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

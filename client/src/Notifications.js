import React, { useState } from 'react'
import { Paper, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const Notifications = () => {
  const [fullHeight, setFullHeight] = useState(false)

  const changeHeight = () => {
    setFullHeight(!fullHeight)
  }

  function generate (element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value
      })
    )
  }
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
          {generate(
            <ListItem>
              <ListItemText
                primary='Single-line item'
                secondary='Secondary text'
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </div>
  )
}

export default Notifications

import React from 'react'
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core'

const Notifications = () => {
  function generate (element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value
      })
    )
  }
  return (
    <List subheader={<ListSubheader style={{ background: '#eee' }}>Activity feed based on your subscriptions</ListSubheader>}>
      {generate(
        <ListItem>
          <ListItemText
            primary='Single-line item'
            secondary='Secondary text'
          />
        </ListItem>
      )}
    </List>
  )
}

export default Notifications

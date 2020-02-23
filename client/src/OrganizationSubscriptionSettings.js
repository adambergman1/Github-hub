import React from 'react'

import { Paper, List, ListSubheader, ListItem, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core'

const OrganizationSubscriptionSettings = () => {
  return (
    <Paper>
      <div className='organization-details'>
        <List dense='true' subheader={<ListSubheader style={{ background: '#eee' }}>Select your prefered notification settings</ListSubheader>}>

          <ListItem key='issues'>
            <ListItemText id='switch-list-label-notifications' primary='Issues' secondary='Triggered when an issue is opened, edited, deleted, pinned, unpinned, closed, reopened, assigned, unassigned, labeled, unlabeled, locked, unlocked, transferred, milestoned, or demilestoned.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='membership'>
            <ListItemText id='switch-list-label-notifications' primary='Membership' secondary='Triggered when a user is added or removed from a team.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='organization'>
            <ListItemText id='switch-list-label-notifications' primary='Organization' secondary='Triggered when an organization is deleted and renamed, and when a user is added, removed, or invited to an organization.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='public'>
            <ListItemText id='switch-list-label-notifications' primary='Public' secondary='Triggered when a private repository is made public.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='pull-request'>
            <ListItemText id='switch-list-label-notifications' primary='Pull request' secondary='Triggered when a pull request is assigned, unassigned, labeled, unlabeled, opened, edited, closed, reopened, synchronize, ready for review, locked, unlocked or when a pull request review is requested or removed.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='pull-request-review'>
            <ListItemText id='switch-list-label-notifications' primary='Pull request review' secondary='Triggered when a pull request review is submitted into a non-pending state, the body is edited, or the review is dismissed.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='push'>
            <ListItemText id='switch-list-label-notifications' primary='Push' secondary='Triggered on a push to a repository branch.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='release'>
            <ListItemText id='switch-list-label-notifications' primary='Release' secondary='Triggered when a release is published, unpublished, created, edited, deleted, or prereleased.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='repository'>
            <ListItemText id='switch-list-label-notifications' primary='Repository' secondary='Triggered when a repository is created, archived, unarchived, deleted, renamed, edited, transferred, made public, or made private.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key='team'>
            <ListItemText id='switch-list-label-notifications' primary='Team' secondary='Triggered when an organization team is created, deleted, edited, added to repository, or removed from repository.' />
            <ListItemSecondaryAction>
              <Switch
                edge='end'
                // onChange={handleToggle(repo.id)}
                // checked={subscribed.indexOf(repo.id) !== -1}
                // inputProps={{ 'aria-labelledby': 'switch-list-label-notification' }}
              />
            </ListItemSecondaryAction>
          </ListItem>

        </List>
      </div>
    </Paper>
  )
}

export default OrganizationSubscriptionSettings

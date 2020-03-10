import React, { useEffect, useState, useContext } from 'react'
import Repository from './Repository'

import { Paper, List, ListSubheader, ListItem, ListItemText, CircularProgress } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { GithubContext } from '../context/GithubContext'

const Repositories = () => {
  const [fullHeight, setFullHeight] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { activeOrg, repos } = useContext(GithubContext)

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
            repos[activeOrg] && repos[activeOrg].length ? repos[activeOrg].map((repo, i) => (
              <Repository key={i} repo={repo} />
            )) : (
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

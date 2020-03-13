import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import { AuthContext } from '../../context/AuthContext'
import { GithubContext } from '../../context/GithubContext'
import { WebSocketContext } from '../../context/WebSocketContext'

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext)
  const { user, setUser, setRepos, setOrgs, setActiveOrg } = useContext(GithubContext)
  const { socket } = useContext(WebSocketContext)

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0'
    setAuthenticated(false)
    setUser('')
    setRepos({})
    setOrgs({})
    setActiveOrg('')

    if (socket) {
      socket.close()
    }
  }

  return (
    <AppBar color='primary' position='relative'>
      <Toolbar style={{ alignItems: 'center' }}>

        <Typography style={{ flexGrow: 1 }} variant='h6' noWrap>GitHub-Hub</Typography>

        {
          isAuthenticated && (
            <>
              <IconButton color='inherit' edge='end'>
                <Badge color='primary' variant='dot'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={handleLogout} edge='end' color='inherit'>
                <InputIcon style={{ marginRight: '5px' }} />
                <Typography variant='body2' noWrap>{user ? user.login : ''}</Typography>
              </IconButton>
            </>
          )
        }

      </Toolbar>
    </AppBar>
  )
}

export default Header

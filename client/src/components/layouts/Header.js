import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import { AuthContext } from '../../context/AuthContext'
import { UserContext } from '../../context/UserContext'

const Header = props => {
  const { setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    setToken('')
    setUser('')
    document.cookie = 'token=; Max-Age=0'
  }

  return (
    <div style={{ flexGrow: '1' }}>
      <AppBar color='primary' position='relative'>
        <Toolbar style={{ alignItems: 'center' }}>

          <Typography style={{ flexGrow: 1 }} variant='h6' noWrap>GitHub-Hub</Typography>

          <IconButton color='inherit' edge='end'>
            <Badge color='primary' variant='dot'>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleLogout} edge='end' color='inherit'>
            <InputIcon style={{ marginRight: '5px' }} />
            <Typography variant='body2' noWrap>{user ? user.login : ''}</Typography>
          </IconButton>

        </Toolbar>
      </AppBar>

    </div>
  )
}

export default Header

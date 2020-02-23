import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const Header = props => {
  return (
    <div>
      <AppBar color='primary' position='relative' style={{ marginBottom: '30px' }}>
        <Toolbar>
          <Typography variant='h6'>GitHub-Hub | </Typography>
          <Button href='/' color='inherit'>Dashboard</Button>
          <Button href='/settings' color='inherit'>Settings</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

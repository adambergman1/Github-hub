import React, { useEffect, useContext } from 'react'
import queryString from 'query-string'
import { Button, Paper, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { setCookie, getCookie } from '../helpers/cookies'

import { AuthContext } from '../context/AuthContext'

const clientId = '9e33cf9f01b5b67cb4d6'

const Login = () => {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const userToken = queryString.parse(window.location.search).access_token
    if (userToken) {
      setAuthenticated(true)
      setCookie(userToken)
      window.history.pushState({}, document.title, '/')
    } else {
      const savedCookie = getCookie()
      if (savedCookie) {
        setAuthenticated(true)
      }
    }
  }, [!isAuthenticated])

  return (
    !isAuthenticated && (
      <Paper className='login-area'>
        <h1>GitHub-Hub</h1>
        <Typography style={{ marginBottom: '1em' }}>
          For a better overview of your many repositories spread out along
          different organizations on Github
        </Typography>
        <div className=''>
          <GitHubIcon className='github-icon' />
        </div>
        <Button
          color='primary'
          variant='outlined'
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,repo,admin:repo_hook,admin:org_hook`}
          style={{ marginTop: '10px' }}
        >
          Login
        </Button>
      </Paper>
    )
  )
}
export default Login

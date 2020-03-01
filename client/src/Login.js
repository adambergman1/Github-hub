import React, { useEffect, useContext } from 'react'
import queryString from 'query-string'
import { Button, Paper, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'

import { AuthContext } from './context/AuthContext'

const clientId = '9e33cf9f01b5b67cb4d6'

const Login = () => {
  const { token, setToken } = useContext(AuthContext)

  useEffect(() => {
    const userToken = queryString.parse(window.location.search).access_token
    if (userToken) {
      setToken(userToken)
      setCookie(userToken)
      window.history.pushState({}, document.title, '/')
    } else {
      const savedCookie = getCookie()
      if (savedCookie) {
        setToken(savedCookie)
      }
    }
  }, [token])

  const setCookie = (value) => {
    const date = new Date()
    date.setTime(date.getTime() + (1 * 60 * 60 * 1000))
    document.cookie = 'token=' + value + '; expires=' + date.toUTCString()
  }

  const getCookie = () => {
    const cookie = {}
    document.cookie.split(';').forEach((el) => {
      const [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    return cookie.token
  }

  // useEffect(() => {
  //   const code = queryString.parse(window.location.search).code
  //   if (code) {
  //     window.fetch('https://sls-github.adambergman.me/oauth/callback?code=' + code, {
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then(res => res.json())
  //       .then((result) => console.log(result))
  //     // setToken(userToken)
  //     // window.history.pushState({}, document.title, '/')
  //   }
  // }, [token])

  return (
    !token && (
      <Paper className='login-area'>
        <h1>GitHub-Hub</h1>
        <Typography style={{ marginBottom: '1em' }}>For a better overview of your many repositories spread out along different organizations on Github</Typography>
        <div className=''>
          <GitHubIcon className='github-icon' />
        </div>
        <Button
          color='primary'
          variant='outlined'
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,repo,admin:org_hook`}
          style={{ marginTop: '10px' }}
        >
          Login
        </Button>
      </Paper>
    )
  )
}
export default Login

import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
const clientId = '9e33cf9f01b5b67cb4d6'

function Login ({ history, setToken }) {
  useEffect(() => {
    const userToken = queryString.parse(window.location.search).access_token
    if (userToken) {
      setToken(userToken)
      history.push('/')
    }
  }, [])

  return (
    <div className='login'>
      <div className=''>
        <img src='/github-logo.png' alt='Github logo' />
      </div>
      <a href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,repo,org_hook,admin`}>Login</a>
    </div>
  )
}
export default Login

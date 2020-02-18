import React, { useEffect } from 'react'
import queryString from 'query-string'

const clientId = '9e33cf9f01b5b67cb4d6'

function Login (props) {
  useEffect(() => {
    // const token = queryString.parse(window.location.search).access_token

    // if (token) {
    //   props.history.push('/')
    //   fetchUser()
    // }

    // async function fetchUser () {
    //   return window.fetch('https://api.github.com/user', {
    //     headers: { Authorization: 'token ' + token }
    //   })
    //     .then(response => {
    //       if (response.ok) return response.json()
    //     })
    //     .then(response => {
    //       console.log(response)
    //     })
    // }
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

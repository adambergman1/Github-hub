import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import OrgSelector from './OrgSelector'
import Notifications from './Notifications'
import Repositories from './Repositories'
import OrganizationSubscriptionSettings from './OrganizationSubscriptionSettings'

import { CircularProgress, Grid, Paper } from '@material-ui/core'

function Dashboard () {
  const [isLoading, setLoading] = useState(false)

  const [user, setUser] = useState()
  const [orgs, setOrgs] = useState()
  const [repos, setRepos] = useState()

  const { token } = useContext(AuthContext)

  useEffect(() => {
    fetchData(token, 'user', setUser)
    fetchData(token, 'user/orgs', setOrgs)
  }, [token])

  useEffect(() => {
    if (user) {
      console.log('User: ', user)
    }
  }, [user])

  useEffect(() => {
    if (orgs) {
      console.log('Orgs: ', orgs)
    }
  }, [orgs])

  useEffect(() => {
    if (repos) {
      console.log('Repos: ', repos)
    }
  }, [repos])

  function fetchData (token, path, callback) {
    if (token) {
      setLoading(true)

      window.fetch(`https://api.github.com/${path}`, {
        headers: { Authorization: 'token ' + token }
      }).then((response) => response.json()).then((res) => {
        callback(res)
        setLoading(false)
      })
    }
  }

  function getRepositories (org) {
    fetchData(token, 'orgs/' + org + '/repos?page=1&per_page=30', setRepos)
  }

  return (
    token ? (
      <div className='dashboard'>
        {isLoading &&
          <div className='loading'>
            <p>Loading...</p>
            <CircularProgress />
          </div>}
        {user && <p>Welcome {user.name}</p>}

        <div className='organizations'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {orgs && <OrgSelector orgs={orgs} handleChange={getRepositories} />}
            </Grid>
          </Grid>
        </div>

        <div style={{ flexGrow: '1' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrganizationSubscriptionSettings />
            </Grid>
            <Grid item md={8} xs={12}>
              <Paper>
                {repos && <Repositories repos={repos} />}
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper>
                <Notifications />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    ) : (
      <div>
        Not logged in
      </div>
    )
  )
}
export default Dashboard

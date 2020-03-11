import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { GithubContext } from '../context/GithubContext'

import OrgSelector from './OrgSelector'
import Notifications from './Notifications'
import Repositories from './Repositories'
import OrgSubSettings from './OrgSubSettings'

import { Container, CircularProgress, Grid } from '@material-ui/core'
import { indexArray } from '../helpers'
import { getCookie } from '../helpers/cookies'

function Dashboard () {
  const { isAuthenticated } = useContext(AuthContext)
  const { fetchData, getRepositories, repos, setUser, user, orgs, setOrgs, activeOrg, saveAndSetUser } = useContext(GithubContext)
  const [isLoading, setLoading] = useState(false)

  const token = getCookie()

  useEffect(() => {
    if (token) {
      setLoading(true)
      const url = 'https://api.github.com/'
      Promise.all([
        fetchData(url + 'user', token),
        fetchData(url + 'user/orgs', token)
      ]).then(([userResult, orgsResult]) => {
        setUser(userResult)
        setOrgs(indexArray('login', [userResult, ...orgsResult]))
        setLoading(false)
      })
    }
  }, [token])

  useEffect(() => {
    if (activeOrg && orgs[activeOrg]) {
      getRepositories(token)
      saveAndSetUser()
    }
  }, [activeOrg])

  return (
    isAuthenticated && (
      <main className='dashboard'>
        <Container>
          {isLoading &&
            <div className='loading'>
              <CircularProgress />
            </div>}

          <div className='organizations'>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <OrgSelector orgs={Object.keys(orgs)} />
              </Grid>
            </Grid>
          </div>

          <div style={{ flexGrow: '1' }}>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                {repos && activeOrg ? <Repositories /> : ''}
              </Grid>
              <Grid item md={4} xs={12}>
                <Notifications />
              </Grid>
              {activeOrg !== Object.keys(orgs)[0] && (
                <Grid item xs={12}>
                  <OrgSubSettings orgs={Object.keys(orgs)} />
                </Grid>
              )}
            </Grid>
          </div>
        </Container>
      </main>
    )
  )
}
export default Dashboard

import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { GithubContext } from '../context/GithubContext'

import OrgSelector from './OrgSelector'
import Notifications from './Notifications'
import Repositories from './Repositories'
import OrganizationSubscriptionSettings from './OrganizationSubscriptionSettings'

import { Container, CircularProgress, Grid } from '@material-ui/core'
import { indexArray } from '../helpers'
import { getCookie } from '../helpers/cookies'

function Dashboard () {
  const { isAuthenticated } = useContext(AuthContext)
  const { user, setUser, activeOrg } = useContext(GithubContext)

  const [isLoading, setLoading] = useState(false)
  const [orgs, setOrgs] = useState({})
  const [repos, setRepos] = useState({})

  const token = getCookie()
  const githubURL = 'https://api.github.com/'

  useEffect(() => {
    if (token) {
      Promise.all([fetchData(githubURL + 'user'), fetchData(githubURL + 'user/orgs')])
        .then(([user, orgs]) => {
          setUser(user)
          setOrgs(indexArray('login', [user, ...orgs]))
        })
    }
  }, [token])

  useEffect(() => {
    if (activeOrg) {
      getRepositories()
    }
  }, [activeOrg])

  function fetchData (url) {
    if (token) {
      setLoading(true)

      return window.fetch(url, {
        headers: { Authorization: 'token ' + token }
      }).then((response) => response.json()).then((res) => {
        setLoading(false)
        return res
      })
    }
  }

  function getRepositories (page = '1', perPage = '100') {
    const org = orgs[activeOrg]
    const reposAlreadyFetched = repos[org.login]
    let url = ''

    if (repos) {
      if (!reposAlreadyFetched) {
        if (user.login === org.login) {
          url = `${githubURL}user/repos?page=${page}&per_page=${perPage}`
        } else {
          url = `${org.repos_url}?page=${page}&per_page=${perPage}`
        }
        fetchData(url)
          .then((rs) => {
            const adminRepos = rs.filter(r => r.permissions.admin === true)
            setRepos({ ...repos, [org.login]: adminRepos })
          })
      }
    }
  }

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
                {repos && activeOrg ? <Repositories repos={repos} /> : ''}
              </Grid>
              <Grid item md={4} xs={12}>
                <Notifications />
              </Grid>
              {activeOrg !== Object.keys(orgs)[0] && (
                <Grid item xs={12}>
                  <OrganizationSubscriptionSettings orgs={Object.keys(orgs)} />
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

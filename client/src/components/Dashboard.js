import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'

import OrgSelector from './OrgSelector'
import Notifications from './Notifications'
import Repositories from './Repositories'
import OrganizationSubscriptionSettings from './OrganizationSubscriptionSettings'

import { CircularProgress, Grid } from '@material-ui/core'
import { indexArray } from '../helpers'
// import { getCookie } from '../helpers/cookies'

function Dashboard () {
  const githubURL = 'https://api.github.com/'

  const { token } = useContext(AuthContext)
  // const token = getCookie()

  const { user, setUser, activeOrg } = useContext(UserContext)

  const [isLoading, setLoading] = useState(false)
  const [orgs, setOrgs] = useState({})
  const [repos, setRepos] = useState({})

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

    if (repos) {
      if (!reposAlreadyFetched) {
        if (user.login === org.login) {
          fetchData(`${githubURL}user/repos?page=${page}&per_page=${perPage}`)
            .then(rs => {
              console.log(rs)
              const adminRepos = rs.filter(r => r.permissions.admin === true)
              setRepos({ ...repos, [org.login]: adminRepos })
            })
        } else {
          fetchData(`${org.repos_url}?page=${page}&per_page=${perPage}`)
            .then((rs) => {
              const adminRepos = rs.filter(r => r.permissions.admin === true)
              setRepos({ ...repos, [org.login]: adminRepos })
            })
        }
      }
    }
  }

  return (
    token && (
      <div className='dashboard'>
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
      </div>
    )
  )
}
export default Dashboard

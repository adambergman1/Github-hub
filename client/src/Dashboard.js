import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { UserContext } from './context/UserContext'

import OrgSelector from './OrgSelector'
import Notifications from './Notifications'
import Repositories from './Repositories'
import OrganizationSubscriptionSettings from './OrganizationSubscriptionSettings'

import { CircularProgress, Grid } from '@material-ui/core'
import { indexArray } from './helpers'

function Dashboard () {
  const { token } = useContext(AuthContext)
  const { setUser, activeOrg } = useContext(UserContext)

  const [isLoading, setLoading] = useState(false)
  const [orgs, setOrgs] = useState({})
  const [repos, setRepos] = useState({})

  useEffect(() => {
    if (token) {
      Promise.all([fetchData('user'), fetchData('user/orgs')])
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

  function fetchData (path) {
    if (token) {
      setLoading(true)

      return window.fetch(`https://api.github.com/${path}`, {
        headers: { Authorization: 'token ' + token }
      }).then((response) => response.json()).then((res) => {
        setLoading(false)
        return res
      })
    }
  }

  function getRepositories (page = '1', perPage = '25') {
    const org = orgs[activeOrg]
    const url = `${org.repos_url}?page=${page}&per_page=${perPage}&sort=pushed`

    if (repos) {
      if (!repos[org.login]) {
        window.fetch(url, { headers: { Authorization: 'token ' + token } })
          .then((response) => response.json())
          .then((rs) => {
            const reposWithAdminAccess = rs.filter(r => r.permissions.admin === true)
            setRepos({ ...repos, [org.login]: reposWithAdminAccess })
          })
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
            <Grid item xs={12}>
              <OrganizationSubscriptionSettings />
            </Grid>
            <Grid item md={8} xs={12}>
              {repos && activeOrg ? <Repositories repos={repos} /> : ''}
            </Grid>
            <Grid item md={4} xs={12}>
              <Notifications />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  )
}
export default Dashboard

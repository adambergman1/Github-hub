import React, { createContext, useState } from 'react'
import { getCookie } from '../helpers/cookies'

export const GithubContext = createContext()

const GithubContextProvider = props => {
  const [user, setUser] = useState()
  const [activeOrg, setActiveOrg] = useState()
  const [orgs, setOrgs] = useState({})
  const [repos, setRepos] = useState({})

  const githubURL = 'https://api.github.com/'
  const serverURL = 'https://sls-github.adambergman.me'

  const token = getCookie()

  const fetchData = (url) => {
    if (token) {
      return window.fetch(url, {
        headers: { Authorization: 'token ' + token }
      }).then((response) => response.json()).then((res) => {
        return res
      })
    }
  }

  const getRepositories = (page = '1', perPage = '100') => {
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

  const saveUser = () => {
    window.fetch(serverURL + '/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        username: user.login,
        latestLogin: new Date()
      })
    }).then(res => res.json()).then(result => {
      return result
    })
  }

  return (
    <GithubContext.Provider value={{
      user,
      setUser,
      orgs,
      setOrgs,
      activeOrg,
      setActiveOrg,
      repos,
      setRepos,
      fetchData,
      getRepositories,
      saveUser
    }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubContextProvider

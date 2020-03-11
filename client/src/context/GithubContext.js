import React, { createContext, useState } from 'react'

export const GithubContext = createContext()

const GithubContextProvider = props => {
  const [user, setUser] = useState()
  const [activeOrg, setActiveOrg] = useState()
  const [orgs, setOrgs] = useState({})
  const [repos, setRepos] = useState({})
  const [userSettings, setUserSettings] = useState()

  const githubURL = 'https://api.github.com/'
  const serverURL = 'https://sls-github.adambergman.me'

  const fetchData = (url, token) => {
    if (token) {
      return window.fetch(url, {
        headers: { Authorization: 'token ' + token }
      }).then((response) => response.json())
    }
  }

  const getRepositories = (token, page = '1', perPage = '100') => {
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
        fetchData(url, token)
          .then((rs) => {
            // const adminRepos = rs.filter(r => r.permissions.admin === true)
            // setRepos({ ...repos, [org.login]: adminRepos })
            setRepos({ ...repos, [org.login]: rs })
          })
      }
    }
  }

  const saveAndSetUser = () => {
    window.fetch(serverURL + '/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        username: user.login
      })
    }).then(res => res.json())
      .then(result => setUserSettings(result))
      .catch(err => console.log(err))
  }

  const updateUserSettings = (repoId, data) => {
    const obj = {
      id: userSettings.id,
      repo: { repoId, data }
    }

    window.fetch(serverURL + '/updateUser', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(obj)
    }).catch(err => console.log(err))
  }

  const addHook = (token, url) => {
    const config = {
      name: 'web',
      active: true,
      events: ['release', 'issues', 'push'],
      config: {
        url: serverURL + '/webhook',
        content_type: 'json',
        insecure_ssl: 0
      }
    }

    console.log('Adding hook...', url)

    window.fetch(url, {
      method: 'POST',
      headers: { Authorization: 'token ' + token },
      body: JSON.stringify(config)
    }).then(res => res.json().then(result => {
      return result
    })).catch(err => console.log(err))
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
      saveAndSetUser,
      updateUserSettings,
      userSettings,
      addHook
    }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubContextProvider

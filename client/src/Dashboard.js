import React, { useEffect, useState } from 'react'

function Dashboard (props) {
  const token = props.token

  const [user, setUser] = useState()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    console.log(token)
    async function fetchData (token, path, callback) {
      if (token) {
        const response = await window.fetch(`https://api.github.com/${path}`, {
          headers: { Authorization: 'token ' + token }
        })
        const res = await response.json()
        callback(res)
        setLoading(false)
      }
    }
    setLoading(true)
    fetchData(token, 'user', setUser)
  }, [token])

  useEffect(() => {
    if (user) {
      console.log(user)
    }
  }, [user])

  return (
    <div className='dashboard'>
      {isLoading && <p>Loading user...</p>}
      {user && <p>Welcome {user.name}</p>}
    </div>
  )
}
export default Dashboard

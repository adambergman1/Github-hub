import React, { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserContextProvider = props => {
  const [user, setUser] = useState()
  const [activeOrg, setActiveOrg] = useState()

  // useEffect(() => {
  //   async function saveToDB () {
  //     if (user) {
  //       console.log('Saving user to db...')

  //       const obj = {
  //         id: user.id,
  //         username: user.login,
  //         latestLogin: new Date()
  //       }

  //       const response = await window.fetch('https://sls-github.adambergman.me/user', {
  //         method: 'POST',
  //         mode: 'cors',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(obj)
  //       })

  //       const result = await response.json()
  //       console.log(result)
  //     }
  //   }

  //   saveToDB()
  // }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, activeOrg, setActiveOrg }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

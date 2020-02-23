import React, { useState, createContext } from 'react'

export const UserContext = createContext()

const UserContextProvider = props => {
  const [user, setUser] = useState('')

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

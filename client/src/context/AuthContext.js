import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

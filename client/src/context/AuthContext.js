import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [token, setToken] = useState('')
  const [isAuthenticated, setAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, setAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

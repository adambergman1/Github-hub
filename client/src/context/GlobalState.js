import React, { useState, useReducer } from 'react'

import AppContext from './app-context'

const GlobalState = props => {
  const [token, setToken] = useState()

  return (
    <AppContext.Provider
      value={{ token }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default GlobalState

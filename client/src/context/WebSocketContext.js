import React, { useState, createContext } from 'react'

export const WebSocketContext = createContext()

const WebSocketContextProvider = props => {
  const [socket, setSocket] = useState()

  return (
    <WebSocketContext.Provider value={{ socket, setSocket }}>
      {props.children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketContextProvider

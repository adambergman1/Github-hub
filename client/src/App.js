import React from 'react'

import Login from './components/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import GithubContextProvider from './context/GithubContext'
import AuthContextProvider from './context/AuthContext'
import WebSocketContextProvider from './context/WebSocketContext'

function App () {
  return (
    <div className='App'>
      <AuthContextProvider>
        <GithubContextProvider>
          <WebSocketContextProvider>
            <Header />
            <Dashboard />
          </WebSocketContextProvider>
          <Login />
        </GithubContextProvider>
      </AuthContextProvider>
      <Footer />
    </div>
  )
}

export default App

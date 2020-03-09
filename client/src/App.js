import React from 'react'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import GithubContextProvider from './context/GithubContext'
import AuthContextProvider from './context/AuthContext'
import UserContextProvider from './context/UserContext'

function App () {
  return (
    <div className='App'>
      <AuthContextProvider>
        <GithubContextProvider>
          <UserContextProvider>
            <Header />
            <Dashboard />
          </UserContextProvider>
          <Login />
        </GithubContextProvider>
      </AuthContextProvider>
      <Footer />
    </div>
  )
}

export default App

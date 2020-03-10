import React from 'react'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import GithubContextProvider from './context/GithubContext'
import AuthContextProvider from './context/AuthContext'

function App () {
  return (
    <div className='App'>
      <AuthContextProvider>
        <GithubContextProvider>
          <Header />
          <Dashboard />
          <Login />
        </GithubContextProvider>
      </AuthContextProvider>
      <Footer />
    </div>
  )
}

export default App

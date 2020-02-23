import React from 'react'

import Login from './Login'
import Dashboard from './Dashboard'
import Header from './Header'
import Footer from './Footer'

import AuthContextProvider from './context/AuthContext'
import UserContextProvider from './context/UserContext'

import { Container } from '@material-ui/core'

function App () {
  return (
    <div className='App'>
      <Container>
        <AuthContextProvider>
          <UserContextProvider>
            <Header />
            <Dashboard />
          </UserContextProvider>
          <Login />
        </AuthContextProvider>
        <Footer />
      </Container>
    </div>
  )
}

export default App

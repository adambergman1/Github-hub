import React from 'react'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

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

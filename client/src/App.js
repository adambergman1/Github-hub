import React from 'react'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'
import Header from './Header'
import AuthContextProvider from './context/AuthContext'

import { Container } from '@material-ui/core'

function App () {
  // const { token } = useContext(AuthContext)
  return (
    <div className='App'>
      <Container style={{ textAlign: 'center' }}>
        <AuthContextProvider>
          <Header />
          <Login />
          <Dashboard />

          {/* <BrowserRouter>
          <Switch>
            {
              !token ? (
                <Route exact path='/' component={Login} />
              )
                : (
                  <Route exact path='/' component={Dashboard} />
                )
            }
          </Switch>
        </BrowserRouter> */}
        </AuthContextProvider>
      </Container>
    </div>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from './Login'

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </Router>
    </div>
  )
}

export default App

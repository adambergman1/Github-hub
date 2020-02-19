import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Login from './Login'
import Dashboard from './Dashboard'

function App () {
  const [token, setToken] = useState(false)
  console.log(token)
  return (
    <div className='App'>
      <Router>
        <Switch>
          {
            !token ? <Route path='/' render={props => <Login setToken={setToken} {...props} />} />
              : (
                <Route path='/' render={props => <Dashboard token={token} {...props} />} />
              )
          }
        </Switch>
      </Router>
    </div>
  )
}

export default App

// const propsToComponent = (Component, props) => routeProps => <Component {...props} {...routeProps} />

//       <Router>
//         <Switch>
//           {
//             !token ? <Route path='/' render={propsToComponent(Login, { setToken })} />
//               : (
//                 <Route path='/' render={propsToComponent(Dashboard, { token })} />
//               )
//           }
//         </Switch>
//       </Router>

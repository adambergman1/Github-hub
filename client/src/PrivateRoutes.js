import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from './Login'

function PrivateRoutes ({ component: Component, ...rest }) {
  return (
  // <Route
  //   {...rest}
  //   render={props =>
  //     token ? <Component {...props} />
  //       : <Redirect to={{
  //         pathname: '/login',
  //         pure: false
  //       }}
  //         />}
  // />

    <Route
      {...rest} render={(props) => (
        token
          ? <Component {...props} />
          : <Login />
      )}
    />
  )
}
export default PrivateRoutes

import React from 'react'
import { useRecoilState } from 'recoil'
import { authenticationState } from '../../../store/recoil/authentication/authentication.atom'

import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({component: Component, ...rest}:any) => {
const [authState,setAuthState] = useRecoilState(authenticationState)
  return (
        <Route
            {...rest}
            render={props => (authState.isAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>)}
        />
  )
}

export default PrivateRoute
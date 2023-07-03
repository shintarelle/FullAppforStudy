import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../router'
import { AuthContext } from '../context'
import { useContext } from 'react'
import Loader from './UI/loader/Loader'

export default function AppRouter() {

  const { isAuth,isLoading } = useContext(AuthContext)

  if (isLoading) {
return <Loader />
  }

  return (
    isAuth
      ?
      <Switch>
        {privateRoutes.map(rout =>
          <Route key={rout.path} path={rout.path} component={rout.component} exact={rout.exact} />
        )}
          <Redirect to="/posts" />
      </Switch>
      :
      <Switch>
        {publicRoutes.map(rout =>
          <Route key={rout.path} path={rout.path} component={rout.component} exact={rout.exact} />
        )}
          <Redirect to="/login" />
      </Switch>

  )
}

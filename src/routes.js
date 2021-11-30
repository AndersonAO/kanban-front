import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './contexts/AuthContext';

import Login from './pages/Login/';
import Kanban from './pages/Kanban';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/logout" component={Login} logoff/>
      <CustomRoute isPrivate exact path="/" component={Kanban} />
    </Switch>
  );
}
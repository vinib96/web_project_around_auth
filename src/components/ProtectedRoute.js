import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component, isLoggedIn }) => {
  return (
    <Route path='/'>{isLoggedIn ? component : <Redirect to='/login' />}</Route>
  );
};

export default ProtectedRoute;

import React from 'react'
import '../../App.css'
import {Route , Switch , useRouteMatch } from 'react-router-dom'
import SignUp from './Signup';
import LoginForm from './LoginForm';
import PrivateRoute from '../pages/PrivateRoute'
import Profile from './Profile';
import ResetPassword from './ResetPassword';

const Login = () => {
    const { path } = useRouteMatch();

    return (
      <>
        <h1 className="login">{'Authentication'.UpperFirstLetter()}</h1>
        <Switch>
          <PrivateRoute exact path={path} component={Profile} />
          <Route path={`${path}/signup`} component={SignUp} />
          <Route path={`${path}/login-form`} component={LoginForm} />
          <Route path="/login/reset-password" component={ResetPassword} />
        </Switch>
      </>
    );
}; 

export default Login

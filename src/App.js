import React, { useState } from 'react';
import { BrowserRouter, Route, Switch , Redirect, useParams } from 'react-router-dom';

import './sass/App.scss'
import {  isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

import Home from './components/pages/Home';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';
import ProfilePage from './components/pages/Profile/Index';
import Header from './components/Layout/Header';
import PrivateRoute from './components/Routes/PrivateRoute';
import Loder from './components/helper/Loder';
import RestroDetails from './components/pages/RestroPage';
import ScrollToTop from './components/helper/Loder/ScrollToTop';

function App() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <BrowserRouter>
      <Route component={Header} />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/loader" component={Loder} />
        <Route  path="/restro/:restroId?" component={RestroDetails} />
        <PrivateRoute exact path="/profile/:userID?" component={ProfilePage} />

        {
          !isEmpty(auth) ? <Redirect to={`/profile/${auth.uid}`} /> : <Route path="/login" component={LoginPage} />
        }
        {
          !isEmpty(auth) ? <Redirect to={`/profile/${auth.uid}`} /> : <Route path="/registration" component={RegisterPage} />
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;

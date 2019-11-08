import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {NotificationContainer} from 'react-notifications';
import PrivateRoute from './utils/privateRoute'

import Dashboard from './components/dashboard'
import CandidateIndex from './components/candidateIndex'
import AddUpdateCandidate from './components/addUpdateCandidate'
import CandidateDetails from './components/candidateDetails'
import cdemo from './components/cdemo'
import SignIn from './components/signIn'
import SignOut from './components/signOut'

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path = '/' component = {Dashboard}></PrivateRoute>
          <Route exact path = '/cdemo' component = {cdemo}></Route>
          <PrivateRoute exact path = '/candidates' component = {CandidateIndex}></PrivateRoute>
          <PrivateRoute exact path = '/addcandidate' component = {AddUpdateCandidate}></PrivateRoute>
          <PrivateRoute exact path = '/updatecandidate' component = {AddUpdateCandidate}></PrivateRoute>
          <PrivateRoute exact path = '/candidatedetails' component = {CandidateDetails}></PrivateRoute>
          <Route exact path = '/signin' component = {SignIn}></Route>
          <Route exact path = '/signout' component = {SignOut}></Route>
        </Switch>
        <NotificationContainer></NotificationContainer>
      </Router>
    )
  }
}

export default App

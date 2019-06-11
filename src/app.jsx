import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './index.scss';
import Welcome from './components/container/Welcome';
import Signup from './components/Auth/Signup';
import Redirect from './components/Auth/Redirect';
import Login from './components/Auth/login';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/signup" component={Signup} />
      <Route path="/redirect" component={Redirect} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;

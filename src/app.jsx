import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './index.scss';
import Welcome from './components/container/Welcome';
import AppBar from './components/functional/navBar';

const App = () => (
  <Router>
    <AppBar />
    <Switch>
      <Route exact path="/" component={Welcome} />
    </Switch>
  </Router>
);

export default App;

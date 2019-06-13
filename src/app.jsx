import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import './index.scss';
import AppBar from './components/functional/navBar';
import Welcome from './components/container/Welcome';
import Signup from './components/Auth/Signup';
import Redirect from './components/Auth/Redirect';

// Temporary functional components will be deleted after project setup.
const Home = () => (
  <div className="container">
    <h1 className="app-title">Home</h1>
    <p>
      <Link to="/sign-up">Sign up Now </Link>
    </p>
  </div>
);

const About = () => (
  <div className="container">
    <h1 className="app-title" style={{ color: '#099EBF' }}>
      About
    </h1>
    <p>
      <Link to="/">home </Link>
    </p>
  </div>
);

const SignUp = () => (
  <div className="container">
    <h1 className="app-title" style={{ color: '#09BF86' }}>
      Sign up
    </h1>
    <p>
      <Link to="/about">About </Link>
    </p>
  </div>
);

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/sign-up" component={Signup} />
      <Route path="/redirect" component={Redirect} />
    </Switch>
  </Router>
);

export default App;

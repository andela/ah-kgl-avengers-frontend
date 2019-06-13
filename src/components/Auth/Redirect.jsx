import React, { Component } from 'react';
import {
  Card,
} from 'reactstrap';

class Redirect extends Component {
  state = {
  }

  render() {
    return (
      <div className="auth-container">
        <Card body className="col-sm-8 col-md-6 col-lg-4 mt-5 w3-card shadow-lg">
          <h3>Email Confirmation</h3>
          <p>
          You can Reach to the inbox of your email you have provided,
          We have sent you the confirmation email
          </p>
        </Card>
      </div>
    );
  }
}

export default Redirect;

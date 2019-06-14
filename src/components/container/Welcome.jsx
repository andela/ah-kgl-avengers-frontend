import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Navigation from '../functional/navigation';
import Footer from '../functional/footer';
import AppBar from '../functional/navBar';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <AppBar />
        <Container>
          <Navigation />
          {/* Article container will be placed here } */}
          <Footer />
        </Container>
      </Fragment>
    );
  }
}

export default connect()(Welcome);

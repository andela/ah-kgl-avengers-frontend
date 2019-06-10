import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { Container } from 'reactstrap';
import welcomeAction from '../../redux/action-creators/welcome';
import Navigation from '../functional/navigation';
import Footer from '../functional/footer';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { welcome } = this.props;
    welcome();
  }

  render() {
    return (
      <Container>
        <Navigation />
        {/* Article container will be placed here } */}
        <Footer />
      </Container>
    );
  }
}

// Do the props validations
Welcome.propTypes = {
  welcome: PropType.func.isRequired,
};

// Add the dispatch action creator to the props
const mapDispatchToProps = dispatch => ({
  welcome: () => dispatch(welcomeAction()),
});

// Add the response return in the current state to the props
const mapStateToProps = state => ({
  response: state.welcomeMessage,
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(Welcome);

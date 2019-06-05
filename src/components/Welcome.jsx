import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import welcomeAction from '../redux/action-creators/welcome';

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
    const { response } = this.props;
    return (
      <div className="container">
        <h1 className="app-title">Authors Haven</h1>
        { response !== undefined && <p>{response.message}</p>}
      </div>
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

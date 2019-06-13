import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import Card from '../functional/card';
import Modal from '../functional/resetModal';
import Logo from '../../assets/images/ah_logo.png';
import { requestReset as resetPassword } from '../../redux/action-creators/resetPassword';

class ResetPassword extends Component {
  state = {
    email: '',
    modal: false,
  }

  toggle = () => {
    const { modal } = this.state;
    const { history } = this.props;
    this.setState({ modal: !modal });
    if (modal === true) history.push('/');
  }

  passwordReset = async () => {
    const { email } = this.state;
    if (email.trim().length < 1) {
      this.setState({ emailError: 'Email is required to reset password' });
      return;
    }
    if (!email.includes('@')) {
      this.setState({ emailError: 'Provided email is not valid' });
      return;
    }
    const { requestReset } = this.props;
    const { payload } = await requestReset({ email });
    if (payload.status === 404) this.setState({ emailError: 'This email doesn\'t exist' });
    if (payload.status === 200) this.toggle();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, emailError: '' });
  }

  render() {
    const { emailError, modal } = this.state;
    return (
      <Card>
        <Modal modal={modal} toggle={this.toggle} />
        <Link to="/" style={{ margin: '0 auto' }}>
          <img src={Logo} alt="logo" />
        </Link>
        <h2>Reset Password</h2>
        <p className="pt-3">
          Follow the instructions sent to your email to reset your password.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" id="email" name="email" onChange={this.handleChange} placeholder="Enter your email" />
            <div className="errors">{emailError}</div>
          </FormGroup>
          <FormGroup>
            <Button outline block id="reset" color="success" type="submit" onClick={this.passwordReset} name="submit">Reset</Button>
          </FormGroup>
        </Form>
      </Card>
    );
  }
}

ResetPassword.propTypes = {
  requestReset: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

// Add the dispatch action creator to the props
const mapDispatchToProps = dispatch => ({
  requestReset: email => dispatch(resetPassword(email)),
});


const mapStateToProps = state => ({
  reset: state.reset,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

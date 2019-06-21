import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import Card from '../functional/card';
import Logo from '../../assets/images/ah_logo.png';
import { changePassword as updatePassword } from '../../redux/action-creators/resetPassword';

class UpdatePassword extends Component {
  state = {
    passError: '',
    confError: '',
    password: '',
    password2: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, passError: '', confError: '' });
  }

  changePass = async () => {
    const { password, password2 } = this.state;
    const { changePassword, history, match } = this.props;
    if (password.length < 1 || password2.length < 1) {
      this.setState({
        passError: 'Password is required',
        confError: 'Password confirmation is required',
      });
      return;
    }

    if (password !== password2) {
      this.setState({ confError: 'Passwords don\'t match' });
      return;
    }

    const requestData = {
      token: match.params.token,
      body: { password, password2 },
    };
    const response = await changePassword(requestData);
    if (response.payload.status === 200) history.push('/login');
  }

  render() {
    const { passError, confError } = this.state;
    return (
      <Card>
        <Link to="/" style={{ margin: '0 auto' }}>
          <img src={Logo} alt="logo" />
        </Link>
        <h2 className="mb-5">Update password</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id="password" name="password" onChange={this.handleChange} placeholder="Enter your password" />
            <div className="errors">{passError}</div>
          </FormGroup>
          <FormGroup>
            <Label for="password2">Confirm Password</Label>
            <Input type="password" id="password2" name="password2" onChange={this.handleChange} placeholder="Enter password confirmation" />
            <div className="errors">{confError}</div>
          </FormGroup>
          <FormGroup>
            <Button block outline color="success" type="submit" onClick={this.changePass} name="submit">Update</Button>
          </FormGroup>
        </Form>
      </Card>
    );
  }
}

UpdatePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  updatePassword: state.update,
});

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(updatePassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);

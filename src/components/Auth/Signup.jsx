import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Side from './Side';
import img from '../../assets/developers_2_A1_Rectangle_58_pattern.png';
import { userRegister, registerLoad } from '../../redux/action-creators/signup';
import SocialLogin from './socialLogin';

export class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    hidden: true,
  };

  componentDidUpdate() {
    const { user } = this.props;
    const { message } = user;
    this.notifySuccess(message);
  }

  notifySuccess = (successMessage) => {
    toast(successMessage, {
      className: 'mt-5 text-primary',
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  notifyError = (message) => {
    toast.error(message);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { registerSubmit, history, errors } = this.props;
    const { username, email, password } = this.state;

    if (username.trim().length < 1) {
      this.setState({ usernameError: 'Username is Required' });
    }

    if (email.trim().length < 1) {
      this.setState({ emailError: 'Email is not Valid' });
    }

    if (password.trim().length < 1) {
      this.setState({
        passwordError: 'Password is Required',
      });
    }

    if (password.trim().length < 8 && password.length > 1) {
      this.setState({
        passwordError: 'Password has to be more than 8 characters',
      });
    }

    if (errors[0] === 'user with this username already exists') {
      this.setState({
        usernameError: 'user with this username already exists',
      });
    }

    if (errors[0] === 'user with this email already exists') {
      this.setState({
        emailError: 'user with this email already exists',
      });
    }
    registerSubmit({ username, email, password }).then((res) => {
      if (res.response !== undefined && res.response.data.status === 400) {
        this.notifyError(res.response.data.errors[0]);
      }
      if (res.payload.status === 201) {
        history.push('/redirect');
      }
    });
  };

  toggleShow = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  };

  render() {
    const {
      username,
      password,
      email,
      usernameError,
      emailError,
      passwordError,
      hidden,
    } = this.state;
    return (
      <Fragment>
        <div className="wrapper">
          <section className="col-12 col-lg-12 col-md-10 col-sm-10">
            <div className="container shadow">
              <div className="row">
                <div className="col-12  col-md-4 col-lg-5 signup-container text-center">
                  <Side img={img} />
                </div>
                <div className="col-12 col-md-8 col-lg-7 sign-up">
                  <Form>
                    <h3 className="sign-up-title mt-4 text-center">
                      sign
                      <span>up</span>
                    </h3>
                    <FormGroup>
                      <Label className="label-color">username</Label>
                      <Input
                        className="input-color"
                        type="username"
                        name="username"
                        placeholder="snow"
                        onChange={this.onChange}
                        value={username}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="label-color">Email</Label>
                      <Input
                        className="input-color"
                        type="email"
                        name="email"
                        placeholder="snowice@company.com"
                        onChange={this.onChange}
                        value={email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="label-color">Password</Label>
                      <Input
                        className="input-color"
                        type={hidden ? 'password' : 'text'}
                        name="password"
                        placeholder="password"
                        pattern="[a-zA-Z0-9]"
                        onChange={this.onChange}
                        value={password}
                      />
                      <button
                        type="button"
                        className="btn-toggle-password"
                        onClick={this.toggleShow}
                      >
                        <i className="zmdi zmdi-eye" />
                      </button>
                    </FormGroup>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={this.onSubmit}
                        className="sign-up-btn"
                      >
                        Signup
                      </button>
                      <SocialLogin login="sign up" />
                    </div>
                    <div className="sign-up-footer border rounded-sm">
                      <div className="lead conditional-text-01 ml-4">
                        Already have an account?
                        <Link to="/login"><span className="lead small font-weight-bolder text-primary"> sign in </span></Link>
                      </div>
                      <Link to="/">
                        <div className="lead small font-weight-bolder text-primary float-right mt-3 mb-3 pt-3">
                          <i className="d-none d-md-inline mr-1 zmdi zmdi-home" />
                        Go back Home
                        </div>
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
  reload: () => dispatch(registerLoad()),
  registerSubmit: ({ username, email, password }) => dispatch(
    userRegister({
      username,
      email,
      password,
      ownProps,
    }),
  ),
});

Register.propTypes = {
  registerSubmit: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Array),
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object),
};

export const mapStateToProps = ({ user }) => ({
  username: user.register.username,
  user: user.user,
  email: user.register.email,
  password: user.register.password,
  message: user.register.message,
  errors: user.register.localErrors,
});

Register.defaultProps = {
  errors: [],
  user: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

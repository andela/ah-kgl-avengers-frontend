import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Side from './Side';
import img from '../../assets/developers_2_A1_Rectangle_58_pattern.png';
import { userRegister, registerLoad } from '../../redux/action-creators/signup';

export class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    hidden: true,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
          <section className="col-12 col-lg-8 col-md-10 col-sm-10">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-7 signup-container text-center">
                  <Side img={img} />
                </div>
                <div className="col-12 col-md-10 col-lg-5 sign-up">
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
                      <div className="errors">
                        <div className="error">{usernameError}</div>
                      </div>
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
                      <div className="errors">
                        <div className="error">{emailError}</div>
                      </div>
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
                      <div className="errors">
                        <div className="error">{passwordError}</div>
                      </div>
                    </FormGroup>
                    <div className="text-center mb-4">
                      <button
                        type="button"
                        onClick={this.onSubmit}
                        className="sign-up-btn"
                      >
                        Signup
                      </button>
                    </div>

                    <div className="sign-up-footer">
                      <p>
                        Already have an account?
                        <Link to="/login"> sign in</Link>
                      </p>
                      <p>
                        <Link to="/">Back</Link>
                      </p>
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
};

export const mapStateToProps = ({ user }) => ({
  username: user.register.username,
  email: user.register.email,
  password: user.register.password,
  message: user.register.message,
  errors: user.errors,
});

Register.defaultProps = {
  errors: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

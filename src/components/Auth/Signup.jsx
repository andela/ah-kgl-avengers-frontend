import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Side from './Side';
import Nav from './Nav';
import img from '../../assets/developers_2_A1_Rectangle_58_pattern.png';
import { registerFormSend, userRegister } from '../../redux/action-creators/signup';

class Register extends Component {
  state = {
    validEmail: true,
    emailError: 'Invalid email',
    validPassword: true,
    passwordError: 'Minimum 6 characters',
    validUsername: true,
    usernameError: 'Required',
  };

  onChange = (e) => {
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  }

  render() {
    const {
      username,
      password1,
      password2,
      email,
      formSend,
    } = this.props;
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
                  <Form onSubmit={this.onSubmit}>
                    <h3 className="sign-up-title mt-4 text-center">
                    sign
                      <span>up</span>
                    </h3>
                    <FormGroup>
                      <Label className="label-color">username</Label>
                      <Input className="input-color" type="username" name="username" placeholder="snow" onChange={this.onChange} value={username} />
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
                        type="password"
                        name="password1"
                        placeholder="password"
                        pattern="[a-zA-Z0-9]"
                        onChange={this.onChange}
                        value={password1}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="label-color">Confirm Password</Label>
                      <Input
                        className="input-color"
                        type="password"
                        name="password2"
                        placeholder="password"
                        pattern="[a-zA-Z0-9]"
                        onChange={this.onChange}
                        value={password2}
                      />
                    </FormGroup>
                    <div className="text-center mb-4">
                      <button type="button" className="sign-up-btn">Signup</button>
                    </div>

                    <div className="sign-up-footer">
                      <p>
                      Already have an account?
                        <a href="../signinTemplate/signin.html"> sign in</a>
                      </p>
                      <p>
                      By signing up you agree to all
                        <Link to="/"> Terms and conditions</Link>
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
  onInputChange: ({ field, value }) => dispatch(registerFormSend({ field, value })),
  registerSubmit: ({ username, email, password }) => dispatch(
    userRegister({
      username,
      email,
      password,
      ownProps,
    }),
  ),
});

export const mapStateToProps = state => ({
  username: state.register.username,
  email: state.register.email,
  password: state.register.password,
  message: state.register.message,
  errors: state.register.errors,
  submitting: state.register.formSend,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

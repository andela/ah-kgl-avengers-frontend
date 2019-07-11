import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import Side from './Side';
import img from '../../assets/sign-in-img.png';
import { userLogin } from '../../redux/action-creators/user';
import SocialLogin from './socialLogin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passError: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    this.notifyError(errors[0]);
    if (errors instanceof Array === true) {
      errors.forEach((error) => {
        if (error.includes('email')) {
          this.setState({
            emailError: error,
          });
        } else {
          this.setState({
            passError: error,
          });
        }
      });
    }
  }


  componentDidUpdate(prevProps) {
    const { user, history } = this.props;
    if (user.username !== prevProps.user.username) {
      history.push('/');
    }
  }

  notifySuccess = (successMessage) => {
    toast(successMessage, {
      className: 'mt-5 text-primary',
    });
  }

  notifyError = (message) => {
    toast.error(message);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ emailError: '', passError: '' });
  };

  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { userLogin: login } = this.props;
    login({ email, password });
  };

  render() {
    const {
      email, password, emailError, passError,
    } = this.state;
    return (
      <Fragment>
        <div className="wrapper">
          <section className="col-12 col-lg-8 col-md-10 col-sm-10">
            <div className="container shadow">
              <div className="row">
                <div className="col-12  col-md-4 col-lg-5 signup-container text-center">
                  <Side img={img} />
                </div>
                <div className="col-12 col-md-8 col-lg-7 sign-up">
                  <Form>
                    <h3 className="sign-up-title mt-4 text-center">
                      sign
                      <span>in</span>
                    </h3>
                    <FormGroup>
                      <Label className="label-color">Email</Label>
                      <Input
                        className="input-color"
                        type="email"
                        name="email"
                        placeholder="abc@company.com"
                        onChange={this.onChange}
                        value={email}
                        isrequired="true"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="label-color">Password</Label>
                      <Input
                        className="input-color"
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.onChange}
                        value={password}
                        isrequired="true"
                      />
                    </FormGroup>
                    <div className="text-center">
                      <button
                        type="button"
                        value="button"
                        onClick={this.login}
                        className="sign-up-btn"
                      >
                        Login
                      </button>
                      <SocialLogin login="login  " />
                    </div>
                    <div className="sign-up-footer border rounded-sm">
                      <div className="row">
                        <div className="lead conditional-text-01 ml-4">
                        Forget your password?
                          <Link to="/reset">
                            {' '}
                            <span className="lead small font-weight-bolder text-primary">Reset</span>
                          </Link>
                        </div>
                        <div className="conditional-text-02">
                        Do not have an account yet?
                          <Link to="/signup">
                            {' '}
                            <span className="lead small font-weight-bolder text-primary">sign up</span>
                          </Link>
                        </div>

                      </div>
                      <Link to="/">
                        <p className="lead small font-weight-bolder text-primary float-right mt-4 pt-3">
                          <i className="d-none d-md-inline mt-4 mr-1 zmdi zmdi-home" />
                        Go back Home
                        </p>
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

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Array),
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object),
};

Login.defaultProps = {
  errors: [],
  user: {},
};

export const mapStateToProps = ({ user }) => ({
  errors: user.localErrors,
  user: user.user,
  googleUser: user.googleUser,
  facebookUser: user.facebookUser,
});

export default connect(
  mapStateToProps,
  { userLogin },
)(Login);

import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import Side from './Side';
import img from '../../assets/sign-in-img.png';
import userLogin from '../../redux/action-creators/user';


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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
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

  componentDidUpdate(prevProps) {
    const { user, history } = this.props;
    if (user.username !== prevProps.user.username) {
      history.push('/');
    }
  }

  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { userLogin: login } = this.props;
    login({ email, password });
  }

  render() {
    const {
      email, password, emailError, passError,
    } = this.state;

    // let redirectUser = null;

    // if(this.props.username !== null) {
    //   console.log(this.props.username);
    //   redirectUser = <Redirect to="/" />
    // }

    return (
      <Fragment>
        {/*{redirectUser} */}
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
                        isrequired
                      />
                      <div className="errors">
                        <div className="error">{emailError}</div>
                      </div>
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
                        isrequired
                      />
                      <div className="errors">
                        <div className="error">{passError}</div>
                      </div>
                    </FormGroup>
                    <div className="text-center mb-4">
                      <button type="button" value="button" onClick={this.login} className="sign-up-btn">Login</button>
                    </div>

                    <div className="sign-up-footer">
                      <p>
                        Don't have an account?
                        <Link to="/signup"> sign up</Link>
                      </p>
                      <p>
                        <Link to="/"> Home</Link>
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


Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Array),
};


Login.defaultProps = {
  errors: [],
};

export const mapStateToProps = ({ user }) => ({
  errors: user.user.errors,
  user: user.user,
});

export default connect(mapStateToProps, { userLogin })(Login);

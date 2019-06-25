import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  googleSocialAccess,
  facebookSocialAccess,
  removeErrorMessage,
} from '../../redux/action-creators/user';

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialUser: null,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const {
        errors, removeErrorMessage: reloadErrors, history, login,
      } = this.props;
      if (errors.status === 422) {
        const url = `${login.split(' ')[0]}${login.split(' ')[1]}`;
        reloadErrors();
        history.push(url);
      }
    }, 4000);
  }

  componentWillReceiveProps({ errors, googleUser, facebookUser }) {
    this.setState({ socialUser: errors.message, googleUser, facebookUser });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  responseGoogle = ({ response, provider }) => {
    const { googleSocialAccess: google } = this.props;
    const { accessToken } = response;
    google(accessToken, provider);
  };

  responseFacebook = ({ response, provider }) => {
    const { facebookSocialAccess: facebook } = this.props;
    const { accessToken } = response;
    facebook(accessToken, provider);
  };

  handleButtonDisplayName = (accessProvider) => {
    const { login } = this.props;
    return `${login} with ${accessProvider}`;
  };

  onErrors = (errorMessage) => {
    const { history } = this.props;
    const { socialUser, facebookUser, googleUser } = this.state;
    if (socialUser === undefined && (googleUser || facebookUser)) {
      return history.push('/');
    }

    const googleProvider = socialUser.includes('google');
    const facebookProvider = socialUser.includes('facebook');
    if (facebookProvider) {
      return (
        <div>
          <div className="social-caret-error-on">
            <div className="triangle-caret-on">
              <i className="zmdi zmdi-caret-up zmdi-hc-3x triangle-caret" />
            </div>
            <span className="btn btn-danger social-error-fb">
              <span>{errorMessage}</span>
            </span>
          </div>
        </div>
      );
    }
    if (googleProvider) {
      return (
        <div>
          <div className="social-caret-error-on">
            <div className="triangle-caret-fb">
              <i className="zmdi zmdi-caret-up zmdi-hc-3x triangle-caret" />
            </div>
            <span className="btn btn-danger social-error">
              <span>{errorMessage}</span>
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    const { socialUser } = this.state;
    const onSocialErrors = socialUser === null ? null : this.onErrors(socialUser);

    return (
      <div className="social-login-buttons">
        <p className="lead text-black-50 text-center">or with</p>
        <div className="social-login-buttons-google">
          {' '}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button
                type="button"
                className="btn btn-outline-dark social-spacing-google  social-login-buttons"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <span className="">
                  <i className="d-none d-md-inline mr-2 zmdi zmdi-google" />
                </span>
                {this.handleButtonDisplayName('google')}
              </button>
            )}
            buttonText="Login in with google"
            onSuccess={response => this.responseGoogle({ response, provider: 'google-plus' })}
            onFailure={response => this.responseGoogle({ response, provider: 'google-plus' })}
            cookiePolicy="single_host_origin"
          />

          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={response => this.responseFacebook({ response, provider: 'facebook' })}
            render={renderProps => (
              <button
                type="button"
                className="btn btn-outline-primary social-spacing-facebook"
                onClick={renderProps.onClick}
              >
                <span className="">
                  <i className="d-none d-md-inline mr-2 zmdi zmdi-facebook zmdi-hc-fw" />
                </span>
                {this.handleButtonDisplayName('facebook')}
              </button>
            )}
            cssClass="btn btn-outline-primary social-spacing-facebook"
            icon={(
              <span className="social-separator-facebook">
                <i className="d-none d-md-inline mr-2 zmdi zmdi-facebook zmdi-hc-fw" />
              </span>
)}
          />
        </div>

        <div>{onSocialErrors}</div>
      </div>
    );
  }
}

export const mapStateToProps = ({ user }) => ({
  errors: user.errors,
  user: user.user,
  googleUser: user.googleUser,
  facebookUser: user.facebookUser,
});

SocialLogin.propTypes = {
  errors: PropTypes.instanceOf(Object),
  googleUser: PropTypes.instanceOf(Object),
  facebookUser: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
  googleSocialAccess: PropTypes.func.isRequired,
  facebookSocialAccess: PropTypes.func.isRequired,
  removeErrorMessage: PropTypes.func.isRequired,
  login: PropTypes.string,
};

SocialLogin.defaultProps = {
  errors: {},
  googleUser: {},
  facebookUser: {},
  login: 'string',
};

export default withRouter(
  connect(
    mapStateToProps,
    { googleSocialAccess, facebookSocialAccess, removeErrorMessage },
  )(SocialLogin),
);

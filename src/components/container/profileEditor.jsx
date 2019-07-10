import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Container,
} from 'reactstrap';
import { updateUser, getUser } from '../../redux/action-creators/profile';
import Footer from '../functional/footer';
import AppBar from '../functional/navBar';
import ImageAvatar from '../imageAvatar';
import upLoader from '../../helpers/imageUpLoader';

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLocal: null,
    };
  }

  /**
   * check if the logged in user is the one accessing this profile page
   * i.e: the user name in URL params should match the username from the token
   */
  componentDidMount() {
    const { onGetUser, match, history } = this.props;
    const { username } = match.params;
    // TODO: check if the user object has data and discard the request
    let user = localStorage.getItem('user');
    user = user ? JSON.parse(user) : {};
    if (user.username !== username) {
      return history.push(`/${username}`);
    }
    return onGetUser(username);
  }

  /**
   * input onChange event handler
   * sets the state variable with name of the target input to the inputs value
   */
  handelChange = (evt) => {
    evt.preventDefault();
    // TODO: add validations
    this.setState({ [evt.target.name]: evt.target.value });
  };

  /**
   * event handler
   * calls upLoader with the file and sets the imageLocal state variable
   */
  handleFileInput = async (evt) => {
    evt.preventDefault();
    const [file] = evt.target.files;
    const image = await upLoader(file);
    if (image && image.default) {
      this.setState({ imageLocal: image.default });
    }
  };

  /**
   * submit button onClick event handler
   * calls onUpdateUser action creator to save user info and update the state
   */
  handleUpdate = () => {
    const { onUpdateUser, profile, match } = this.props;
    const { username } = match.params;
    const {
      userName = username, bio, imageLocal, firstName, lastName,
    } = this.state;

    const data = {
      userName,
      firstName: firstName || profile.firstName,
      lastName: lastName || profile.lastName,
      bio: bio || profile.bio,
      image: imageLocal || profile.image,
    };
    onUpdateUser({ username: userName, data });
  };

  handleCancelUpdate = (evt) => {
    evt.preventDefault();
    const { history, profile } = this.props;
    history.push(`/${profile.username}`);
  };

  render() {
    const { imageLocal } = this.state;
    const { user, profile, isRequestOn } = this.props;
    const {
      username: userName, bio, image, firstName, lastName,
    } = profile;
    return (
      <Fragment>
        <AppBar image={user.username === userName ? imageLocal || image : ''} minimal />
        <Container className="container-profile-editor">
          <div className="container-fluid">
            <div className="row">
              <h3 className="page-heading pl-md-3 pl-1 pt-1 pb-2">Update your profile</h3>
              {isRequestOn && (
                <div className="status-progress">
                  <span>Saving&nbsp;</span>
                  <i className="zmdi zmdi-spinner zmdi-hc-spin" />
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12 col-md-9 profile-input-container">
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">firstname</Label>
                    <Input
                      type="text"
                      name="firstName"
                      defaultValue={firstName}
                      id="firstName"
                      placeholder="Your first name"
                      onChange={this.handelChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">lastname</Label>
                    <Input
                      type="text"
                      name="lastName"
                      defaultValue={lastName}
                      id="lastName"
                      placeholder="Your last name"
                      onChange={this.handelChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">username</Label>
                    <Input type="text" name="userName" value={userName} id="userName" disabled />
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleText">bio</Label>
                    <Input
                      type="textarea"
                      name="bio"
                      id="bio"
                      defaultValue={bio}
                      placeholder="Your bio"
                      onChange={this.handelChange}
                    />
                  </FormGroup>
                </Form>
                <div className="update-profile-btn-group">
                  <button
                    href="#"
                    className="btn btn-icon btn-update-cancel"
                    type="button"
                    onClick={this.handleCancelUpdate}
                  >
                    <i className="material-icons">cancel</i>
                    cancel
                  </button>
                  <button
                    className="btn btn-icon btn-update-profile"
                    type="button"
                    onClick={this.handleUpdate}
                  >
                    <i className="material-icons">save</i>
                    save
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-3 profile-img-container-holder">
                <div className="profile-img-container">
                  <ImageAvatar
                    className="profile-img"
                    image={imageLocal || image}
                    alt={userName}
                    firstName={lastName}
                    lastName={lastName}
                  />

                  <label htmlFor="image-input" className="btn btn-icon btn-change-profile">
                    <i className="zmdi zmdi-upload" />
                    &nbsp; CHANGE
                    <input
                      id="image-input"
                      type="file"
                      className="profile-img-loader"
                      onInput={this.handleFileInput}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </Container>
      </Fragment>
    );
  }
}

ProfileEditor.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  onGetUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  isRequestOn: PropTypes.bool.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ user: userReducer }) => {
  const {
    user, isRequestOn, userArticles: articles, profile,
  } = userReducer;
  return {
    user,
    profile,
    articles,
    isRequestOn,
  };
};

export default connect(
  mapStateToProps,
  { onUpdateUser: updateUser, onGetUser: getUser },
)(ProfileEditor);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, TabContent, TabPane } from 'reactstrap';
import { toast } from 'react-toastify';
import { getUser } from '../../redux/action-creators/profile';
import AppBar from '../functional/navBar';
import { FollowerView, FollowingView } from '../singleArticle';
import helper from '../../helpers/decodeToken';
import ImageAvatar from '../imageAvatar';
import {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
} from '../../redux/action-creators/user';

export class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedInUser: false,
      activeTab: '1',
    };
  }

  componentDidMount() {
    const {
      onGetUser, match, getFollowers, getFollowing,
    } = this.props;
    const { username } = match.params;
    // call get user profile action creator
    onGetUser(username);
    getFollowers(username);
    getFollowing(username);
    // check if the user logged in is the profile owner
    const loggedInUser = helper.decodeToken();
    if (loggedInUser && loggedInUser.username === username) {
      this.setState({ isLoggedInUser: true });
    }
  }

  notifySuccess = (username) => {
    toast(`You have success followed ${username}`);
  };

  notifyError = (message) => {
    toast.error(message);
  };

  notifyUnFollow = (message) => {
    toast(`You have successfully unFollowed ${message}`);
  };

  renderFollowers = followers => followers.map(follower => (
    <FollowerView
      follower={follower}
      key={Math.random()}
      followEvent={async (username) => {
        const followBack = await this.props.follow(username);
        if (
          followBack.payload !== undefined
            && followBack.payload.status === 201
        ) {
          await this.props.getFollowing(this.props.user.username);
          this.notifySuccess(follower.username);
        }
        if (followBack.response.data.status === 400) {
          return this.notifyError(this.props.errors.message);
        }
        if (followBack.response.status === 401) {
          return this.notifyError(followBack.response.data.error === 'jwt malformed' ? 'Please Login to Follow' : followBack.response.data.error)  ;
        }
        return null;
      }}
    />
  ));

  renderFollowing = following => following.map(follower => (
    <FollowingView
      follower={follower}
      key={Math.random()}
      unfollowEvent={async (username) => {
        const unFollowMe = await this.props.unFollow(username);
        if (
          unFollowMe.payload !== undefined
            && unFollowMe.payload.status === 200
        ) {
          await this.props.getFollowing(this.props.user.username);
          this.notifyUnFollow(follower.username);
        }
        if (unFollowMe.response.status === 401) {
          return this.notifyError(unFollowMe.response.data.error === 'jwt malformed' ? 'Please Login to unFollow' : unFollowMe.response.data.error);
        }
      }}
    />
  ));

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      isRequestOn, followers, following, profile,
    } = this.props;
    const {
      username: userName,
      bio,
      image,
      firstName,
      lastName,
      email = 'No email',
    } = profile;
    const { activeTab } = this.state;
    return (
      <Fragment>
        <AppBar image={image} minimal />
        <Container className="container-profile-view">
          <div className="container-fluid">
            <div className="row py-3">
              <div className="col-12 col-md-6 px-3 pt-1 px-md-5">
                <div className="profile-names">
                  <span
                    className={`profile-name ${firstName
                      && 'profile-names-hasvalue'}`}
                  >
                    {`${firstName || 'unkown'} ${lastName || 'unkown'}`}
                  </span>
                  &nbsp;
                  <span className="profile-username">{`@${userName}`}</span>
                </div>

                <div className="profile-user-email">
                  <i className="material-icons">email</i>
                  {email}
                </div>
                <div>Bio</div>
                <div className="profile-user-bio">{bio || 'no bio yet'}</div>
                <div className="profile-btn-group">
                  <button
                    className="btn btn-icon btn-profile-followers"
                    type="button"
                  >
                    <i className="material-icons">supervisor_account</i>
                    {followers === undefined ? null : followers.data.count}
                    {' '}
                    followers
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="profile-img-container">
                  <ImageAvatar
                    className="profile-img"
                    image={image}
                    alt={userName}
                    firstName={lastName}
                    lastName={lastName}
                  />
                </div>
              </div>
            </div>
            <div className="profile-articles-title">
              <button
                type="button"
                className={
                  activeTab === '1'
                    ? 'btn mr-2 mb-2 btn-primary'
                    : 'btn mr-2 mb-2 btn-light text-secondary'
                }
                onClick={() => {
                  this.toggle('1');
                }}
              >
                <span>
                  {`${
                    followers === undefined ? 0 : followers.data.count
                  } Followers`}
                </span>
              </button>
              <button
                type="button"
                className={
                  activeTab === '2'
                    ? 'btn ml-2 mb-2 btn-primary'
                    : 'btn ml-2 mb-2 btn-light text-secondary'
                }
                onClick={() => {
                  this.toggle('2');
                }}
              >
                <span>
                  {`${
                    following === undefined ? 0 : following.data.count
                  } Following`}
                </span>
              </button>
            </div>
            {isRequestOn && (
              <div className="article-request-loading">
                Loading&nbsp;
                <i className="zmdi zmdi-spinner zmdi-hc-spin" />
              </div>
            )}
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="row">
                  {followers !== undefined ? (
                    this.renderFollowers(followers.data.followers)
                  ) : (
                    <div className="profile-no-articles">No Followers yet</div>
                  )}
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="row">
                  {following !== undefined ? (
                    this.renderFollowing(following.data.followers)
                  ) : (
                    <div className="profile-no-articles">
                      No articles published yet
                    </div>
                  )}
                </div>
              </TabPane>
            </TabContent>
          </div>
        </Container>
      </Fragment>
    );
  }
}

Follow.propTypes = {
  profile: PropTypes.instanceOf(Object),
  onGetUser: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  isRequestOn: PropTypes.bool.isRequired,
  getFollowers: PropTypes.func.isRequired,
  getFollowing: PropTypes.func.isRequired,
  followers: PropTypes.instanceOf(Object).isRequired,
  following: PropTypes.instanceOf(Object).isRequired,
};

Follow.defaultProps = {
  profile: {},
};

const mapStateToProps = ({ user: userReducer }) => {
  const {
    user,
    isRequestOn,
    userArticles: articles,
    followers,
    following,
    errors,
    profile,
  } = userReducer;
  return {
    user,
    articles,
    isRequestOn,
    followers,
    following,
    errors,
    profile,
  };
};

export default connect(
  mapStateToProps,
  {
    onGetUser: getUser,
    getFollowers,
    getFollowing,
    follow,
    unFollow,
  },
)(Follow);

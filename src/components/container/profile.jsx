import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Pagination, PaginationItem, PaginationLink, Container,
} from 'reactstrap';
import { getUser } from '../../redux/action-creators/profile';
import Footer from '../functional/footer';
import AppBar from '../functional/navBar';
import { ArticleView } from '../singleArticle';
import helper from '../../helpers/decodeToken';
import ImageAvatar from '../imageAvatar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedInUser: false,
      currentPage: 0,
      pageSize: 6,
      start: 0,
    };
  }

  componentDidMount() {
    const { onGetUser, match } = this.props;
    const { username } = match.params;
    // call get user profile action creator
    onGetUser(username);
    // check if the user logged in is the profile owner
    const loggedInUser = helper.decodeToken();
    if (loggedInUser && loggedInUser.username === username) {
      this.setState({ isLoggedInUser: true });
    }
  }

  handleClick = (i) => {
    const { pageSize } = this.state;
    this.setState({
      currentPage: i,
      start: i * pageSize,
    });
  };

  renderArticles = articles => articles.map(
    article => <ArticleView article={article} key={article.slug} />,
  );

  render() {
    const {
      isLoggedInUser, currentPage, pageSize, start,
    } = this.state;
    const end = start + pageSize;
    const { user, isRequestOn, articles } = this.props;
    const pages = Math.ceil(articles.length / pageSize);
    const views = articles.slice(start, end);
    const {
      username: userName, bio, image, firstName, lastName, email = 'No email',
    } = user;
    return (
      <Fragment>
        <AppBar image={image} minimal />
        <Container className="container-profile-view">
          <div className="container-fluid">
            <div className="row py-3">
              <div className="col-12 col-md-6 px-3 pt-1 px-md-5">
                <div className="profile-names">
                  <span className={`profile-name ${firstName && 'profile-names-hasvalue'}`}>
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
                  <button className="btn btn-icon btn-profile-followers" type="button">
                    <i className="material-icons">supervisor_account</i>
                    0 followers
                  </button>
                  {isLoggedInUser ? (
                    <Link
                      className="btn btn-icon btn-edit-profile"
                      type="button"
                      to={`/${userName}/edit`}
                    >
                      <i className="material-icons">edit</i>
                      Update
                    </Link>
                  ) : (
                    <button className="btn btn-icon btn-follow-profile" type="button">
                      <i className="material-icons">account_circle</i>
                      follow
                    </button>
                  )}
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
            <div className="profile-articles-title">{`Written by ${userName}`}</div>
            {isRequestOn && (
            <div className="article-request-loading">
Loading&nbsp;
              <i className="zmdi zmdi-spinner zmdi-hc-spin" />
            </div>
            )}
            <div className="row profile">
              <div className="col-12 main-articles profile-articles-container">
                {articles.length > 0 ? this.renderArticles(views) : (<div className="profile-no-articles">No articles published yet</div>)}
              </div>
              <hr />
              {(pages > 1) && (
              <div className="pagination-wrapper">
                <Pagination aria-label="Page navigation example">

                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      onClick={e => this.handleClick(e, currentPage - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>
                  {
                    [...Array(pages)].map((page, i) => (
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={() => this.handleClick(i)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  }
                  <PaginationItem disabled={currentPage === pages - 1}>
                    <PaginationLink
                      onClick={e => this.handleClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </div>
              )}

            </div>
          </div>
          <Footer />
        </Container>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.instanceOf(Object),
  onGetUser: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array),
  isRequestOn: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  user: [],
  articles: [],
};

const mapStateToProps = ({ user: userReducer }) => {
  const {
    user, isRequestOn, userArticles: articles,
  } = userReducer;
  return {
    user,
    articles,
    isRequestOn,
  };
};

export default connect(
  mapStateToProps,
  { onGetUser: getUser },
)(Profile);

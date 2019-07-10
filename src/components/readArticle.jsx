import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import '@fortawesome/fontawesome-free/js/all';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import ImageAvatar from './imageAvatar';
import Description from './description';
import ArticleTitle from './articleTitle';
import ArticleCreatedDate from './date';
import ReadTime from './readTime';
import UserName from './userNames';
import TextArea from './textArea';
import {
  readArticle,
  resetArticle,
  likeArticle,
  dislikeArticle,
} from '../redux/action-creators/readArticle';
import readArticleHelper from '../helpers/readArticle';
import Navbar from './functional/navBar';
import rateArticle from '../redux/action-creators/rateArticle';
import {
  follow,
  unFollow,
  getFollowers,
  getFollowing,
} from '../redux/action-creators/user';
import userLoggedIns from '../helpers/decodeToken';

class ReadArticle extends Component {
  state = {
    isFollowed: false,
  };

  componentDidMount() {
    const user = userLoggedIns.decodeToken();
    const { match } = this.props;
    const { params } = match;
    const { readArticles, getFollowers, getFollowing } = this.props;
    readArticles(params.slug).then((res) => {
      getFollowers(res.payload.author.username);
      getFollowing(res.payload.author.username);
    });
  }

  componentDidUpdate(prevProps) {
    const { error, success, likeErrors } = this.props;
    if (error !== '' && prevProps.error !== undefined && error !== prevProps.error) {
      this.notifyError(error === 'jwt malformed' ? 'Please Login to rate this article' : error);
    }

    if (success !== '' && prevProps.success !== undefined) {
      this.notifyRateSuccess(success);
    }

    if (likeErrors !== prevProps.likeErrors) {
      this.notifyError(likeErrors.error === 'jwt malformed' ? 'Please Login' : likeErrors.error);
    }
  }

  componentWillUnmount() {
    const { reset } = this.props;
    reset();
  }

  notifyError = (message) => {
    toast.error(message);
  };

  rate = async (value) => {
    const {
      rateArticle: request, article,
    } = this.props;
    const newRating = {
      rating: value,
    };
    await request(newRating, article.slug);
  };

  likeArts = async (slug) => {
    const { likeArticles } = this.props;
    likeArticles(slug);
  };

  dislikeArts = (slug) => {
    const { dislikeArticles } = this.props;
    dislikeArticles(slug);
  };

  renderTags = (tags) => {
    if (tags.length > 0) {
      return tags.map(tag => (
        <div className="chip article-tag" key={tag}>
          {`${tag}`}
        </div>
      ));
    }
    return null;
  };

  notifySuccess = (username) => {
    toast(`You have successfully followed ${username}`);
  };

  notifyUnFollow = (username) => {
    toast(`You have successfully unFollowed ${username}`);
  };

  notifyRateSuccess = (message) => {
    toast(message);
  };

  follow = async (username) => {
    const {
      follow, getFollowers,
    } = this.props;
    follow(username).then(async (res) => {
      if (res.payload === undefined && res.response.data.status === 401) {
        this.notifyError(res.response.data.error === 'jwt malformed' ? 'Please Login to follow this author' : 'userErrors.error');
      }
      if (res.payload !== undefined && res.payload.data.status === 201) {
        this.notifySuccess(username.username);
        getFollowers(res.payload.data.profile.username);
      }

      if (res.payload === undefined && res.response.status === 400) {
        this.notifyError(res.response.data.message);
      }
    });
  };

  unFollow = (username) => {
    const {
      unFollow, getFollowers, userErrors,
    } = this.props;
    unFollow(username).then(async (res) => {
      if (res.payload === undefined && res.response.data.status === 401) {
        this.notifyError(res.response.data.error === 'jwt malformed' ? 'Please Login to unFollow this author' : userErrors.error);
      }

      if (res.payload !== undefined && res.payload.data.status === 200) {
        this.notifyUnFollow(username.username);
        getFollowers(res.payload.data.profile.username);
      }

      if (res.payload === undefined && res.response.status === 400) {
        this.notifyError(res.response.data.message);
      }
    });
  };

  render() {
    const {
      article, likes, dislikes, newLikes, success,
    } = this.props;

    if (!Object.prototype.hasOwnProperty.call(article, 'body')) return null;

    const {
      title,
      body,
      readTime,
      author,
      createdAt,
      tagList,
      ratings,
      totalRatings,
      description,
    } = article;

    const newBody = ReactHtmlParser(body);
    const formatDate = readArticleHelper.timeFormat(createdAt);
    return (
      <Fragment>
        <Navbar />
        {/*
        /* Heading and
        /* Description section
        */}

        <section className="col-lg-8 col-md-8 col-sm-10 pt-4 col-lg-offset-3 col-md-offset-3 mx-auto">
          <div className="container">
            <ArticleTitle className="display-5 text-md-left">
              {title}
            </ArticleTitle>
            <Description className="text-lg-left text-md-left text-sm-left text-black-50 mb-2 mb-lg-8">
              {description}
            </Description>
          </div>
        </section>
        {/*
        /* User Avatar,
        /* User Name,
        /* Follow or unFollow Status,
        /* Date and
        /* Read Time section
        */}
        <section className="col-lg-8 col-lx-8 col-md-8 col-sm-10 col-lg-offset-4 mx-auto col-md-6 pt-2">
          <div className="container pl-5">
            <div className="row align-items-left">
              <ImageAvatar />
              <div>
                <div className="row align-items-center">
                  <UserName className="lead lead-un-sm lead-un-md lead-un-lg text-left text-md-left text-black-50 ml-4 mt-2">
                    {author.username}
                  </UserName>
                  {userLoggedIns.decodeToken() !== null
                    && userLoggedIns.decodeToken().username
                    === author.username ? null : (
                      <div>
                        <button
                          type="button"
                          onClick={() => this.follow(author)}
                          className="btn-follow-author"
                        >
                          Follow
                        </button>
                      </div>
                    )}
                </div>
                <div className="row align-items-center">
                  <ArticleCreatedDate className="lead lead-rt-sm text-left text-md-left text-black-50 ml-4">
                    {formatDate}
                  </ArticleCreatedDate>
                  <ReadTime className="lead lead-rt-sm text-left text-md-left text-black-50  ml-2">
                    {readTime}
                  </ReadTime>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
        /* Reading Text section
        /* Social links side section
        */}

        <section className="col-lg-8 col-md-8 col-sm-10 pt-4 col-lg-offset-3 col-md-offset-3 mx-auto">
          <div className="container">
            <TextArea className="text-lg-left text-justify text-md-left text-sm-left text-black-50 mb-2 mb-lg-8">
              {newBody}
            </TextArea>
          </div>
          <div>
            <span className="message">{success}</span>
          </div>

          <div className="author-details border d-flex justify-content-between rounded-lg mt-4 mb-5 p-3 row align-items-center">
            <div>
              <Rating
                className="small-icon"
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                initialRating={ratings}
                readonly
              />
              <span>
                {ratings}
                <span> out of </span>
                <span className="mr-1">{totalRatings}</span>
                <span>time(s)</span>
              </span>
            </div>
            <span className="ml-3">
              Rate this article:
              <Rating
                className="ratings"
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                fractions={1}
                initialRating={0}
                start={0}
                stop={5}
                step={1}
                onClick={this.rate}
              />
            </span>

            <div className="article-likes row mr-2">
              <div className="ml-1">
                <button
                  type="button"
                  onClick={() => this.likeArts(article.slug)}
                  className="btn-follow-author"
                >
                  <i className="zmdi zmdi-thumb-up mr-2" />
                  {newLikes === undefined
                    ? likes
                    : newLikes.data.article.likes}
                  {' '}
                  likes
                </button>
              </div>
              <div className="mr-1">
                <button
                  type="button"
                  onClick={() => this.dislikeArts(article.slug)}
                  className="dislike"
                >
                  <i className="zmdi zmdi-thumb-down mr-2" />
                  {newLikes === undefined
                    ? dislikes
                    : newLikes.data.article.dislikes}
                  {' '}
                  dislikes
                </button>
              </div>
            </div>
          </div>
          {tagList && (
            <div className="article-taglist">{this.renderTags(tagList)}</div>
          )}
        </section>
      </Fragment>
    );
  }
}

ReadArticle.defaultProps = {
  error: '',
  success: '',
};

ReadArticle.propTypes = {
  readArticles: PropTypes.func.isRequired,
  likeArticles: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  article: PropTypes.instanceOf(Object).isRequired,
  dislikeArticles: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  newLikes: PropTypes.instanceOf(Object).isRequired,
  likeErrors: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ article: articleReducer, user }) => ({
  article: articleReducer.article,
  error: articleReducer.error,
  success: articleReducer.success,
  likes: articleReducer.article.likes,
  dislikes: articleReducer.article.dislikes,
  newLikes: articleReducer.newLiked,
  authorFollowers: user.followers,
  userErrors: user.errors,
  likeErrors: articleReducer.likedErrors,
});

export default connect(
  mapStateToProps,
  {
    readArticles: readArticle,
    likeArticles: likeArticle,
    dislikeArticles: dislikeArticle,
    reset: resetArticle,
    rateArticle,
    follow,
    unFollow,
    getFollowers,
    getFollowing,
  },
)(ReadArticle);

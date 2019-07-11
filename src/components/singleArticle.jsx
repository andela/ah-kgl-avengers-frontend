import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import propTypes from 'prop-types';
import Chip from './functional/chip';
import ImageAvatar from './imageAvatar';

const renderTags = (tags) => {
  if (tags.length > 0) {
    return tags.slice(0, 5).map(tag => <Chip key={tag} value={tag} />);
  }
  return null;
};

const ArticleView = ({
  article, className, bookmark, hideUser,
}) => {
  if (Object.prototype.hasOwnProperty.call(article, 'User')) {
    Object.defineProperty(article, 'author', { value: article.User });
  }

  return (
    <div className={`article-container ${className}`}>
      <Link to={`/articles/${article.slug}`}>
        <div className="article-img">
          <img src={article.featuredImage} alt={article.title} />
        </div>
        <h3 className="title">{article.title}</h3>
        <p className="article-description">{article.description}</p>
      </Link>
      <div className="article-meta">
        <div>
          {!hideUser && (
            <Link to={`/${article.author.username}`} className="author-name">
              {/* <span className="author-name"> */}
              <i className="zmdi zmdi-face mr-1" />
              {article.author.username}
              {/* </span> */}
            </Link>
          )}
          <div className="date-and-read-time">
            <span className="publication-date">
              <i className="zmdi zmdi-calendar mr-1" />
              &nbsp;
              {moment(article.updatedAt).format('ll')}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="read-time">
              <i className="zmdi zmdi-time" />
              &nbsp;
              {article.readTime}
            </span>
          </div>
          <div className="mt-3 mb-3 ml-0">{renderTags(article.tagList)}</div>
        </div>
        <button
          className="btn btn-icon btn-bookmark"
          type="button"
          onClick={() => bookmark(article.slug)}
        >
          <i className="material-icons">bookmark_border</i>
        </button>
      </div>
    </div>
  );
};

const TrendingArticleView = ({ article, id, bookmark }) => (
  <div className="trending-article">
    <div className="order">{id}</div>
    <div className="trending-article-container">
      <Link to={`/articles/${article.slug}`}>
        <h3 className="title">{article.title}</h3>
      </Link>
      <Link to={`/${article.author.username}`}>
        <span className="author-name">{article.author.username}</span>
      </Link>
      <span className="publication-date">
        <i className="zmdi zmdi-calendar" />
        &nbsp;
        {moment(article.updatedAt).format('ll')}
      </span>
      <span className="read-time">
        <i className="zmdi zmdi-time" />
        &nbsp;
        {article.readTime}
      </span>
    </div>
    <button
      className="btn btn-icon btn-bookmark"
      type="button"
      onClick={() => bookmark(article.slug)}
    >
      <i className="material-icons">bookmark_border</i>
    </button>
  </div>
);

const FollowerView = ({ follower, followEvent }) => (
  <div className="col-12 ">
    <div className="followers-container">
      <div className="follower-content">
        <div className="follower-img">
          {follower.image === null ? <ImageAvatar /> : <img src={follower.image} alt="" />}
        </div>
        <div className="profile-names">
          <span className="profile-name">{follower.username}</span>
        </div>
        <button
          type="button"
          className="btn btn-icon btn-follow-profile"
          onClick={() => followEvent(follower)}
        >
          <i className="material-icons">account_circle</i>
          Follow Back
        </button>
      </div>
    </div>
  </div>
);

const FollowingView = ({ follower, unfollowEvent }) => (
  <div className="col-12 ">
    <div className="followers-container">
      <div className="follower-content">
        <div className="follower-img">
          {follower.image === null ? <ImageAvatar /> : <img src={follower.image} alt="" />}
        </div>
        <div className="profile-names">
          <span className="profile-name">{follower.username}</span>
        </div>
        <button
          type="button"
          className="btn btn-icon btn-follow-profile"
          onClick={() => unfollowEvent(follower)}
        >
          <i className="material-icons">account_circle</i>
          UnFollow
        </button>
      </div>
    </div>
  </div>
);

ArticleView.propTypes = {
  bookmark: propTypes.func,
  article: propTypes.objectOf(propTypes.any).isRequired,
  className: propTypes.string,
  hideUser: propTypes.bool,
};

TrendingArticleView.propTypes = {
  bookmark: propTypes.func,
  article: propTypes.objectOf(propTypes.any).isRequired,
  id: propTypes.number.isRequired,
};

TrendingArticleView.defaultProps = {
  bookmark: undefined,
};

ArticleView.defaultProps = {
  className: '',
  hideUser: false,
  bookmark: undefined,
};

export {
  ArticleView, TrendingArticleView, FollowerView, FollowingView,
};

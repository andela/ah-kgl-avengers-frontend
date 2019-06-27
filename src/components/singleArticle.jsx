import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import propTypes from 'prop-types';
import Chip from './functional/chip';

const renderTags = (tags) => {
  if (tags.length > 0) {
    return tags.slice(0, 5).map(tag => <Chip key={tag} value={tag} />);
  }
  return null;
};

const ArticleView = ({ article, className }) => {
  if (article.User) {
    article.author = article.User;
  }
  return (
    <Link className={`article-container ${className}`} to={`/articles/${article.slug}`}>
      <div className="article-img">
        <img src={article.featuredImage} alt={article.title} />
      </div>
      <h3 className="title font-weight-bolder">{article.title}</h3>
      <p className="article-description">{article.description}</p>
      <div className="article-meta">
        <div>
          <span className="author-name">
            <i className="zmdi zmdi-face mr-1" />
            {article.author.username}
          </span>
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
        <button className="btn btn-icon btn-bookmark" type="button">
          <i className="material-icons">bookmark_border</i>
        </button>
      </div>
    </Link>
  );
};

const TrendingArticleView = ({ article, id }) => (
  <Link className="trending-article" to={`/articles/${article.slug}`}>
    <div className="order pr-3">{`${id}.`}</div>
    <div className="trending-article-container">
      <h3 className="side-head-title">{article.title}</h3>
      <span className="author-name">
        <i className="zmdi zmdi-face mr-1" />
        {article.author.username}
      </span>
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
    <button className="btn btn-icon btn-bookmark" type="button">
      <i className="material-icons">bookmark_border</i>
    </button>
  </Link>
);

ArticleView.propTypes = {
  article: propTypes.objectOf(propTypes.any).isRequired,
  className: propTypes.string,
};

TrendingArticleView.propTypes = {
  article: propTypes.objectOf(propTypes.any).isRequired,
  id: propTypes.number.isRequired,
};

ArticleView.defaultProps = {
  className: '',
};

export { ArticleView, TrendingArticleView };

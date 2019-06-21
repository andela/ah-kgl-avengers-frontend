import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import propTypes from 'prop-types';

const ArticleView = ({ article, className }) => (
  <Link className={`article-container ${className}`} to={`/articles/${article.slug}`}>
    <div className="article-img">
      <img src={article.featuredImage} alt={article.title} />
    </div>
    <h3 className="title">{article.title}</h3>
    <p className="article-description">{article.description}</p>
    <div className="article-meta">
      <div>
        <span className="author-name">{article.author.username}</span>
        <div>
          <span className="publication-date">
            <i className="zmdi zmdi-calendar" />
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
      </div>
      <button className="btn btn-icon btn-bookmark" type="button">
        <i className="material-icons">bookmark_border</i>
      </button>
    </div>
  </Link>
);

const TrendingArticleView = ({ article, id }) => (
  <Link className="trending-article" to={`/articles/${article.slug}`}>
    <div className="order">{id}</div>
    <div className="trending-article-container">
      <h3 className="title">{article.title}</h3>
      <span className="author-name">{article.author.username}</span>
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

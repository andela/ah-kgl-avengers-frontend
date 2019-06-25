import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import '@fortawesome/fontawesome-free/js/all';
import Rating from 'react-rating';
import ImageAvatar from './imageAvatar';
import Description from './description';
import ArticleTitle from './articleTitle';
import Status from './status';
import ArticleCreatedDate from './date';
import ReadTime from './readTime';
import UserName from './userNames';
import TextArea from './textArea';
import {
  readArticle,
  likeArticle,
  dislikeArticle,
} from '../redux/action-creators/readArticle';
import readArticleHelper from '../helpers/readArticle';
import Footer from './functional/footer';
import Navbar from './functional/navBar';
import rateArticle from '../redux/action-creators/rateArticle';

class ReadArticle extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { readArticles } = this.props;
    readArticles(params.slug);
  }

  rate = (value) => {
    const { rateArticle: request, article } = this.props;
    const newRating = {
      rating: value,
    };
    request(newRating, article.slug);
  }

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
          {`#${tag}`}
        </div>
      ));
    }
    return null;
  };

  render() {
    const {
      article, likes, dislikes, newLikes, error, success,
    } = this.props;

    if (!Object.prototype.hasOwnProperty.call(article, 'body')) return null;

    const {
      title, body, readTime, author, createdAt, tagList, ratings, totalRatings,
    } = article;

    const newBody = ReactHtmlParser(body);
    const desc = readArticleHelper.description(body);
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
              {desc}
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
                  <Status className="btn-follow-author">Follow</Status>
                </div>
                <div className="row align-items-center">
                  <ArticleCreatedDate className="lead lead-rt-sm text-left text-md-left text-black-50 ml-4">
                    {formatDate}
                  </ArticleCreatedDate>
                  <ReadTime className="lead lead-rt-sm text-left text-md-left text-black-50  ml-2">
                    {readTime}
                  </ReadTime>
                  <Rating
                    className="small-icon"
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star"
                    initialRating={ratings}
                    readonly
                  />
                </div>
                <div className="author-details row align-items-center">
                  Average rating: &nbsp;
                  {ratings}
                /5 out of &nbsp;
                  {totalRatings}
                  {' '}
                ratings
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
          <div><span className="error">{error}</span></div>
          <div><span className="message">{success}</span></div>
          <div className="article-likes mb-1 mt-2">
            <div>
              <button
                type="button"
                onClick={() => this.likeArts(article.slug)}
                className="btn-follow-author"
              >
                <i className="zmdi zmdi-thumb-up mr-2" />
                {newLikes === undefined ? likes : newLikes.data.article.likes}
                {' '}
              likes
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => this.dislikeArts(article.slug)}
                className="dislike"
              >
                <i className="zmdi zmdi-thumb-down mr-2" />
                {newLikes === undefined ? dislikes : newLikes.data.article.dislikes}
                {' '}
              dislikes
              </button>
            </div>
          </div>
          {tagList && (
            <div className="article-taglist">{this.renderTags(tagList)}</div>
          )}
          <Footer />
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
  error: PropTypes.string,
  success: PropTypes.string,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  newLikes: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ article: articleReducer }) => ({
  article: articleReducer.article,
  error: articleReducer.error,
  success: articleReducer.success,
  likes: articleReducer.article.likes,
  dislikes: articleReducer.article.dislikes,
  newLikes: articleReducer.newLiked,
});

export default connect(
  mapStateToProps,
  {
    readArticles: readArticle,
    likeArticles: likeArticle,
    dislikeArticles: dislikeArticle,
    rateArticle,
  },
)(ReadArticle);

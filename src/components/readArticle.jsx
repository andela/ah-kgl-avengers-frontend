import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import '../scss/readArticle.scss';
import ImageAvatar from './imageAvatar';
import Description from './description';
import ArticleTitle from './articleTitle';
import Status from './status';
import ArticleCreatedDate from './date';
import ReadTime from './readTime';
import UserName from './userNames';
import TextArea from './textArea';
import readArticle from '../redux/action-creators/readArticle';
import readArticleHelper from '../helpers/readArticle';
import Footer from './functional/footer';
import Navbar from './functional/navBar';

class ReadArticle extends Component {
  state = {};

  componentDidMount() {
    const { params } = this.props.match;
    const { readArticles } = this.props;
    readArticles(params.id);
  }

  renderTags = (tags) => {
    if (tags.length > 0) {
      return tags.map(tag => (
        <div className="chip article-tag" key={tag}>
          {`#${tag}`}
        </div>
      ));
    }
    return <div className="chip article-tag">#notags</div>;
  };

  render() {
    const { article } = this.props;
    if (article === undefined) return null;
    const {
      title, body, readTime, author, createdAt, tagList,
    } = article;
    const newBody = ReactHtmlParser(body);
    const desc = readArticleHelper.description(body);
    const formatDate = readArticleHelper.timeFormat(createdAt);
    return (
      <Fragment>
        <Navbar/>
        {/*
        /* Heading and
        /* Description section
        */}

        <section className="col-lg-8 col-md-8 col-sm-10 pt-4 col-lg-offset-3 col-md-offset-3 mx-auto">
          <div className="container">
            <ArticleTitle className="display-5 text-md-left">{title}</ArticleTitle>
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
                  <ReadTime className=" zmdi zmdi-star lead lead-rt-sm text-left text-md-left text-black-50  ml-2" />
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
          {tagList && <div className="article-taglist">{this.renderTags(tagList)}</div>}
          <Footer/>
        </section>

      </Fragment>
    );
  }
}

ReadArticle.propTypes = {
  readArticles: PropTypes.func.isRequired,
  article: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ readArticle: readArticleReducer }) => ({
  article: readArticleReducer.article,
});

export default connect(
  mapStateToProps,
  { readArticles: readArticle },
)(ReadArticle);

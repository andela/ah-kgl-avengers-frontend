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
import tempImage from '../images/lion.png';
import ReadTime from './readTime';
import UserName from './userNames';
import Images from './image';
import TextArea from './textArea';
import readArticle from '../redux/action-creators/readArticle';
import readArticleHelper from '../helpers/readArticle';

class ReadArticle extends Component {
  state = {};

  componentDidMount() {
    const { readArticles } = this.props;
    readArticles();
  }

  render() {
    const { response } = this.props;
    if (response === undefined) return null;
    const {
      title, body, readTime, author, createdAt,
    } = response;
    const newBody = ReactHtmlParser(body);
    const desc = readArticleHelper.description(body);
    const formatDate = readArticleHelper.timeFormat(createdAt);
    return (
      <Fragment>
        {/*
        /* Heading and
        /* Description section
        */}

        <section className="col-lg-8 col-md-8 col-sm-10 pt-4 pt-md-11 col-lg-offset-3 col-md-offset-3 mx-auto">
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
        <section className="col-lg-8 col-lx-8 col-md-8 col-sm-10 col-lg-offset-4 mx-auto col-md-6 pt-2 pt-md-11">
          <div className="container">
            <div className="row align-items-left">
              <ImageAvatar />
              <div>
                <div className="row align-items-center">
                  <UserName className="lead lead-un-sm lead-un-md lead-un-lg text-left text-md-left text-black-50 ml-4 mt-2">
                    {author.username}
                  </UserName>
                  <Status className="btn-follow-author"> follow</Status>
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
        /* Main Image section with remarks
        */}
        <section className="col-lg-12 col-md-12 col-sm-12 pt-4 pt-md-11 col-lg-offset-3  mx-auto">
          <div className="container text-center">
            <Images className="img-fluid" image={tempImage} alt="" />
          </div>
        </section>
        {/*
        /* Reading Text section
        /* Social links side section
        */}

        <section className="col-lg-8 col-md-8 col-sm-10 pt-4 pt-md-11 col-lg-offset-3 col-md-offset-3 mx-auto">
          <div className="container">
            <ArticleTitle className="display-5 text-md-left">
              {title}
            </ArticleTitle>
            <TextArea className="text-lg-left text-justify text-md-left text-sm-left text-black-50 mb-2 mb-lg-8">
              {newBody}
            </TextArea>
          </div>
        </section>
      </Fragment>
    );
  }
}


ReadArticle.propTypes = {
  readArticles: PropTypes.func.isRequired,
  response: PropTypes.instanceOf(Object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  readArticles: () => dispatch(readArticle()),
});

const mapStateToProps = state => ({
  response: state.readArticle.payload,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadArticle);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import propTypes from 'prop-types';
import fetchFeeds from '../../redux/action-creators/feed';
import Navigation from '../functional/navigation';
import Footer from '../functional/footer';
import AppBar from '../functional/navBar';
import { ArticleView, TrendingArticleView } from '../singleArticle';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onFetchArticles } = this.props;
    onFetchArticles();
  }

  trendingArticle = articles => articles.map((single, index) => (
    <TrendingArticleView article={single} key={single.slug} id={index + 1} />
  ));

  secondaryArticle = articles => articles.map(single => <ArticleView article={single} key={single.slug} />);

  render() {
    const { feeds, isProgressOn } = this.props;
    return (
      <Fragment>
        <AppBar />
        <Container className="landing-page-container">
          <Navigation />
          <div className="container-fluid">
            <div className="row">
              {isProgressOn ? (
                <div className="content-mockup">
                  <i className="zmdi zmdi-spinner zmdi-hc-4x zmdi-hc-spin" />
                </div>
              ) : (
                <Fragment>
                  <section className="main col-12 col-md-9">
                    {feeds.main.hasOwnProperty('title') && (
                      <section className="articles-main">
                        <ArticleView article={feeds.main} className="article-main" />
                      </section>
                    )}
                    <section className="articles-user-feed">
                      {feeds.secondary.length > 0 && feeds.secondary[5] && this.secondaryArticle(feeds.secondary)}
                    </section>
                  </section>
                  <aside className="col-12 col-md-3">
                    <div className="aside-title">Trending</div>
                    <div className="aside-content">
                      {feeds.trending.length > 0 && this.trendingArticle(feeds.trending)}
                    </div>
                  </aside>
                </Fragment>
              )}
            </div>
          </div>

          <Footer />
        </Container>
      </Fragment>
    );
  }
}

Welcome.propTypes = {
  onFetchArticles: propTypes.func.isRequired,
  feeds: propTypes.objectOf(propTypes.any).isRequired,
  isProgressOn: propTypes.bool.isRequired,
};

const mapStateToProps = ({ article: articleReducer }) => {
  const { feeds, isProgressOn } = articleReducer;
  return {
    feeds,
    isProgressOn,
  };
};

export default connect(
  mapStateToProps,
  { onFetchArticles: fetchFeeds },
)(Welcome);

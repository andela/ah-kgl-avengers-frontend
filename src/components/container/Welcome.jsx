import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import fetchFeeds from '../../redux/action-creators/feed';
import Footer from '../functional/footer';
import AppBar from '../functional/navBar';
import { ArticleView, TrendingArticleView } from '../singleArticle';
import { bookmarkArticle } from '../../redux/action-creators/bookmark';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onFetchArticles } = this.props;
    onFetchArticles();
  }

  bookmarkArticle = async (slug) => {
    const { bookmarking } = this.props;
    await bookmarking(slug);
    const { bookmark } = this.props;
    if (bookmark) {
      if (bookmark.includes('jwt')) {
        toast.error('First login to bookmark the article');
        return;
      }
      bookmark.includes('You') ? toast.error(bookmark): toast.success(bookmark);
    }
  }

  trendingArticle = articles => articles.map((single, index) => (
    <TrendingArticleView article={single} key={single.slug} id={index + 1} bookmark={this.bookmarkArticle} />
  ));

  secondaryArticle = articles => articles.map(
    single => <ArticleView article={single} key={single.slug} />,
  );

  render() {
    const { feeds, isProgressOn, user } = this.props;
    const { image = null } = user;
    return (
      <Fragment>
        <AppBar image={image} />
        <Container className="landing-page-container mt-5">
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
                      <ArticleView article={feeds.main} className="article-main" bookmark={this.bookmarkArticle} />
                    </section>
                    )}
                    <section className="articles-user-feed">
                      {feeds.secondary.length > 0
                          && feeds.secondary[5]
                          && this.secondaryArticle(feeds.secondary)}
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
  bookmarking: propTypes.func.isRequired,
  feeds: propTypes.objectOf(propTypes.any).isRequired,
  isProgressOn: propTypes.bool.isRequired,
  bookmark: propTypes.string.isRequired,
  user: propTypes.instanceOf(Object),
};

Welcome.defaultProps = {
  user: {},
};

const mapStateToProps = ({ article: articleReducer, user: userReducer }) => {
  const {
    feeds, isProgressOn, bookmark,
  } = articleReducer;
  const { user } = userReducer;
  return {
    user,
    feeds,
    isProgressOn,
    bookmark,
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchArticles: () => dispatch(fetchFeeds()),
  bookmarking: slug => dispatch(bookmarkArticle(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);

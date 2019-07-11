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
    this.state = {
      available: 10,
      fullyLoaded: false,
    };
  }

  componentDidMount() {
    const { onFetchArticles } = this.props;
    onFetchArticles();
  }

  componentDidUpdate(prevProps) {
    const { loggedIn } = this.props;
    if (loggedIn !== undefined && prevProps.loggedIn === !loggedIn && loggedIn === false) {
      this.notifyLogout('Logged out successfully!');
    }
  }

  bookmarkArticle = async (slug) => {
    const { bookmarking } = this.props;
    await bookmarking(slug);
    const { bookmark } = this.props;
    const { status, message } = bookmark;
    if (status) {
      if (status === 401) {
        toast.error('First login to bookmark the article');
        return;
      }
      status === 400 ? toast.error(message) : toast.success(message);
    }
  };

  trendingArticle = articles => articles.map((single, index) => (
    <TrendingArticleView
      article={single}
      key={single.slug}
      id={index + 1}
      bookmark={this.bookmarkArticle}
    />
  ));

  secondaryArticle = (articles) => {
    const { available } = this.state;
    const views = articles.slice(0, available);
    return views.map(single => (
      <ArticleView article={single} key={single.slug} bookmark={this.bookmarkArticle} />
    ));
  };

  loadMore = () => {
    const { available } = this.state;
    const { feeds } = this.props;
    this.setState({ available: available + 10 });
    if (available + 10 >= feeds.secondary.length) {
      this.setState({ fullyLoaded: true });
    }
  };

  notifyLogout = (message) => {
    toast(message, {
      className: 'mt-5 text-primary',
    });
  };

  render() {
    const { feeds, isProgressOn, user } = this.props;
    const { fullyLoaded } = this.state;
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
                    {Object.prototype.hasOwnProperty.call(feeds.main, 'title') && (
                      <section className="articles-main">
                        <ArticleView
                          article={feeds.main}
                          className="article-main"
                          bookmark={this.bookmarkArticle}
                        />
                      </section>
                    )}
                    <section className="articles-user-feed">
                      {feeds.secondary.length > 0
                        && feeds.secondary[5]
                        && this.secondaryArticle(feeds.secondary)}
                    </section>
                    {feeds.secondary[10] && fullyLoaded === false && (
                      <section className="load-more">
                        <button type="button" onClick={() => this.loadMore()}>
                          <i className="zmdi zmdi-refresh" />
                          &nbsp; Load more
                        </button>
                      </section>
                    )}
                  </section>
                  <aside className="col-12 col-md-3 trending-side">
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
  bookmark: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object),
  loggedIn: propTypes.bool,
};

Welcome.defaultProps = {
  user: {},
  loggedIn: undefined,
};

const mapStateToProps = ({ article: articleReducer, user: userReducer }) => {
  const { feeds, isProgressOn, bookmark } = articleReducer;
  const { user, loggedIn } = userReducer;
  return {
    loggedIn,
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

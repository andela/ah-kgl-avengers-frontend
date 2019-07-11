import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { toast } from 'react-toastify';
import { ArticleView } from '../singleArticle';
import NavBar from '../functional/navBar';
import {
  getAllBookmarks,
  removeBookmark,
} from '../../redux/action-creators/bookmark';

class Bookmark extends Component {
  componentDidMount() {
    const { history } = this.props;
    if (!localStorage.token) history.push('/');
    const { allBookmarks } = this.props;
    allBookmarks();
  }

  deleteBookmark = async (slug) => {
    const { remove } = this.props;
    await remove(slug);
    const { bookmark } = this.props;
    const message = bookmark || 'Successfully removed from bookmark';
    if (!bookmark) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  getBookmarks = bookmarks => bookmarks.map(article => (
    <ArticleView
      article={article}
      key={article.slug}
      bookmark={this.deleteBookmark}
    />
  ));

  render() {
    const { bookmarks } = this.props;
    return (
      <Fragment>
        <NavBar />
        <Container className="articles">
          <h3 style={{ textAlign: 'left' }}>Your Bookmarks</h3>
          <hr />
          <div className="container-profile-view">
            <div className="row">
              <div className="col-12 main-articles profile-articles-container">
                {bookmarks.length > 0 ? (
                  this.getBookmarks(bookmarks)
                ) : (
                  <div className="profile-no-articles">
                    <p>You have no bookmarks</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Fragment>
    );
  }
}

Bookmark.defaultProps = {
  bookmarks: [],
};

Bookmark.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  bookmarks: PropTypes.instanceOf(Array),
  allBookmarks: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  bookmark: PropTypes.string.isRequired,
};

const mapStateToProps = ({ article }) => ({
  bookmarks: article.bookmarks,
  bookmark: article.bookmark,
});

const mapDispatchToProps = dispatch => ({
  allBookmarks: () => dispatch(getAllBookmarks()),
  remove: slug => dispatch(removeBookmark(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmark);

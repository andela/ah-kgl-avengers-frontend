import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { MdDelete, MdEdit } from 'react-icons/md';
import Navbar from './functional/navBar';
import getArticles from '../redux/action-creators/getArticles';
import getDrafts from '../redux/action-creators/getDrafts';
import editArticle from '../redux/action-creators/editArticle';
import DeleteConfirmation from './delete/deleteConfirmation';
import { deleteArticle } from '../redux/action-creators/index';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: '1',
      draftClass: false,
      pubClass: true,
      modal: false,
      slug: '',
      status: '',
      currentPage: 0,
      pageSize: 10,
      tab: 1,
    };
  }

  /**
   * check if the user is logged
   */
  componentDidMount() {
    const {
      history,
      loggedIn,
      getArticles: getMyArticles,
      getDrafts: getDraftArticles,
    } = this.props;

    if (typeof loggedIn !== 'undefined' && !loggedIn) return history.push('/');
    getMyArticles();
    return getDraftArticles();
  }

  componentDidUpdate() {
    const { history, loggedIn } = this.props;
    if (typeof loggedIn !== 'undefined' && !loggedIn) return history.push('/');
    return null;
  }

  handleClick = (index) => {
    this.setState({
      currentPage: index,
    });
  };

  toggleDelete = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  onDelete = (slug) => {
    const { deleteArticle: request } = this.props;
    const { status } = this.state;
    request(slug, status);
    this.toggleDelete();
  };

  toggle(tab) {
    const { activeTab, draftClass, pubClass } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
        draftClass: !draftClass,
        pubClass: !pubClass,
        currentPage: 0,
      });
    }
  }

  update({ data, status }) {
    const { editArticle: edit, history } = this.props;
    edit(Object.defineProperty(data, 'status', { value: status }));
    history.push('/new-post');
  }

  render() {
    const { articles, drafts } = this.props;

    const {
      activeTab,
      draftClass,
      pubClass,
      currentPage,
      pageSize,
      defaultPages,
      slug,
      modal,
      tab,
    } = this.state;

    const viewArticles = articles.slice(pageSize * currentPage, pageSize * currentPage + pageSize);
    const viewDrafts = drafts.slice(pageSize * currentPage, pageSize * currentPage + pageSize);
    let pages = 1;
    tab === 1 && (pages = Math.ceil(articles.length / pageSize));
    tab === 2 && (pages = Math.ceil(drafts.length / pageSize));

    return (
      <Fragment>
        <div>
          <DeleteConfirmation
            modal={modal}
            toggle={this.toggleDelete}
            deleteArticle={this.onDelete}
            slug={slug}
          />
        </div>
        <Navbar />
        <div className="container articles">
          <h3>My articles</h3>
          <div className="article-menu">
            <button
              type="button"
              onClick={() => {
                this.toggle('1');
                this.setState({ tab: 1 });
              }}
              className={pubClass ? 'bold' : 'normal'}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => {
                this.toggle('2');
                this.setState({ tab: 2 });
              }}
              className={draftClass ? 'bold' : 'normal'}
            >
              Drafts
            </button>
          </div>
          <div className={articles.length === 0 ? 'no-content' : 'disabled'}>
            <p>No content</p>
          </div>
          <TabContent activeTab={activeTab}>
            {viewArticles
              && viewArticles.map(article => (
                <TabPane tabId="1" key={article.slug}>
                  <Row>
                    <Col className="article col-12">
                      <Link to={`/articles/${article.slug}`}>
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                      </Link>
                      <p className="article-details">
                        <span>{article.readTime}</span>
                        <span className="edit">
                          <MdEdit
                            onClick={() => this.update({ data: article, status: 'published' })}
                          />
                        </span>
                        <button
                          type="button"
                          className="delete"
                          onClick={() => {
                            this.setState({ slug: article.slug, status: 'published' });
                            this.toggleDelete();
                          }}
                        >
                          <MdDelete />
                        </button>
                      </p>
                    </Col>
                  </Row>
                  <hr />
                </TabPane>
              ))}
            {viewDrafts
              && viewDrafts.map(draft => (
                <TabPane tabId="2" key={draft.slug}>
                  <Row>
                    <Col className="article col-12">
                      <h4>{draft.title}</h4>
                      <p>{draft.description}</p>
                      <p className="article-details">
                        <span>{draft.readTime}</span>
                        <span className="edit">
                          <MdEdit onClick={() => this.update({ data: draft, status: 'draft' })} />
                        </span>
                        <button
                          type="button"
                          className="delete"
                          onClick={() => {
                            this.setState({ slug: draft.slug, status: 'draft' });
                            this.toggleDelete();
                          }}
                        >
                          <MdDelete />
                        </button>
                      </p>
                    </Col>
                  </Row>
                  <hr />
                </TabPane>
              ))}
            {pages > 1 && (
              <div className="pagination-wrapper">
                <Pagination aria-label="Page navigation example">
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      onClick={e => this.handleClick(currentPage - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>
                  {[...Array(pages || defaultPages)].map((page, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={() => this.handleClick(i)}>{i + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === pages - 1}>
                    <PaginationLink
                      onClick={() => this.handleClick(currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            )}
          </TabContent>
        </div>
      </Fragment>
    );
  }
}

Articles.defaultProps = {
  articles: [],
  drafts: [],
  history: {},
};

Articles.propTypes = {
  getArticles: PropTypes.func.isRequired,
  getDrafts: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
  drafts: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.objectOf(PropTypes.any),
  deleteArticle: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ article, user: userReducer }) => ({
  articles: article.articles,
  drafts: article.drafts,
  article: article.article,
  loggedIn: userReducer.loggedIn,
});

export default connect(
  mapStateToProps,
  {
    getArticles,
    getDrafts,
    editArticle,
    deleteArticle,
  },
)(Articles);

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  TabContent, TabPane, Row, Col,
} from 'reactstrap';
import { MdDelete, MdEdit } from 'react-icons/md';
import Footer from './functional/footer';
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
    };
  }

  componentDidMount() {
    const { getArticles: getMyArticles, getDrafts: getDraftArticles } = this.props;
    getMyArticles();
    getDraftArticles();
  }

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
      });
    }
  }

  update(data) {
    const { editArticle: edit, history } = this.props;
    edit(data);
    history.push('/new-post');
  }

  render() {
    const { articles: data } = this.props;
    const { slug, modal } = this.state;
    if (data === undefined) return null;

    const { activeTab, draftClass, pubClass } = this.state;
    const { articles, drafts } = this.props;
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
              }}
              className={pubClass ? 'bold' : 'normal'}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => {
                this.toggle('2');
              }}
              className={draftClass ? 'bold' : 'normal'}
            >
              Drafts
            </button>
          </div>
          <TabContent activeTab={activeTab}>
            {articles
              && articles.map(article => (
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
                          <MdEdit onClick={() => this.update(article)} />
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
            {drafts
              && drafts.map(draft => (
                <TabPane tabId="2" key={draft.slug}>
                  <Row>
                    <Col className="article col-12">
                      <h4>{draft.title}</h4>
                      <p>{draft.description}</p>
                      <p className="article-details">
                        <span>{draft.readTime}</span>
                        <span className="edit">
                          <MdEdit onClick={() => this.update(draft)} />
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
          </TabContent>
        </div>
        <Footer />
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
  articles: PropTypes.arrayOf(PropTypes.string),
  drafts: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.objectOf(PropTypes.string),
  deleteArticle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ article }) => ({
  articles: article.articles,
  drafts: article.drafts,
  article: article.article,
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

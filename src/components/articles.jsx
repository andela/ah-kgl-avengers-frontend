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


export class Articles extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      draftClass: false,
      pubClass: true,
    };
  }

  componentDidMount() {
    const { getArticles: getMyArticles, getDrafts: getDraftArticles } = this.props;
    getMyArticles();
    getDraftArticles();
  }

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
    const {
      activeTab, draftClass, pubClass,
    } = this.state;
    const { articles, drafts } = this.props;
    return (
      <Fragment>
        <Navbar />
        <div className="container articles">
          <h3>My articles</h3>
          <div className="article-menu">
            <span onClick={() => { this.toggle('1'); }} id="published" className={pubClass ? 'bold' : 'normal'}>
              Published
            </span>
            <span onClick={() => { this.toggle('2'); }} id="draft" className={draftClass ? 'bold' : 'normal'}>Drafts</span>
          </div>
          <TabContent activeTab={activeTab}>
            {
              articles && articles.map(article => (
                <TabPane tabId="1" key={article}>
                  <Row>
                    <Col className="article col-12">
                      <Link to={`/articles/${article.slug}`}>
                        <h4>{article.title}</h4>
                        <p>
                          {article.description}
                        </p>
                      </Link>
                      <p className="article-details">
                        <span>{article.readTime}</span>
                        <span className="edit">
                          <MdEdit onClick={() => this.update(article)} />
                        </span>
                        <span className="delete"><MdDelete /></span>
                      </p>
                    </Col>
                  </Row>
                  <hr />
                </TabPane>
              ))
            }
            {
              drafts && drafts.map(draft => (
                <TabPane tabId="2" key={draft}>
                  <Row>
                    <Col className="article col-12" onClick={() => this.update(draft)}>
                      <h4>{draft.title}</h4>
                      <p>
                        {draft.description}
                      </p>
                      <p className="article-details"><span>{draft.readTime}</span><span className="delete"><MdDelete /></span></p>
                    </Col>
                  </Row>
                  <hr />
                </TabPane>
              ))
            }

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
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  drafts: state.drafts.drafts,
  article: state.article.article,
});

export default connect(mapStateToProps, { getArticles, getDrafts, editArticle })(Articles);

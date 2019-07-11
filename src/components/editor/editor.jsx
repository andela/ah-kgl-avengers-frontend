import React, { Component, createRef, Fragment } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';
import Chips from '../chips/chips';
import Footer from '../functional/footer';
import NavBar from '../functional/navBar';
import { saveArticle, clearEditor } from '../../redux/action-creators';
import EditorConfigs from './ckConfig';
import './editor.scss';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.titleRef = createRef();
    this.state = {
      title: undefined,
      body: undefined,
      tagList: [],
    };
  }

  componentDidUpdate(prevProps) {
    const {
      history, message, loggedIn, article,
    } = this.props;
    const { title } = this.state;
    if (typeof loggedIn !== 'undefined' && !loggedIn) {
      if (title || Object.prototype.hasOwnProperty.call(article, 'title')) this.saveArticle();
      return history.push('/');
    }
    if (
      Object.prototype.hasOwnProperty.call(message, 'text')
      && prevProps.message.text !== message.text
    ) {
      this.notify(message);
    }
    return null;
  }

  componentWillUnmount() {
    const { onClearEditor } = this.props;
    onClearEditor();
  }

  notify = (message) => {
    const { text } = message;
    if (Array.isArray(text)) {
      return toast.error('Add a featured image');
    }
    return toast.error(text.message || text || 'Failed to save article');
  };

  /**
   * save article
   */
  saveArticle = () => {
    const { body, title, tagList } = this.state;
    const { article, onSaveArticle } = this.props;
    onSaveArticle({
      article: {
        body: body || article.body,
        title: (title || article.title).replace(/<\/?[^>]+(>|$)/g, ''),
        slug: article.slug || undefined,
        tagList: tagList.length > 0 ? tagList : article.tagList || [],
        status: article.status || 'draft',
      },
    });
  };

  /**
   * publish article
   */
  publishArticle = () => {
    const { body, title, tagList } = this.state;
    const { article, onSaveArticle } = this.props;
    onSaveArticle({
      article: {
        body: body || article.body,
        title: title || article.title,
        slug: article.slug || undefined,
        tagList: tagList.length > 0 ? tagList : article.tagList || [],
        status: 'published',
      },
    });
  };

  render() {
    const { body, title, tagList } = this.state;
    const { article, isProgressOn } = this.props;

    return (
      <Fragment>
        <NavBar />
        <div className="editor-container">
          <div className="status-bar">
            <div className="status">{article.status || 'Draft'}</div>
            {isProgressOn && (
              <div className="status-progress">
                <span>saving&nbsp;</span>
                <i className="zmdi zmdi-spinner zmdi-hc-spin" />
              </div>
            )}
            <div className="spacer" />
            <div className="btn-group">
              <button
                className="btn btn-save-edit"
                type="button"
                disabled={!body && !Object.prototype.hasOwnProperty.call(article, 'title')}
                onClick={this.saveArticle}
              >
                <i className="zmdi zmdi-floppy" />
                Save
              </button>
              <button
                className="btn btn-publish-edit"
                type="button"
                disabled={!body && !Object.prototype.hasOwnProperty.call(article, 'body')}
                onClick={this.publishArticle}
              >
                <i className="zmdi zmdi-upload" />
                Publish
              </button>
            </div>
          </div>

          <div className="editor-wrapper">
            <ContentEditable
              className="article-title"
              innerRef={this.titleRef}
              html={title || article.title || ''}
              placeholder="Your title here..."
              onChange={(evt) => {
                this.setState({ title: evt.target.value });
              }}
              disabled={false}
              tagName="h1"
            />

            <CKEditor
              editor={ClassicEditor}
              data={article.body}
              config={EditorConfigs}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ body: data });
              }}
            />
          </div>

          <div className="editor-options">
            <Chips
              label="Add tags"
              suggestion={[]}
              value={article.tagList || tagList}
              onChange={(values) => {
                this.setState({ tagList: values });
              }}
            />
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Editor.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  article: propTypes.objectOf(propTypes.any),
  isProgressOn: propTypes.bool.isRequired,
  message: propTypes.objectOf(propTypes.any).isRequired,
  onSaveArticle: propTypes.func.isRequired,
  loggedIn: propTypes.bool,
  onClearEditor: propTypes.func.isRequired,
};

Editor.defaultProps = {
  article: {},
  loggedIn: undefined,
};

const mapStateToProps = ({ article: articleReducer, user: userReducer }) => {
  const {
    user, editorArticle: article, message, isProgressOn, redirect,
  } = articleReducer;
  const { loggedIn } = userReducer;
  return {
    user,
    article,
    message,
    redirect,
    isProgressOn,
    loggedIn,
  };
};

export default connect(
  mapStateToProps,
  {
    onSaveArticle: saveArticle,
    onClearEditor: clearEditor,
  },
)(Editor);

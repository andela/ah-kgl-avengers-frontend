import React, { Component, createRef, Fragment } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Messenger from './message';
import Chips from '../chips/chips';
import Footer from '../functional/footer';
import NavBar from '../functional/navBar';
import saveArticle from '../../redux/action-creators';
import EditorConfigs from './ckConfig';
import './editor.scss';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.titleRef = createRef();
    this.state = {
      title: undefined,
      body: '',
      isSaved: false,
      tagList: [],
      tittleChanged: false,
      editorFocusedFirst: false,
    };
  }

  /**
   * check if the user is logged
   */
  componentDidMount() {
    const { loggedIn, history } = this.props;
    if (!loggedIn) return history.push('/');
    return null;
  }

  componentDidUpdate(prevProps) {
    const { redirect, history } = this.props;
    if (prevProps.redirect !== redirect) {
      history.push(redirect.to);
    }
  }

  // TODO: use a function to display the errors
  // toastManager

  /**
   * save article
   */
  saveArticle = () => {
    const { body, title, tagList } = this.state;
    const { user, article, onSaveArticle } = this.props;
    onSaveArticle({
      article: {
        body,
        title: (title || article.title).replace(/<\/?[^>]+(>|$)/g, ''),
        slug: article.slug || undefined,
        tagList,
        status: article.status || 'draft',
      },
      token: user.token,
    });
  };

  /**
   * publish article
   */
  publishArticle = () => {
    const { body, title, tagList } = this.state;
    const { user, article, onSaveArticle } = this.props;
    onSaveArticle({
      article: {
        body,
        title,
        slug: article.slug || undefined,
        tagList,
        status: 'published',
      },
      token: user.token,
    });
  };

  render() {
    const {
      isSaved, body, title, tagList, tittleChanged, editorFocusedFirst,
    } = this.state;
    const {
      user, article, onSaveArticle, message, isProgressOn,
    } = this.props;

    return (
      <Fragment>
        <NavBar />
        <div className="editor-container">
          <div className="status-bar">
            <div className="status">{isSaved ? 'Saved' : 'Draft'}</div>
            {isProgressOn && (
              <div className="status-progress">
                <span>saving&nbsp;</span>
                <i className="zmdi zmdi-spinner zmdi-hc-spin" />
              </div>
            )}
            <Messenger messages={message.text || []} type={message.type} />
            <div className="spacer" />
            <div className="btn-group">
              <button
                className="btn btn-save-edit"
                type="button"
                disabled={!body}
                onClick={this.saveArticle}
              >
                <i className="zmdi zmdi-floppy" />
                Save
              </button>
              <button
                className="btn btn-publish-edit"
                type="button"
                disabled={!body}
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
              html={title || article.title || 'Your title here'}
              onFocus={(evt) => {
                evt.preventDefault();
                if (!tittleChanged && !article.title) {
                  this.setState({ tittleChanged: true, title: ' ' });
                }
              }}
              onChange={(evt) => {
                this.setState({ title: evt.target.value });
              }}
              disabled={false}
              tagName="div"
            />

            <CKEditor
              editor={ClassicEditor}
              data={article.body || '<p>Your story here!</p>'}
              config={EditorConfigs}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ body: data });
              }}
              onBlur={(evt, editor) => {
                if (editorFocusedFirst && !body) {
                  editor.setData('<p>Your story here!</p>');
                  this.setState({ editorFocusedFirst: false });
                }
              }}
              onFocus={(evt, editor) => {
                if (!editorFocusedFirst && !article.body) {
                  editor.setData('');
                  this.setState({ editorFocusedFirst: true });
                }
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
  redirect: propTypes.objectOf(propTypes.any).isRequired,
  user: propTypes.objectOf(propTypes.any).isRequired,
  article: propTypes.objectOf(propTypes.any),
  isProgressOn: propTypes.bool.isRequired,
  message: propTypes.objectOf(propTypes.any).isRequired,
  onSaveArticle: propTypes.func.isRequired,
  loggedIn: propTypes.bool.isRequired,
};

Editor.defaultProps = {
  article: {},
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
  { onSaveArticle: saveArticle },
)(Editor);

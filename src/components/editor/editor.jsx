import React, { Component, createRef } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Messenger from './message';
import Chips from '../chips/chips';
import Footer from '../functional/footer';
import { saveArticle } from '../../redux/action-creators';
import EditorConfigs from './ckConfig';
import './editor.scss';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.titleRef = createRef();
    this.state = {
      title: 'Your title here',
      body: '',
      isSaved: false,
      tagList: [],
      tittleChanged: false,
      editorFocusedFirst: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { redirect, history } = this.props;
    if (prevProps.redirect !== redirect) {
      history.push(redirect.to);
    }
  }

  render() {
    const {
      isSaved, body, title, tagList, tittleChanged, editorFocusedFirst,
    } = this.state;
    const {
      user, article, onSaveArticle, message, isProgressOn,
    } = this.props;
    return (
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
              onClick={() => onSaveArticle({
                article: {
                  body,
                  title,
                  slug: article.slug || undefined,
                  tagList,
                  status: article.status || 'draft',
                },
                token: user.token,
              })
              }
            >
              <i className="zmdi zmdi-floppy" />
              Save
            </button>
            <button
              className="btn btn-publish-edit"
              type="button"
              disabled={!body}
              onClick={() => onSaveArticle({
                article: {
                  body,
                  title,
                  slug: article.slug || undefined,
                  tagList,
                  status: 'published',
                },
                token: user.token,
              })
              }
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
            html={article.title || title}
            onFocus={(evt) => {
              evt.preventDefault();
              if (!tittleChanged) {
                this.setState({ tittleChanged: true, title: '' });
              }
            }}
            onChange={(evt) => {
              this.setState({ title: evt.target.value });
            }}
            disabled={false}
            tagName="h1"
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
            value={tagList}
            onChange={(values) => {
              this.setState({ tagList: values });
            }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

Editor.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  redirect: propTypes.objectOf(propTypes.any).isRequired,
  user: propTypes.objectOf(propTypes.any).isRequired,
  article: propTypes.objectOf(propTypes.any).isRequired,
  isProgressOn: propTypes.bool.isRequired,
  message: propTypes.objectOf(propTypes.any).isRequired,
  onSaveArticle: propTypes.func.isRequired,
};

const mapStateToProps = ({ article: articleReducer }) => {
  const {
    user, article, message, isProgressOn, redirect,
  } = articleReducer;
  return {
    user,
    article,
    message,
    redirect,
    isProgressOn,
  };
};

export default connect(
  mapStateToProps,
  { onSaveArticle: saveArticle },
)(Editor);

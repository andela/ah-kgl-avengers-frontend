import {
  REDIRECT_TO,
  CREATE_ARTICLE_STARTED,
  CREATE_ARTICLE_FINISHED,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  FETCH_ARTICLE_END,
  DELETE_ARTICLE_FAIL,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  FETCH_FEEDS_SUCCESS,
  LIKE_ARTICLE_FAIL,
  RESET_ARTICLE,
  CLEAR_ARTICLE,
  CLEAR_EDITOR,
  CREATE_COMMENT_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  CREATE_COMMENT_FAIL,
} from '../action-types';
import {
  draftSuccess,
  draftFailed,
  articleRequest,
  articleSuccess,
  articleFailed,
  likeArticle,
  dislikeArticle,
  fetchLikedArticle,
} from '../action-types/getArticles';
import { rateSuccess, rateFailed } from '../action-types/rateArticle';

import {
  BOOKMARK_SEND,
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  BOOKMARK_GET_ALL,
  BOOKMARK_GET_ALL_FAIL,
  BOOKMARK_DELETE,
  BOOKMARK_DELETE_FAIL,
  BOOKMARK_DELETE_SUCCESS,
} from '../action-types/bookmark';

import initialState from '../initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_ARTICLE_SUCCESS: {
      return {
        ...state,
        editorArticle: payload,
      };
    }
    case CLEAR_EDITOR:
      return {
        ...state,
        editorArticle: {},
        message: {},
      };

    case DELETE_ARTICLE_FAIL:
    case UPDATE_ARTICLE_FAIL:
      return {
        ...state,
        message: payload,
      };

    case CREATE_ARTICLE_STARTED:
    case CREATE_ARTICLE_FINISHED:
      return {
        ...state,
        isProgressOn: !state.isProgressOn,
      };

    case FETCH_FEEDS_SUCCESS:
      return {
        ...state,
        feeds: payload,
      };

    case FETCH_ARTICLE_START:
      return {
        ...state,
        isProgressOn: true,
      };

    case FETCH_ARTICLE_END:
      return {
        ...state,
        isProgressOn: false,
      };

    case FETCH_ARTICLE_FAIL:
      return {
        ...state,
        message: payload,
      };

    case REDIRECT_TO:
      return {
        ...state,
        redirect: payload,
      };
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: payload,
        error: '',
        success: '',
      };

    case CREATE_COMMENT_SUCCESS: {
      const newComments = state.article.comments;
      newComments.push(payload);
      return {
        ...state,
        article: {
          ...state.article,
          comments: newComments,
        },
      };
    }
    case RESET_ARTICLE: {
      return {
        ...state,
      };
    }

    case LIKE_COMMENT_SUCCESS: {
      const commentIndex = state.article.comments.findIndex(
        singleComment => singleComment.id === payload.id,
      );
      const comment = Object.assign({}, state.article.comments[commentIndex]);
      comment.likes += 1;
      const articleComments = state.article.comments;
      articleComments[commentIndex] = comment;
      return {
        ...state,
        article: {
          ...state.article,
          comments: articleComments,
        },
      };
    }

    case DISLIKE_COMMENT_SUCCESS: {
      const commentIndex = state.article.comments.findIndex(
        singleComment => singleComment.id === payload.id,
      );
      const comment = Object.assign({}, state.article.comments[commentIndex]);
      comment.likes = comment.likes > 0 ? comment.likes - 1 : 0;
      const articleComments = state.article.comments;
      articleComments[commentIndex] = comment;
      return {
        ...state,
        article: {
          ...state.article,
          comments: articleComments,
        },
      };
    }

    case LIKE_COMMENT_FAIL:
      return { ...state, commentsError: 'Failed to like or dislike comment' };

    case CREATE_COMMENT_FAIL:
      return { ...state, commentsError: 'Failed to add comment' };

    case CLEAR_ARTICLE:
      return {
        ...state,
        article: {},
        message: {},
      };

    case DELETE_ARTICLE_SUCCESS: {
      let newArticles = [];
      if (payload.status === 'published') {
        newArticles = state.articles.filter(item => item.slug !== payload.slug);
        return {
          ...state,
          articles: newArticles,
        };
      }
      newArticles = state.drafts.filter(item => item.slug !== payload.slug);
      return {
        ...state,
        drafts: newArticles,
      };
    }

    case 'EDIT_REQUEST':
      return {
        ...state,
        editorArticle: payload,
      };

    case LIKE_ARTICLE_FAIL:
      return {
        ...state,
        likedErrors: payload,
      };

    case draftFailed:
      return {
        ...state,
        errors: payload,
      };

    case draftSuccess:
      return {
        ...state,
        drafts: payload,
      };

    case articleRequest:
      return {
        ...state,
        articles: payload,
      };

    case articleFailed:
      return {
        ...state,
        errors: payload,
      };

    case articleSuccess:
      return {
        ...state,
        articles: payload,
      };

    case rateFailed: {
      return {
        ...state,
        error: payload.error,
        success: '',
      };
    }

    case rateSuccess: {
      return {
        ...state,
        article: {
          ...state.article,
          ratings: payload,
          totalRatings: state.article.totalRatings + 1,
        },
        success: 'Thank you for rating this article',
        error: '',
      };
    }

    /**
     * Reducers related to bookmark article and return all bookmarked
     */
    case BOOKMARK_SEND: {
      return state;
    }
    case BOOKMARK_SUCCESS: {
      return {
        ...state,
        bookmark: payload,
      };
    }
    case BOOKMARK_FAIL: {
      return {
        ...state,
        bookmark: payload,
      };
    }
    case BOOKMARK_GET_ALL_FAIL: {
      return {
        ...state,
        bookmark: payload,
      };
    }
    case BOOKMARK_GET_ALL: {
      return {
        ...state,
        bookmarks: payload.data,
      };
    }
    case BOOKMARK_DELETE: {
      return {
        ...state,
      };
    }
    case BOOKMARK_DELETE_FAIL: {
      return {
        ...state,
        bookmark: payload,
      };
    }
    case BOOKMARK_DELETE_SUCCESS: {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(article => article.slug !== payload),
      };
    }

    /*
     * Like an article and change the database
     */
    case likeArticle:
      return {
        ...state,
        likedArticle: state.article,
      };

    /*
     * Dislike an article and change the database
     */
    case dislikeArticle:
      return {
        ...state,
        dislikeArticle: state.article,
      };

    /*
     * Fetch the updated article with total count of likes and dislikes
     */
    case fetchLikedArticle:
      return {
        ...state,
        newLiked: payload,
      };
    default:
      return state;
  }
};

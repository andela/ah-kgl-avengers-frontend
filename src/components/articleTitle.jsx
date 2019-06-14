import React from 'react';
import PropTypes from 'prop-types';

const ArticleTitle = ({ className, children }) => <h2 className={className}>{children}</h2>;

ArticleTitle.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default ArticleTitle;

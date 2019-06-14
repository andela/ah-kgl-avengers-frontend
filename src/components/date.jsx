import React from 'react';
import PropTypes from 'prop-types';

const ArticleCreatedDate = ({ className, children }) => <h2 className={className}>{children}</h2>;

ArticleCreatedDate.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default ArticleCreatedDate;

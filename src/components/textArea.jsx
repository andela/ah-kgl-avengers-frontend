import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ className, children }) => <p className={className}>{children}</p>;

TextArea.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default TextArea;

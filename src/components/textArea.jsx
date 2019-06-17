import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ className, children }) => <div className={className}>{children}</div>;

TextArea.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};

export default TextArea;

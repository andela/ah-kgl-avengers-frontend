import React from 'react';
import PropTypes from 'prop-types';

const ReadTime = ({ className, children }) => <h2 className={className}>{children}</h2>;

ReadTime.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

ReadTime.defaultProps = {
  className: '',
  children: '',
};

export default ReadTime;

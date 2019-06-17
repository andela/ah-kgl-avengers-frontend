import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ className, children }) => (
  <button type="button" className={className}>
    {children}
  </button>
);

Status.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};
Status.defaultProps = {
  className: '',
  children: '',
};
export default Status;

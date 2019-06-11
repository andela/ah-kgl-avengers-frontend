import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ className, children }) => (
  <button type="button" className={className}>{children}</button>
);

Status.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default Status;

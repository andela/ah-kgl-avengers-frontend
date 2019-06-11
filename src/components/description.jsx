import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ className, children }) => <p className={className}>{children}</p>;

Description.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Description;

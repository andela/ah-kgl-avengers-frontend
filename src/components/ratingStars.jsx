import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({ className, children }) => <h2 className={className}>{children}</h2>;

RatingStars.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default RatingStars;

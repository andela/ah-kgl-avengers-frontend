import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({ className, children }) => <h2 className={className}>{children}</h2>;

RatingStars.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

RatingStars.defaultProps = {
  className: '',
  children: null,
};

export default RatingStars;

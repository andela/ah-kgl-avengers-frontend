import React from 'react';
import PropTypes from 'prop-types';

const Images = ({ className, alt, image }) => <img className={className} src={image} alt={alt} />;

Images.propTypes = {
  className: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Images;

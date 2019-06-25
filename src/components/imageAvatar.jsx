import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../images/avatar.png';

const acronyms = (firstName, lastName) => {
  const names = `${firstName} ${lastName}`;
  if (firstName === '' || lastName === '') {
    return <img className="avatar" src={avatar} alt="avatar" />;
  }
  const acronym = names.match(/\b(\w)/g).join('');
  return <div className="acronym">{acronym}</div>;
};

const ImageAvatar = ({
  image, alt, firstName, lastName, className,
}) => (
  <div className={className}>
    {image ? <img className="avatar" src={image} alt={alt} /> : acronyms(firstName, lastName)}
  </div>
);

ImageAvatar.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
};

ImageAvatar.defaultProps = {
  image: '',
  alt: '',
  firstName: '',
  lastName: '',
  className: '',
};

export default ImageAvatar;

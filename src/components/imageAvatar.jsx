import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../mockups/reset-password/logo.png';

const acronyms = (firstName, lastName) => {
  const names = `${firstName} ${lastName}`;
  if (firstName === undefined || lastName === undefined) {
    return <img className="avatar" src={avatar} alt="avatar" />;
  }
  const acronym = names.match(/\b(\w)/g).join('');
  return <div className="acronym">{acronym}</div>;
};

const ImageAvatar = ({
  image, alt, firstName, lastName,
}) => (
  <div>
    {image ? (
      <img className="avatar" src={image} alt={alt} />
    ) : (
      acronyms(firstName, lastName)
    )}
  </div>
);

ImageAvatar.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ImageAvatar;

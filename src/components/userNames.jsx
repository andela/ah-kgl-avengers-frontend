import React from 'react';
import PropTypes from 'prop-types';

const UserNames = ({ className, children }) => <h2 className={className}>{children}</h2>;

UserNames.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default UserNames;

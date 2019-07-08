import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ value }) => (
  <span className="small-chip">
    {value}
  </span>
);

Chip.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Chip;

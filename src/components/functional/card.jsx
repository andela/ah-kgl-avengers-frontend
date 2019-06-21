import React from 'react';
import { Card } from 'reactstrap';
import PropTypes from 'prop-types';

const CenteredCard = ({ children }) => (
  <div className="row h-100">
    <div className="col-sm-12 my-auto">
      <Card body className="col-sm-8 col-md-6 col-lg-4 w3-card shadow-lg">
        {children}
      </Card>
    </div>
  </div>
);

CenteredCard.propTypes = {
  children: PropTypes.instanceOf(Array),
};

CenteredCard.defaultProps = {
  children: [],
};

export default CenteredCard;

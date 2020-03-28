import React from 'react';
import PropTypes from 'prop-types';
import {CardHeader} from "reactstrap";

const BaseHeader = ({ title }) => {
  return (
    <CardHeader className="border-0">
      <h3 className="mb-0">{title}</h3>
    </CardHeader>
  );
};

BaseHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default BaseHeader;
import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ children }) => {
  return (
    <thead className="thead-light">
    <tr>
      {children}
    </tr>
    </thead>
  );
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableHead;
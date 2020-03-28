import React from 'react';
import PropTypes from 'prop-types';

const TableHeadRow = ({ children }) => {
  return (
    <th scope="col">
      {children}
    </th>
  );
};

TableHeadRow.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableHeadRow;
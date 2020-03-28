import React from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ children }) => {
  return (
    <td>
      {children}
    </td>
  );
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableCell;
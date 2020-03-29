import React from "react";

import {
  Table as TableStrap,
} from "reactstrap";
import TablePagination from "./TablePagination";

const Table = ({ children, pageRequest, handlePaginationChange }) => {

  return (
    <>
      <TableStrap className="align-items-center table-flush" responsive>
        {children}
      </TableStrap>
      <TablePagination { ...pageRequest } handlePaginationChange={handlePaginationChange} />
    </>
  )
};

export default Table;

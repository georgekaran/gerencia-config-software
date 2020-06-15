import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CardFooter, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const TablePagination = ({ last, first, totalPages = 1, number = 0, handlePaginationChange }) => {

  const isCurrentPage = useCallback(
    (pageNumber) => pageNumber === number + 1,
    [number]
  );

  const totalPagesArray = useMemo(() => {
    return Array.from(Array(totalPages).keys()) || [];
  }, [totalPages]);

  const handlePaginationItemClick = (pageToGo) => {
    handlePaginationChange(pageToGo);
  };

  return (
    <CardFooter className="py-4">
      <nav aria-label="...">
        <Pagination
          className="pagination justify-content-end mb-0"
          listClassName="justify-content-end mb-0"
        >
          {!first && <PaginationItem>
            <PaginationLink
              onClick={() => handlePaginationChange(number - 1)}
              tabIndex="-1"
            >
              <i className="fas fa-angle-left" />
              <span className="sr-only">Anterior</span>
            </PaginationLink>
          </PaginationItem>}
          {totalPagesArray.map(page => {
            const pageNumber = page + 1;
            return (
              <PaginationItem key={pageNumber} className="active" disabled={isCurrentPage(pageNumber)}>
                <PaginationLink
                  onClick={() => handlePaginationItemClick(pageNumber - 1)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          {!last && <PaginationItem>
            <PaginationLink
              onClick={() => handlePaginationChange(number + 1)}
            >
              <i className="fas fa-angle-right" />
              <span className="sr-only">Próximo</span>
            </PaginationLink>
          </PaginationItem>}
        </Pagination>
      </nav>
    </CardFooter>
  );
};

TablePagination.propTypes = {
  last: PropTypes.bool,
  first: PropTypes.bool,
  totalPages: PropTypes.number,
  number: PropTypes.number
};

export default TablePagination;
import React from "react";
import ReactPaginate from "react-paginate";
import clsx from "clsx";
import styles from "./AdminTable.module.scss";

const AdminTable = ({
  columns = [],
  data = [],
  loading = false,
  error = null,
  onRetry = null,
  pagination = null,
  onPageChange = null,
  emptyMessage = "No data available",
  className = "",
  rowKey = "id",
  onRowClick = null,
  actions = null,
  serverSide = false,
  totalCount = 0,
  itemsPerPage = 10,
}) => {
  const handleRowClick = (rowData, index) => {
    if (onRowClick) {
      onRowClick(rowData, index);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // react-paginate is 0-based
    if (onPageChange) {
      onPageChange(selectedPage);
    }
  };

  const renderCellContent = (column, rowData, rowIndex) => {
    const { key, render, align = "left" } = column;
    const value = rowData[key];

    if (render && typeof render === "function") {
      return render(value, rowData, rowIndex);
    }

    // Default rendering
    if (value === null || value === undefined) {
      return <span className={styles.nullValue}>N/A</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span
          className={clsx(styles.booleanValue, {
            [styles.booleanTrue]: value,
            [styles.booleanFalse]: !value,
          })}
        >
          {value ? "Yes" : "No"}
        </span>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <span className={styles.objectValue}>{JSON.stringify(value)}</span>
      );
    }

    return <span className={styles.cellValue}>{String(value)}</span>;
  };

  const renderPagination = () => {
    // For server-side pagination
    if (serverSide) {
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      if (totalPages <= 1) return null;

      const currentPage = pagination?.current_page || 1;
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, totalCount);

      return (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {startItem} to {endItem} of {totalCount} items
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1} // react-paginate is 0-based
            className={styles.reactPaginate}
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            previousClassName={styles.pageItem}
            previousLinkClassName={styles.pageLink}
            nextClassName={styles.pageItem}
            nextLinkClassName={styles.pageLink}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pageLink}
            activeClassName={styles.active}
            disabledClassName={styles.disabled}
          />
        </div>
      );
    }

    // For client-side pagination (legacy support)
    if (!pagination || pagination.total_pages <= 1) return null;

    const { current_page, total_pages, total, per_page } = pagination;
    const startItem = (current_page - 1) * per_page + 1;
    const endItem = Math.min(current_page * per_page, total);

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Showing {startItem} to {endItem} of {total} items
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={total_pages}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          forcePage={current_page - 1} // react-paginate is 0-based
          className={styles.reactPaginate}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          previousClassName={styles.pageItem}
          previousLinkClassName={styles.pageLink}
          nextClassName={styles.pageItem}
          nextLinkClassName={styles.pageLink}
          breakClassName={styles.pageItem}
          breakLinkClassName={styles.pageLink}
          activeClassName={styles.active}
          disabledClassName={styles.disabled}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className={clsx(styles.tableContainer, className)}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(styles.tableContainer, className)}>
        <div className={styles.errorState}>
          <svg
            className={styles.errorIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>{error}</p>
          {onRetry && (
            <button onClick={onRetry} className={styles.retryButton}>
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={clsx(styles.tableContainer, className)}>
        <div className={styles.emptyState}>
          <svg
            className={styles.emptyIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(styles.tableHeader, {
                    [styles[
                      `align${
                        column.align?.charAt(0).toUpperCase() +
                        column.align?.slice(1)
                      }`
                    ]]: column.align,
                  })}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
              {actions && (
                <th
                  className={clsx(
                    styles.tableHeader,
                    styles.stickyActionsHeader
                  )}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, rowIndex) => (
              <tr
                key={rowData[rowKey] || rowIndex}
                className={clsx(styles.tableRow, {
                  [styles.clickableRow]: onRowClick,
                })}
                onClick={() => handleRowClick(rowData, rowIndex)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(styles.tableCell, {
                      [styles[
                        `align${
                          column.align?.charAt(0).toUpperCase() +
                          column.align?.slice(1)
                        }`
                      ]]: column.align,
                    })}
                  >
                    {renderCellContent(column, rowData, rowIndex)}
                  </td>
                ))}
                {actions && (
                  <td
                    className={clsx(styles.tableCell, styles.stickyActionsCell)}
                  >
                    {typeof actions === "function"
                      ? actions(rowData, rowIndex)
                      : actions}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default AdminTable;

import { Button } from "react-bootstrap";
import { number, func } from "prop-types";
import "./index.scss";

/**
 * Pagination component
 *
 */
const CustomPagination = ({ total, itemPerPage, onPageClick, activePage }) => {
  const totalPages = Math.ceil(total / itemPerPage);
  const pageItems = [];
  let nextPages = activePage + 3
  let initialValue = activePage
  if (nextPages > totalPages) nextPages = totalPages - 3
  if (nextPages <= 0) nextPages = totalPages 
  let currentDiff = totalPages - initialValue
  if (currentDiff < 3) initialValue = totalPages - 3
  if (nextPages === initialValue) nextPages = totalPages
  if (initialValue < 0) initialValue = 1
  for (let i = initialValue; i <= nextPages; i++) {
    pageItems.push(i);
  }
  if (pageItems.length === 0) return null
  return (
    <ul className="page-list">
      {pageItems.length > 0}
      <li>
        <Button
          disabled={pageItems.length <= 1 || activePage === 1}
          onClick={() => onPageClick(activePage - 1)}
        >
          Prev
        </Button>
      </li>
      {pageItems.map((el) => {
        return (
          <li key={`navigation_${el}`}>
            <Button
              variant="outline"
              onClick={() => onPageClick(el)}
              disabled={activePage === el}
              className="page_btn"
            >
              {el}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          disabled={pageItems.length <= 1 || pageItems.length === activePage}
          onClick={() => onPageClick(activePage + 1)}
        >
          Next
        </Button>
      </li>
    </ul>
  );
};

CustomPagination.propTypes = {
  /** Total number of records */
  total: number,
  /** Current active page number */
  activePage: number,
  /** Items per page */
  itemPerPage: number,
  /** On page click event handler */
  onPageClick: func
}

CustomPagination.defaultProps = {
    total: 0,
    activePage: 1,
    itemPerPage: 10,
    onPageClick: () => true
}
export default CustomPagination;

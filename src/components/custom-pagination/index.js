import { Button } from "react-bootstrap";
import "./index.scss";

const CustomPagination = ({ total, itemPerPage, onPageClick, activePage }) => {
  const totalPages = Math.ceil(total / itemPerPage);
  const pageItems = [];
  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(i);
  }
  return (
    <ul className="page-list">
      {pageItems.length > 0}
      <li>
        <Button
          disabled={pageItems.length <= 1 || pageItems.length === activePage}
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

CustomPagination.defaultProps = {
    total: 0,
    activePage: 1,
    itemPerPage: 10,
    onPageClick: () => true
}
export default CustomPagination;

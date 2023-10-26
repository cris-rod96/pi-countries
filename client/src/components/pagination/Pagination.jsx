import { useSelector } from "react-redux";
import styledPagination from "./Pagination.module.css";
export const Pagination = (props) => {
  const { totalPages, handlePage } = props;
  const currentPage = useSelector((state) => state.countries.currentPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePage(currentPage - 1);
    }
  };
  return (
    <div className={styledPagination.paginated}>
      <button
        disabled={currentPage - 1 == 0 ? true : false}
        onClick={handlePrevPage}
      >
        {"<<"}
      </button>
      <span>
        {currentPage} de {totalPages}
      </span>
      <button
        disabled={currentPage + 1 > totalPages ? true : false}
        onClick={handleNextPage}
      >
        {">>"}
      </button>
    </div>
  );
};

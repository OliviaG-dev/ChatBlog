import './pagination.css';
import { PaginationProps } from '../../services/interface';

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 1;
    const halfMaxVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - halfMaxVisible, 1);
    let end = Math.min(currentPage + halfMaxVisible, pageNumbers.length);

    if (currentPage <= halfMaxVisible) {
      end = Math.min(maxVisiblePages, pageNumbers.length);
    }

    if (currentPage + halfMaxVisible >= pageNumbers.length) {
      start = Math.max(pageNumbers.length - maxVisiblePages + 1, 1);
    }

    return pageNumbers.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="pagination_container">
      <ul className="pagination">
        <li
          className={`pagination_item ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <a
            onClick={() => paginate(currentPage - 1)}
            href="#!"
            className="pagination_link"
          >
            &laquo;
          </a>
        </li>
        {visiblePages.map((number) => (
          <li
            key={number}
            className={`pagination_item ${number === currentPage ? 'active' : ''}`}
          >
            <a
              onClick={() => paginate(number)}
              href="#!"
              className="pagination_link"
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={`pagination_item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
        >
          <a
            onClick={() => paginate(currentPage + 1)}
            href="#!"
            className="pagination_link"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

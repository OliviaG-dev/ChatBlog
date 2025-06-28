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
    const maxVisiblePages = 5; // Afficher jusqu'à 5 pages
    const halfMaxVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - halfMaxVisible, 1);
    let end = Math.min(currentPage + halfMaxVisible, pageNumbers.length);

    // Ajuster si on est près du début
    if (currentPage <= halfMaxVisible) {
      end = Math.min(maxVisiblePages, pageNumbers.length);
    }

    // Ajuster si on est près de la fin
    if (currentPage + halfMaxVisible >= pageNumbers.length) {
      start = Math.max(pageNumbers.length - maxVisiblePages + 1, 1);
    }

    return pageNumbers.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  // Ne pas afficher la pagination s'il n'y a qu'une page
  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <nav className="pagination_container">
      <ul className="pagination">
        {/* Bouton Précédent */}
        <li
          className={`pagination_item ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <a
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            href="#!"
            className="pagination_link"
            aria-label="Page précédente"
          >
            &laquo;
          </a>
        </li>

        {/* Première page si elle n'est pas visible */}
        {visiblePages[0] > 1 && (
          <>
            <li className="pagination_item">
              <a
                onClick={() => paginate(1)}
                href="#!"
                className="pagination_link"
              >
                1
              </a>
            </li>
            {visiblePages[0] > 2 && (
              <li className="pagination_item">
                <span className="pagination_link disabled">...</span>
              </li>
            )}
          </>
        )}

        {/* Pages visibles */}
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

        {/* Dernière page si elle n'est pas visible */}
        {visiblePages[visiblePages.length - 1] < pageNumbers.length && (
          <>
            {visiblePages[visiblePages.length - 1] < pageNumbers.length - 1 && (
              <li className="pagination_item">
                <span className="pagination_link disabled">...</span>
              </li>
            )}
            <li className="pagination_item">
              <a
                onClick={() => paginate(pageNumbers.length)}
                href="#!"
                className="pagination_link"
              >
                {pageNumbers.length}
              </a>
            </li>
          </>
        )}

        {/* Bouton Suivant */}
        <li
          className={`pagination_item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
        >
          <a
            onClick={() =>
              currentPage < pageNumbers.length && paginate(currentPage + 1)
            }
            href="#!"
            className="pagination_link"
            aria-label="Page suivante"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

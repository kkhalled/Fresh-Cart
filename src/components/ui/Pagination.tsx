"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Scroll to this element id after page change */
  scrollToId?: string;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  scrollToId,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handleChange = (page: number) => {
    onPageChange(page);
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-8 flex-wrap"
      aria-label="Pagination"
    >
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handleChange(page as number)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-green-600 text-white shadow-sm"
                : "border border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
      </button>
    </nav>
  );
}

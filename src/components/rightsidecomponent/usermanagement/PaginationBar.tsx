// components/Pagination.tsx
import { FC } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4  p-4 rounded  text-sm">
      <p className="text-gray-700">
        Showing <span className="font-medium">{itemsPerPage}</span> of <span className="font-medium">{totalItems}</span> results
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-3 border rounded ${currentPage === number ? 'bg-green-500 text-white' : 'hover:bg-gray-100 bg-gray-200 border-none'}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
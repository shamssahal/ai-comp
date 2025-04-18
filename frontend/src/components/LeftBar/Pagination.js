import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-white">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-100"
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}
import React from 'react';

export default function HistoryItem({ prompt, timestamp, onClick }) {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer p-2 bg-gray-50 rounded hover:bg-gray-100"
    >
      <p className="text-sm font-medium truncate">{prompt}</p>
      <p className="text-xs text-gray-500">
        {new Date(timestamp).toLocaleString()}
      </p>
    </li>
  );
}
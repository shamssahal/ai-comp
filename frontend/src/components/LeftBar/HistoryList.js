import React from 'react';
import HistoryItem from './HistoryItem';

export default function HistoryList({ items, onItemClick }) {
  if (!items.length) {
    return <p className="text-gray-500">No history yet.</p>;
  }
  return (
    <ul className="space-y-2">
      {items.map((r) => (
        <HistoryItem
          key={r.requestId}
          prompt={r.prompt}
          timestamp={r.timestamp}
          onClick={() => onItemClick(r.requestId)}
        />
      ))}
    </ul>
  );
}
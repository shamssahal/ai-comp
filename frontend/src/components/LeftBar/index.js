import React, { useState, useRef, useEffect,  } from 'react';
import RefreshIcon from '../../assets/refresh.png';
import { fetchRequests, getRequest } from '../../api/client';
import HistoryList from './HistoryList';
import Pagination from './Pagination';


export default function LeftBar({onSelect}) {


  const [rotating, setRotating] = useState(false);
  const [width, setWidth] = useState(250);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const sidebarRef = useRef(null);
  const isResizing = useRef(false);

  const minWidth = 200;
  const maxWidth = 400;

  const loadHistory = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data: items, page: pg, totalPages: tp } = await fetchRequests(p, limit);
      setRequests(items);
      setPage(pg);
      setTotalPages(tp);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('Unable to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory(page);
  }, []);

  // Resize handlers
  const handleMouseDown = (e) => {
    isResizing.current = true;
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const sidebarLeft = sidebarRef.current.getBoundingClientRect().left;
    let newWidth = e.clientX - sidebarLeft;
    newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    setWidth(newWidth);
  };
  const handleMouseUp = () => {
    isResizing.current = false;
  };
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Refresh click handler
  const handleRefresh = () => {
    if (rotating) return;
    setRotating(true);
    loadHistory(page);
    setTimeout(() => setRotating(false), 500);
  };

  // On history item click
  const handleSelectRequest = async (requestId) => {
    try {
      const full = await getRequest(requestId);
      onSelect(full);
    } catch (err) {
        console.error('Error loading history item:', err);
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="relative flex flex-col bg-white border-r border-gray-300 overflow-y-auto overscroll-contain h-[calc(100vh-4rem)]"
      style={{ width: `${width}px` }}
    >
      {/* Resize handle */}
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-transparent hover:bg-gray-200"
        onMouseDown={handleMouseDown}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold">History</h2>
        <button
          type="button"
          onClick={handleRefresh}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Refresh history"
        >
          <img
            src={RefreshIcon}
            alt="Refresh"
            className={`h-5 w-5 ${rotating ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 p-4">
        {loading ? (
          <p className="text-gray-500">Loading history...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <HistoryList items={requests} onItemClick={handleSelectRequest} />
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => loadHistory(p)}
      />
    </aside>
  );
}
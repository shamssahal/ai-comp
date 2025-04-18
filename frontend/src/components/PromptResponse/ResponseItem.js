import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ResponseItem({ modelName, text, innerRef, loading }) {
  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-md h-full flex flex-col">
      <h3 className="font-bold text-2xl mb-4 text-center">{modelName}</h3>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div
          ref={innerRef}
          className="flex-1 overflow-auto whitespace-pre-wrap text-sm text-gray-800"
        >
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

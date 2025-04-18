// File: src/components/RightBar/AnalyticsCard.js
import React from 'react';

export default function AnalyticsCard({ model, usage, cost, latency }) {
  return (
    <div className="bg-amber-50 p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-bold text-black mb-3">
        {model.replace('_', ' ').toUpperCase()}
      </h4>

      {/* Usage Section */}
      <div className="border-t border-gray-300 pt-2 mb-4">
        <h5 className="font-semibold text-black mb-2">Usage</h5>
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Prompt Tokens</span>
            <span>{usage.prompt_tokens}</span>
          </div>
          <div className="flex justify-between">
            <span>Completion Tokens</span>
            <span>{usage.completion_tokens}</span>
          </div>
        </div>
      </div>

      {/* Cost Section */}
      <div className="border-t border-gray-300 pt-2 mb-4">
        <h5 className="font-semibold text-black mb-2">Cost</h5>
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Prompt Cost</span>
            <span>${cost.prompt_cost.toFixed(8)}</span>
          </div>
          <div className="flex justify-between">
            <span>Completion Cost</span>
            <span>${cost.completion_cost.toFixed(8)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Cost</span>
            <span>${cost.total_cost.toFixed(8)}</span>
          </div>
        </div>
      </div>

      {/* Latency Section */}
      <div className="border-t border-gray-300 pt-2">
        <h5 className="font-semibold text-black mb-2">Latency</h5>
        <div className="text-sm text-gray-700">
          {latency} ms
        </div>
      </div>
    </div>
  );
}

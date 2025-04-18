// File: src/components/RightBar/Timeseries.js
import React, { useEffect, useState } from 'react';
import { fetchTimeSeries } from '../../api/client';   // ← import it
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function Timeseries() {
  const [series, setSeries]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTimeSeries()
      .then(points => {
        if (!cancelled) setSeries(points);
      })
      .catch(err => {
        console.error('Failed to load time series:', err);
        if (!cancelled) setError('Unable to load time series');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }
  if (error) {
    return <p className="text-red-500 text-center mb-6">{error}</p>;
  }
  if (!series.length) {
    return <p className="text-gray-500 text-center mb-6">No time‑series data available.</p>;
  }

  const sample      = series[0];
  const costKeys    = Object.keys(sample).filter(k => k.endsWith('_cost'));
  const latencyKeys = Object.keys(sample).filter(k => k.endsWith('_latency'));
  const colors = ['#10B981', '#F59E0B', '#3B82F6'];

  return (
    <div className="space-y-6 mb-6">
      {/* Cost Over Time */}
      <div className="h-48 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-2">Cost Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={v => `$${v.toFixed(8)}`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {costKeys.map((key, idx) => (
              <Line
                key={key}
                dataKey={key}
                name={key.replace('_cost','')}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Latency Over Time */}
      <div className="h-48 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-2">Latency Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={v => `${v} ms`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {latencyKeys.map((key, idx) => (
              <Line
                key={key}
                dataKey={key}
                name={key.replace('_latency','')}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

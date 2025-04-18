import React, { useContext } from 'react';
import { ResponseContext } from '../../context/ResponseContext';
import Timeseries         from './TimeSeries';
import AnalyticsCard      from './AnalyticsCard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from 'recharts';

export default function RightBar() {
  const { currentRequest } = useContext(ResponseContext);
  const results = currentRequest?.results || [];
  const latencyData = results.map(r => ({
    model:   r.model,
    latency: r.duration_ms
  }));
  const costData = results.map(r => ({
    model: r.model,
    cost:  r.cost.total_cost
  }));
  const maxCost = costData.reduce((mx, d) => (d.cost > mx ? d.cost : mx), 0);
  const chartColors = ['#10B981', '#F59E0B', '#3B82F6'];

  return (
    <aside className="w-[40rem] bg-white border-l border-gray-300 overflow-hidden">
      <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        
        <Timeseries />

        {results.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">No analytics to display.</p>
          </div>
        ) : (
          <>

            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Bar Charts */}
              <div className="flex gap-6 mb-6">
                {/* Latency Chart */}
                <div className="flex-1 h-64 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Latency (ms)</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={latencyData}
                      margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="model"
                        tick={{ fontSize: 10 }}
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={value => `${value} ms`} />
                      <Bar dataKey="latency">
                        {latencyData.map((entry, idx) => (
                          <Cell key={entry.model} fill={chartColors[idx % chartColors.length]} />
                        ))}
                        <LabelList
                          dataKey="latency"
                          position="top"
                          formatter={v => `${v}ms`}
                          style={{ fontSize: 10 }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Cost Chart */}
                <div className="flex-1 h-64 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Total Cost ($)</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={costData}
                      margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="model"
                        tick={{ fontSize: 10 }}
                        interval={0}
                      />
                      <YAxis
                        domain={[0, maxCost * 1.1]}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip formatter={value => `$${value.toFixed(8)}`} />
                      <Bar dataKey="cost">
                        {costData.map((entry, idx) => (
                          <Cell key={entry.model} fill={chartColors[idx % chartColors.length]} />
                        ))}
                        <LabelList
                          dataKey="cost"
                          position="top"
                          formatter={v => `$${v.toFixed(8)}`}
                          style={{ fontSize: 10 }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Analytics Cards */}
              <div className="space-y-4">
                {results.map(r => (
                  <AnalyticsCard
                    key={r.model}
                    model={r.model}
                    usage={r.usage}
                    cost={r.cost}
                    latency={r.duration_ms}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

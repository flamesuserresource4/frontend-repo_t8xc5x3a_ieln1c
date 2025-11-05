import React, { useMemo } from 'react';

function aggregateByMonth(rows) {
  const map = new Map();
  rows.forEach((r) => {
    const key = r.Month;
    const current = map.get(key) || { sales: 0, qty: 0 };
    map.set(key, { sales: current.sales + r.Sales, qty: current.qty + r.Qty });
  });
  // sort months by custom order if numeric found, else alphabetical
  const months = Array.from(map.keys());
  const order = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const sorted = months.sort((a,b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    return a.localeCompare(b);
  });
  return sorted.map((m) => ({ month: m, ...map.get(m) }));
}

export default function SalesChart({ data }) {
  const series = useMemo(() => aggregateByMonth(data), [data]);
  const width = 900;
  const height = 260;
  const padding = 40;
  const maxY = Math.max(1, ...series.map((d) => d.sales));

  const xStep = (width - padding * 2) / Math.max(1, series.length - 1);
  const yScale = (v) => height - padding - (v / maxY) * (height - padding * 2);

  const path = series
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding + i * xStep} ${yScale(d.sales)}`)
    .join(' ');

  const area = `M ${padding} ${height - padding} ` +
    series.map((d, i) => `L ${padding + i * xStep} ${yScale(d.sales)}`).join(' ') +
    ` L ${padding + (series.length - 1) * xStep} ${height - padding} Z`;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Sales by Month</h3>
          <p className="text-xs text-slate-500">Aggregated sales volume</p>
        </div>
        <div className="text-xs text-slate-500">Max: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(maxY)}</div>
      </div>
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="min-w-full">
          <defs>
            <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="white" />
          <path d={area} fill="url(#fillArea)" />
          <path d={path} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {series.map((d, i) => (
            <g key={d.month}>
              <circle cx={padding + i * xStep} cy={yScale(d.sales)} r="3" fill="#1d4ed8" />
              <text x={padding + i * xStep} y={height - padding + 16} textAnchor="middle" className="fill-slate-500 text-[10px]">
                {d.month}
              </text>
            </g>
          ))}
          {/* y-axis */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line
                x1={padding}
                y1={yScale(maxY * t)}
                x2={width - padding}
                y2={yScale(maxY * t)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text x={8} y={yScale(maxY * t) + 4} className="fill-slate-400 text-[10px]">
                {new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(maxY * t)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

import React from 'react';

export default function DataTable({ rows }) {
  const headers = [
    'Date',
    'Month',
    'Sub Product Categories',
    'Product Categories',
    'Name Product',
    'Qty',
    'Sales',
    'HPP',
    'Name Channel',
    'Sub Channel Categories',
    'Channel Categories',
    'City',
    'Province',
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Dataset Preview</h3>
        <span className="text-xs text-slate-500">{rows.length} rows</span>
      </div>
      <div className="max-h-[360px] overflow-auto rounded-lg border border-slate-100">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-50 text-slate-600">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                <td className="px-3 py-2 text-slate-700">{r.Date}</td>
                <td className="px-3 py-2 text-slate-700">{r.Month}</td>
                <td className="px-3 py-2 text-slate-700">{r.SubProductCategory}</td>
                <td className="px-3 py-2 text-slate-700">{r.ProductCategory}</td>
                <td className="px-3 py-2 text-slate-700">{r.ProductName}</td>
                <td className="px-3 py-2 text-slate-700">{r.Qty}</td>
                <td className="px-3 py-2 text-slate-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(r.Sales)}</td>
                <td className="px-3 py-2 text-slate-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(r.HPP)}</td>
                <td className="px-3 py-2 text-slate-700">{r.ChannelName}</td>
                <td className="px-3 py-2 text-slate-700">{r.SubChannelCategory}</td>
                <td className="px-3 py-2 text-slate-700">{r.ChannelCategory}</td>
                <td className="px-3 py-2 text-slate-700">{r.City}</td>
                <td className="px-3 py-2 text-slate-700">{r.Province}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

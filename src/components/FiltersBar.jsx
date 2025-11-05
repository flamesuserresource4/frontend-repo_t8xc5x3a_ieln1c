import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FiltersBar({
  months,
  productCategories,
  channels,
  selected,
  onChange,
  onReset,
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 text-slate-700">
        <Filter size={18} />
        <span className="font-medium">Filters</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-500">Month</span>
          <select
            value={selected.month || ''}
            onChange={(e) => onChange({ ...selected, month: e.target.value || null })}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-slate-400"
          >
            <option value="">All</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-500">Product Category</span>
          <select
            value={selected.productCategory || ''}
            onChange={(e) => onChange({ ...selected, productCategory: e.target.value || null })}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-slate-400"
          >
            <option value="">All</option>
            {productCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-500">Channel</span>
          <select
            value={selected.channel || ''}
            onChange={(e) => onChange({ ...selected, channel: e.target.value || null })}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-slate-400"
          >
            <option value="">All</option>
            {channels.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <RotateCcw size={16} /> Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

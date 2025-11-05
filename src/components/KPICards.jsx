import React from 'react';
import { DollarSign, ShoppingCart, Tag, TrendingUp } from 'lucide-react';

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0);
}

export default function KPICards({ kpis }) {
  const items = [
    {
      label: 'Total Sales',
      value: formatCurrency(kpis.totalSales),
      icon: DollarSign,
      accent: 'from-emerald-500/10 to-emerald-500/5 text-emerald-600',
    },
    {
      label: 'Quantity Sold',
      value: new Intl.NumberFormat().format(kpis.totalQty || 0),
      icon: ShoppingCart,
      accent: 'from-blue-500/10 to-blue-500/5 text-blue-600',
    },
    {
      label: 'Avg. Price',
      value: formatCurrency(kpis.avgPrice),
      icon: Tag,
      accent: 'from-amber-500/10 to-amber-500/5 text-amber-600',
    },
    {
      label: 'Gross Profit',
      value: formatCurrency(kpis.grossProfit),
      icon: TrendingUp,
      accent: 'from-fuchsia-500/10 to-fuchsia-500/5 text-fuchsia-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon, accent }) => (
        <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-br ${accent} px-3 py-2`}>
            <Icon size={16} />
            <span className="text-xs font-medium text-slate-700">{label}</span>
          </div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{value}</div>
        </div>
      ))}
    </div>
  );
}

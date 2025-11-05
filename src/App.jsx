import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import FiltersBar from './components/FiltersBar';
import KPICards from './components/KPICards';
import SalesChart from './components/SalesChart';
import DataTable from './components/DataTable';

// Sample dataset to demonstrate the dashboard. Replace with your Google Sheets data later.
const sampleRows = [
  {
    Date: '2025-01-05',
    Month: 'Jan',
    SubProductCategory: 'Accessories',
    ProductCategory: 'Electronics',
    ProductName: 'Wireless Mouse',
    Qty: 42,
    Sales: 2100,
    HPP: 1200,
    ChannelName: 'Online Store',
    SubChannelCategory: 'Web',
    ChannelCategory: 'E-commerce',
    City: 'Jakarta',
    Province: 'DKI Jakarta',
  },
  {
    Date: '2025-01-12',
    Month: 'Jan',
    SubProductCategory: 'Laptops',
    ProductCategory: 'Electronics',
    ProductName: 'Ultrabook 13"',
    Qty: 8,
    Sales: 9600,
    HPP: 7200,
    ChannelName: 'Retail Partner',
    SubChannelCategory: 'Modern Trade',
    ChannelCategory: 'Retail',
    City: 'Bandung',
    Province: 'West Java',
  },
  {
    Date: '2025-02-03',
    Month: 'Feb',
    SubProductCategory: 'Smartphones',
    ProductCategory: 'Electronics',
    ProductName: 'Phone X',
    Qty: 30,
    Sales: 18000,
    HPP: 13500,
    ChannelName: 'Marketplace',
    SubChannelCategory: 'Marketplace',
    ChannelCategory: 'E-commerce',
    City: 'Surabaya',
    Province: 'East Java',
  },
  {
    Date: '2025-02-18',
    Month: 'Feb',
    SubProductCategory: 'Accessories',
    ProductCategory: 'Electronics',
    ProductName: 'USB-C Hub',
    Qty: 55,
    Sales: 2750,
    HPP: 1650,
    ChannelName: 'Online Store',
    SubChannelCategory: 'Web',
    ChannelCategory: 'E-commerce',
    City: 'Jakarta',
    Province: 'DKI Jakarta',
  },
  {
    Date: '2025-03-07',
    Month: 'Mar',
    SubProductCategory: 'Appliances',
    ProductCategory: 'Home & Living',
    ProductName: 'Smart Vacuum',
    Qty: 12,
    Sales: 4800,
    HPP: 3200,
    ChannelName: 'Retail Partner',
    SubChannelCategory: 'Modern Trade',
    ChannelCategory: 'Retail',
    City: 'Bekasi',
    Province: 'West Java',
  },
];

function computeKPIs(rows) {
  const totalSales = rows.reduce((s, r) => s + r.Sales, 0);
  const totalQty = rows.reduce((s, r) => s + r.Qty, 0);
  const totalHPP = rows.reduce((s, r) => s + r.HPP, 0);
  const avgPrice = totalQty > 0 ? totalSales / totalQty : 0;
  const grossProfit = totalSales - totalHPP;
  return { totalSales, totalQty, avgPrice, grossProfit };
}

export default function App() {
  const [filters, setFilters] = useState({ month: null, productCategory: null, channel: null });

  const uniqueMonths = useMemo(() => Array.from(new Set(sampleRows.map((r) => r.Month))), []);
  const uniqueProductCategories = useMemo(() => Array.from(new Set(sampleRows.map((r) => r.ProductCategory))), []);
  const uniqueChannels = useMemo(() => Array.from(new Set(sampleRows.map((r) => r.ChannelName))), []);

  const filtered = useMemo(() => {
    return sampleRows.filter((r) => {
      if (filters.month && r.Month !== filters.month) return false;
      if (filters.productCategory && r.ProductCategory !== filters.productCategory) return false;
      if (filters.channel && r.ChannelName !== filters.channel) return false;
      return true;
    });
  }, [filters]);

  const kpis = useMemo(() => computeKPIs(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        <Hero3D />

        <FiltersBar
          months={uniqueMonths}
          productCategories={uniqueProductCategories}
          channels={uniqueChannels}
          selected={filters}
          onChange={setFilters}
          onReset={() => setFilters({ month: null, productCategory: null, channel: null })}
        />

        <KPICards kpis={kpis} />

        <SalesChart data={filtered} />

        <DataTable rows={filtered} />

        <section className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <h3 className="mb-2 text-base font-semibold text-slate-900">Connect to Google Sheets</h3>
          <p>
            Ready to use your live spreadsheet? We can hook this dashboard to Google Sheets via
            Apps Script or a backend API. Share your sheet structure and we’ll stream the data in.
          </p>
        </section>
      </div>
    </div>
  );
}

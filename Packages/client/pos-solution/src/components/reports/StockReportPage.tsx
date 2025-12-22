// src/pages/reports/StockReportPage.tsx
import { useMemo, useState } from "react";

type StockRow = {
  id: number;
  code: string;
  name: string;
  currentStock: number;
  reorderLevel: number;
  purchasePrice: number;
  sellPrice: number;
};

const mockStock: StockRow[] = [
  {
    id: 1,
    code: "ELC-1001",
    name: "LED Bulb 12W",
    currentStock: 120,
    reorderLevel: 40,
    purchasePrice: 45,
    sellPrice: 80,
  },
  {
    id: 2,
    code: "ELC-2002",
    name: "Extension Board 4 Socket",
    currentStock: 12,
    reorderLevel: 25,
    purchasePrice: 210,
    sellPrice: 320,
  },
  {
    id: 3,
    code: "ELC-3003",
    name: "USB Charger 2.4A",
    currentStock: 6,
    reorderLevel: 20,
    purchasePrice: 160,
    sellPrice: 260,
  },
];

export function StockReportPage() {
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);

  const filteredRows = useMemo(() => {
    return mockStock.filter((p) => {
      const matchSearch = (p.name + p.code)
        .toLowerCase()
        .includes(search.toLowerCase());
      const isLow = p.currentStock <= p.reorderLevel;
      if (filterLowStock && !isLow) return false;
      return matchSearch;
    });
  }, [search, filterLowStock]);

  const totalItems = filteredRows.length;
  const lowStockCount = filteredRows.filter(
    (p) => p.currentStock <= p.reorderLevel
  ).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Stock report
          </h2>
          <p className="text-xs text-slate-500">
            Track current quantities and identify what to reorder from China.
          </p>
        </div>
      </div>

      {/* Summary + filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <MiniStat label="Listed products" value={totalItems} />
          <MiniStat
            label="Low stock items"
            value={lowStockCount}
            accent={lowStockCount > 0}
          />
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <label className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={filterLowStock}
              onChange={(e) => setFilterLowStock(e.target.checked)}
              className="h-3 w-3 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            Low stock only
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Code
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                In stock
              </th>
              {/* <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Reorder at
              </th> */}
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Buy price
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sell price
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Margin / unit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRows.map((row) => {
              const isLow = row.currentStock <= row.reorderLevel;
              const margin = row.sellPrice - row.purchasePrice;

              return (
                <tr
                  key={row.id}
                  className={isLow ? "bg-rose-50/60" : "hover:bg-slate-50"}
                >
                  <td className="px-4 py-2 text-xs font-mono text-slate-600">
                    {row.code}
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-sm text-slate-900">{row.name}</p>
                    {isLow && (
                      <p className="text-[11px] font-medium text-rose-600">
                        Low stock — consider reordering
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-slate-800">
                    {row.currentStock}
                  </td>
                  {/* <td className="px-4 py-2 text-right text-sm text-slate-700">
                    {row.reorderLevel}
                  </td> */}
                  <td className="px-4 py-2 text-right text-sm text-slate-700">
                    ₹{row.purchasePrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-slate-700">
                    ₹{row.sellPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-emerald-700">
                    ₹{margin.toFixed(2)}
                  </td>
                </tr>
              );
            })}

            {!filteredRows.length && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No products match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type MiniStatProps = {
  label: string;
  value: number;
  accent?: boolean;
};

function MiniStat({ label, value, accent }: MiniStatProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold ${
          accent ? "text-rose-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

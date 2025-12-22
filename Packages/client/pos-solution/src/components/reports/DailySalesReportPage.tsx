// src/pages/reports/DailySalesReportPage.tsx
import { useMemo, useState } from "react";

type SaleRow = {
  id: string;
  time: string;
  invoiceNo: string;
  itemsCount: number;
  subtotal: number;
  gstAmount: number;
  total: number;
};

const mockSales: SaleRow[] = [
  {
    id: "1",
    time: "10:12 AM",
    invoiceNo: "INV-0001",
    itemsCount: 4,
    subtotal: 1320,
    gstAmount: 237.6,
    total: 1557.6,
  },
  {
    id: "2",
    time: "12:45 PM",
    invoiceNo: "INV-0002",
    itemsCount: 2,
    subtotal: 620,
    gstAmount: 111.6,
    total: 731.6,
  },
  {
    id: "3",
    time: "05:18 PM",
    invoiceNo: "INV-0003",
    itemsCount: 6,
    subtotal: 2420,
    gstAmount: 435.6,
    total: 2855.6,
  },
];

export function DailySalesReportPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const totals = useMemo(() => {
    const subtotal = mockSales.reduce((s, r) => s + r.subtotal, 0);
    const gst = mockSales.reduce((s, r) => s + r.gstAmount, 0);
    const total = mockSales.reduce((s, r) => s + r.total, 0);
    return { subtotal, gst, total };
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Daily sales
          </h2>
          <p className="text-xs text-slate-500">
            Overview of all bills for the selected day.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryCard label="Total bills" value={mockSales.length.toString()} />
        <SummaryCard
          label="Total sales (incl. GST)"
          value={`₹${totals.total.toFixed(2)}`}
        />
        {/* <SummaryCard
          label="GST collected"
          value={`₹${totals.gst.toFixed(2)}`}
          accent
        /> */}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Time
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Invoice
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Items
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Subtotal
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                GST
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-slate-50">
                <td className="px-4 py-2 text-xs text-slate-700">
                  {sale.time}
                </td>
                <td className="px-4 py-2 text-sm text-slate-900">
                  {sale.invoiceNo}
                </td>
                <td className="px-4 py-2 text-right text-sm text-slate-800">
                  {sale.itemsCount}
                </td>
                <td className="px-4 py-2 text-right text-sm text-slate-700">
                  ₹{sale.subtotal.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right text-sm text-slate-700">
                  ₹{sale.gstAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right text-sm font-medium text-slate-900">
                  ₹{sale.total.toFixed(2)}
                </td>
              </tr>
            ))}

            {!mockSales.length && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No sales recorded for this day.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  accent?: boolean;
};

function SummaryCard({ label, value, accent }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500 text-center">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold text-center ${
          accent ? "text-emerald-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

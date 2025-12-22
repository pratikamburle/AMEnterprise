// src/pages/products/ProductListPage.tsx
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  code: string;
  name: string;
  stock: number;
  purchasePrice: number;
  sellPrice: number;
};

const mockProducts: Product[] = [
  {
    id: 1,
    code: "ELC-1001",
    name: "LED Bulb 12W",
    stock: 120,
    purchasePrice: 45,
    sellPrice: 80,
  },
  {
    id: 2,
    code: "ELC-2002",
    name: "Extension Board 4 Socket",
    stock: 36,
    purchasePrice: 210,
    sellPrice: 320,
  },
];

export function ProductListPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Products
          </h2>
          <p className="text-xs text-slate-500">
            Manage electric items you import and sell locally.
          </p>
        </div>
        <button
          onClick={() => navigate("/products/new")}
          className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-emerald-400"
        >
          + Add product
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or code..."
          className="w-full sm:w-72 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <select className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
          <option>All stock levels</option>
          <option>Low stock only</option>
        </select>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stock
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Buy
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sell
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Profit / unit
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockProducts.map((p) => {
              const profit = p.sellPrice - p.purchasePrice;
              const lowStock = p.stock < 20;

              return (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 align-middle text-xs font-mono text-slate-600">
                    {p.code}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <p className="text-sm text-slate-900">{p.name}</p>
                    {lowStock && (
                      <p className="text-[11px] text-amber-600">
                        Low stock — reorder soon
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-slate-800">
                    {p.stock}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-slate-700">
                    ₹{p.purchasePrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-slate-700">
                    ₹{p.sellPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-emerald-700">
                    ₹{profit.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <button
                      onClick={() => navigate(`/products/${p.id}/edit`)}
                      className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}

            {!mockProducts.length && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No products yet. Add your first item to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

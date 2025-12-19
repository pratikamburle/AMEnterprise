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
          <h2 className="text-lg font-semibold tracking-tight text-slate-50">
            Products
          </h2>
          <p className="text-xs text-slate-400">
            Manage electric items you import and sell locally.
          </p>
        </div>
        <button
          onClick={() => navigate("/products/new")}
          className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-xs font-medium text-emerald-950 shadow-sm hover:bg-emerald-400"
        >
          + Add product
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or code..."
          className="w-full sm:w-72 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <select className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
          <option>All stock levels</option>
          <option>Low stock only</option>
        </select>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-900/80">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Product
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Stock
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Buy
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Sell
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Profit / unit
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {mockProducts.map((p) => {
              const profit = p.sellPrice - p.purchasePrice;
              const lowStock = p.stock < 20;

              return (
                <tr key={p.id} className="hover:bg-slate-900/60">
                  <td className="px-4 py-3 align-middle text-xs font-mono text-slate-300">
                    {p.code}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <p className="text-sm text-slate-100">{p.name}</p>
                    {lowStock && (
                      <p className="text-[11px] text-amber-400">
                        Low stock — reorder soon
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-slate-100">
                    {p.stock}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-slate-300">
                    ₹{p.purchasePrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-slate-300">
                    ₹{p.sellPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm text-emerald-400">
                    ₹{profit.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <button
                      onClick={() => navigate(`/products/${p.id}/edit`)}
                      className="inline-flex items-center rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-100 hover:bg-slate-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}

            {mockProducts.length === 0 && (
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

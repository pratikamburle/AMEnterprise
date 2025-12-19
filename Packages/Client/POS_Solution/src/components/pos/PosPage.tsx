// src/pages/pos/PosPage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  code: string;
  name: string;
  sellPrice: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const mockProducts: Product[] = [
  { id: 1, code: "ELC-1001", name: "LED Bulb 12W", sellPrice: 80 },
  { id: 2, code: "ELC-2002", name: "Extension Board 4 Socket", sellPrice: 320 },
  { id: 3, code: "ELC-3003", name: "USB Charger 2.4A", sellPrice: 260 },
];

export function PosPage() {
  const [codeInput, setCodeInput] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [gstRate] = useState(18);
  const navigate = useNavigate();

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((p) =>
        (p.name + p.code).toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.sellPrice * item.quantity,
        0
      ),
    [cart]
  );

  const totalDiscount = discount + extraDiscount;
  const taxableAmount = Math.max(subtotal - totalDiscount, 0);
  const gstAmount = (taxableAmount * gstRate) / 100;
  const grandTotal = taxableAmount + gstAmount;

  const handleAddByCode = () => {
    const trimmed = codeInput.trim();
    if (!trimmed) return;
    const product = mockProducts.find(
      (p) => p.code.toLowerCase() === trimmed.toLowerCase()
    );
    if (!product) {
      // later: show toast
      setCodeInput("");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCodeInput("");
  };

  const handleAddProduct = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === id ? { ...i, quantity } : i))
      );
    }
  };

  const handleClearCart = () => setCart([]);

  const handleCheckout = () => {
    if (!cart.length) return;

    const receiptData = {
      id: Date.now().toString(),
      items: cart.map((i) => ({
        code: i.product.code,
        name: i.product.name,
        price: i.product.sellPrice,
        quantity: i.quantity,
      })),
      subtotal,
      discount,
      extraDiscount,
      gstRate,
      gstAmount,
      grandTotal,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastReceipt", JSON.stringify(receiptData));
    navigate("/receipt");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
      {/* Left: cart + code input */}
      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Point of Sale
            </h2>
            <p className="text-xs text-slate-500">
              Scan product code or search by name to add items to the bill.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearCart}
            className="text-xs rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            disabled={!cart.length}
          >
            Clear
          </button>
        </header>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700">
                Scan / enter product code
              </label>
              <div className="mt-1 flex rounded-md border border-slate-300 bg-white px-2 py-1.5">
                <input
                  autoFocus
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddByCode()}
                  placeholder="ELC-1001"
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddByCode}
                  className="ml-2 rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-400"
                >
                  Add
                </button>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Barcode scanner will type the code and hit Enter automatically.
              </p>
            </div>
          </div>

          {/* Cart table */}
          <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Item
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Qty
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cart.map((item) => {
                  const lineTotal = item.product.sellPrice * item.quantity;
                  return (
                    <tr key={item.product.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2">
                        <p className="text-sm text-slate-900">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.product.code}
                        </p>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <input
                          type="number"
                          min={0}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.product.id,
                              Number(e.target.value || 0)
                            )
                          }
                          className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-right text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-3 py-2 text-right text-sm text-slate-700">
                        ₹{item.product.sellPrice.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-right text-sm text-slate-900">
                        ₹{lineTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}

                {!cart.length && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-8 text-center text-sm text-slate-500"
                    >
                      No items in this bill. Scan or search a product to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Right: products & summary */}
      <section className="space-y-4">
        {/* Quick product picker */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700">
                Search products
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type LED, charger, board..."
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleAddProduct(p)}
                className="flex flex-col items-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs hover:border-emerald-400 hover:bg-emerald-50"
              >
                <span className="text-[11px] font-mono text-slate-500">
                  {p.code}
                </span>
                <span className="mt-0.5 text-sm text-slate-900">{p.name}</span>
                <span className="mt-1 text-xs font-medium text-emerald-700">
                  ₹{p.sellPrice.toFixed(2)}
                </span>
              </button>
            ))}

            {!filteredProducts.length && (
              <p className="col-span-full py-4 text-center text-xs text-slate-500">
                No products match this search.
              </p>
            )}
          </div>
        </div>

        {/* Summary card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Bill summary</h3>
          <div className="space-y-2 text-sm">
            <SummaryRow label="Subtotal" value={subtotal} />
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-600">Discount</span>
              <input
                type="number"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value || 0))}
                className="w-24 rounded-md border border-slate-300 bg-white px-2 py-1 text-right text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-600">Special discount</span>
              <input
                type="number"
                min={0}
                value={extraDiscount}
                onChange={(e) => setExtraDiscount(Number(e.target.value || 0))}
                className="w-24 rounded-md border border-slate-300 bg-white px-2 py-1 text-right text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <SummaryRow label="Taxable amount" value={taxableAmount} />
            <SummaryRow label={`GST (${gstRate}%)`} value={gstAmount} />
            <SummaryRow label="Grand total" value={grandTotal} highlight />
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={!cart.length}
            className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save & print
          </button>
          <p className="mt-1 text-[11px] text-slate-500">
            This will save the bill and open a printable receipt view.
          </p>
        </div>
      </section>
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: number;
  highlight?: boolean;
};

function SummaryRow({ label, value, highlight }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span
        className={
          highlight ? "font-semibold text-slate-900" : "text-slate-600"
        }
      >
        {label}
      </span>
      <span
        className={
          highlight ? "font-semibold text-emerald-700" : "text-slate-800"
        }
      >
        ₹{value.toFixed(2)}
      </span>
    </div>
  );
}

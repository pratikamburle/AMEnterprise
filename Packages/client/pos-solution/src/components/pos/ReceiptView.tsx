// src/pages/pos/ReceiptView.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ReceiptItem = {
  code: string;
  name: string;
  price: number;
  quantity: number;
};

type ReceiptData = {
  id: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  extraDiscount: number;
  gstRate: number;
  gstAmount: number;
  grandTotal: number;
  createdAt: string;
};

export function ReceiptView() {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("lastReceipt");
    if (!raw) return;
    try {
      setReceipt(JSON.parse(raw));
    } catch {
      setReceipt(null);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!receipt) {
    return (
      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-slate-600">
          No recent bill found. Create a bill from the POS screen first.
        </p>
        <button
          onClick={() => navigate("/pos")}
          className="mt-4 inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
        >
          Go to POS
        </button>
      </div>
    );
  }

  const invoiceDate = new Date(receipt.createdAt);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:w-80 print:rounded-none print:border-0 print:shadow-none">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-base font-semibold text-slate-900">
            AMEnterprise
          </h1>
          <p className="text-[11px] text-slate-500">
            Import & retail of electric products
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Invoice #{receipt.id.slice(-6)} · {invoiceDate.toLocaleString()}
          </p>
        </div>

        <div className="my-3 border-t border-dashed border-slate-300" />

        {/* Items */}
        <table className="w-full text-xs">
          <thead>
            <tr className="text-slate-500">
              <th className="py-1 text-left font-medium">Item</th>
              <th className="py-1 text-right font-medium">Qty</th>
              <th className="py-1 text-right font-medium">Rate</th>
              <th className="py-1 text-right font-medium">Amt</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item, idx) => {
              const lineTotal = item.price * item.quantity;
              return (
                <tr key={idx} className="align-top">
                  <td className="py-1 pr-2">
                    <p className="text-[11px] text-slate-800">{item.name}</p>
                    <p className="text-[10px] text-slate-500">{item.code}</p>
                  </td>
                  <td className="py-1 text-right text-[11px] text-slate-800">
                    {item.quantity}
                  </td>
                  <td className="py-1 text-right text-[11px] text-slate-800">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="py-1 text-right text-[11px] text-slate-800">
                    ₹{lineTotal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="my-3 border-t border-dashed border-slate-300" />

        {/* Totals */}
        <div className="space-y-1 text-xs">
          <Row label="Subtotal" value={receipt.subtotal} />
          {receipt.discount > 0 && (
            <Row label="Discount" value={-receipt.discount} />
          )}
          {receipt.extraDiscount > 0 && (
            <Row label="Special discount" value={-receipt.extraDiscount} />
          )}
          <Row
            label={`Taxable amount`}
            value={receipt.subtotal - receipt.discount - receipt.extraDiscount}
          />
          <Row label={`GST (${receipt.gstRate}%)`} value={receipt.gstAmount} />
          <Row label="Grand total" value={receipt.grandTotal} strong />
        </div>

        <div className="my-3 border-t border-dashed border-slate-300" />

        {/* Footer */}
        <div className="space-y-1 text-center">
          <p className="text-[11px] text-slate-500">
            Thank you for your business!
          </p>
          <p className="text-[10px] text-slate-400">
            This is a computer generated invoice.
          </p>
        </div>

        {/* Actions (hidden on print) */}
        <div className="mt-4 flex items-center justify-between print:hidden">
          <button
            onClick={() => navigate("/pos")}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to POS
          </button>
          <button
            onClick={handlePrint}
            className="rounded-md bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
          >
            Print receipt
          </button>
        </div>
      </div>
    </div>
  );
}

type RowProps = {
  label: string;
  value: number;
  strong?: boolean;
};

function Row({ label, value, strong }: RowProps) {
  const isNegative = value < 0;
  const displayValue = `₹${Math.abs(value).toFixed(2)}`;

  return (
    <div className="flex items-center justify-between">
      <span
        className={strong ? "font-semibold text-slate-900" : "text-slate-600"}
      >
        {label}
      </span>
      <span
        className={[
          "tabular-nums",
          strong ? "font-semibold text-slate-900" : "text-slate-700",
          isNegative ? "text-rose-600" : "",
        ].join(" ")}
      >
        {isNegative ? "-" : ""}
        {displayValue}
      </span>
    </div>
  );
}

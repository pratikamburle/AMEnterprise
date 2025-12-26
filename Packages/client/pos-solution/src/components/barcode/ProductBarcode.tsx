import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BarcodeLabel } from "./BarcodeLabel";

type Product = {
  id: number;
  productName: string;
  companyName: string;
  mrp: number;
  code: string;
};
const mockProducts: Product[] = [
  {
    id: 1,
    code: "ELC-1001",
    companyName: "AM Enterprises",
    mrp: 251.8,
    productName: "LED Bulb 12W",
  },
  {
    id: 2,
    code: "ELC-2002",
    companyName: "AM Enterprises",
    mrp: 45.29,
    productName: "Extension Board 4 Socket",
  },
  {
    id: 3,
    code: "ELC-3003",
    companyName: "AM Enterprises",
    mrp: 35.11,
    productName: "USB Charger 2.4A",
  },
];
export function ProductBarcode() {
  // store refs for each product's hidden print element
  const labelRefs = useRef<Record<number, HTMLDivElement | null>>({});
  // the currently selected element to print
  const selectedRef = useRef<HTMLDivElement | null>(null);

  // single print handler that prints whatever selectedRef.current points to
  const handlePrint = useReactToPrint({
    contentRef: selectedRef,
    documentTitle: `Barcode`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Product barcodes
          </h2>
          <p className="text-xs text-slate-500">
            Print individual barcode labels for each product using your barcode
            printer.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((p) => {
          return (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {/* Hidden from normal layout, visible for printing only */}
              <div
                ref={(el) => {
                  labelRefs.current[p.id] = el;
                }}
                className="print:block hidden"
              >
                <BarcodeLabel
                  code={p.code}
                  comapnyname={p.companyName}
                  mrp={p.mrp}
                  productName={p.productName}
                />
              </div>

              {/* On-screen preview */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium text-slate-700">
                  {p.productName}
                </p>
                <p className="text-[11px] font-mono text-slate-500">{p.code}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  selectedRef.current = labelRefs.current[p.id] ?? null;
                  handlePrint();
                }}
                className="mt-auto inline-flex items-center justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                Print barcode
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

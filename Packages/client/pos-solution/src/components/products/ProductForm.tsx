// src/ui/ProductForm.tsx
import { useState, type FormEvent } from "react";

export type ProductFormValues = {
  code: string;
  name: string;
  purchasePrice: number;
  landedCost: number;
  sellPrice: number;
  gstRate: number;
  openingStock: number;
  reorderLevel: number;
};

type ProductFormProps = {
  mode: "create" | "edit";
  defaultValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  onCancel: () => void;
};

export function ProductForm({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(
    defaultValues ?? {
      code: "",
      name: "",
      purchasePrice: 0,
      landedCost: 0,
      sellPrice: 0,
      gstRate: 18,
      openingStock: 0,
      reorderLevel: 10,
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "name" || name === "code" ? value : Number(value || 0),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const marginPerUnit = values.sellPrice - values.landedCost;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      {/* Identification */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-700">
            Product code
          </label>
          <input
            name="code"
            value={values.code}
            onChange={handleChange}
            placeholder="E.g. ELC-1001"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Also used as barcode value on labels.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-700">
            Name / description
          </label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="LED Bulb 12W warm white"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Purchase price (ex‑India)
          </label>
          <input
            type="number"
            step="0.01"
            name="purchasePrice"
            value={values.purchasePrice}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Price from China supplier.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700">
            Landed cost / unit
          </label>
          <input
            type="number"
            step="0.01"
            name="landedCost"
            value={values.landedCost}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Includes freight, customs, etc.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700">
            Selling price (incl. GST)
          </label>
          <input
            type="number"
            step="0.01"
            name="sellPrice"
            value={values.sellPrice}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700">
            GST rate (%)
          </label>
          <select
            name="gstRate"
            value={values.gstRate}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value={0}>0%</option>
            <option value={5}>5%</option>
            <option value={12}>12%</option>
            <option value={18}>18%</option>
            <option value={28}>28%</option>
          </select>
        </div>
      </div>

      {/* Stock */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Opening stock
          </label>
          <input
            type="number"
            name="openingStock"
            value={values.openingStock}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Reorder level
          </label>
          <input
            type="number"
            name="reorderLevel"
            value={values.reorderLevel}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
          <p className="font-medium text-slate-900">Per‑unit margin</p>
          <p className="mt-1 text-sm text-emerald-700">
            ₹{marginPerUnit.toFixed(2)}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Calculated as selling price minus landed cost.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-[11px] text-slate-500">
          {mode === "create"
            ? "You can adjust prices later if import costs change."
            : "Updating a product will not change past invoices."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Saving..."
              : mode === "create"
              ? "Save product"
              : "Update product"}
          </button>
        </div>
      </div>
    </form>
  );
}

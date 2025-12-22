import { useNavigate, useParams } from "react-router-dom";
import { ProductForm, type ProductFormValues } from "./ProductForm";

export function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const handleSubmit = async (values: ProductFormValues) => {
    // TODO: call .NET Core API (POST/PUT)
    console.log("Submit product", { isEdit, values });
    navigate("/products");
  };

  const handleCancel = () => navigate("/products");

  // TODO: when editing, fetch existing product and pass as defaultValues
  const defaultValues: ProductFormValues | undefined = isEdit
    ? {
        code: "ELC-1001",
        name: "LED Bulb 12W",
        purchasePrice: 45,
        landedCost: 55,
        sellPrice: 80,
        gstRate: 18,
        openingStock: 120,
        reorderLevel: 20,
      }
    : undefined;

  return (
    <div className="max-w-3xl">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-50">
          {isEdit ? "Edit product" : "Add new product"}
        </h2>
        <p className="text-xs text-slate-400">
          Store landed cost from China and selling price with GST.
        </p>
      </div>

      <ProductForm
        mode={isEdit ? "edit" : "create"}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

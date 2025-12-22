// import "./App.css";
import "./root.css";
import { AppLayout } from "./components/layouts/AppLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProductListPage } from "./components/products/ProductListPage";
import { ProductFormPage } from "./components/products/ProductFormPage";
import { PosPage } from "./components/pos/PosPage";
import { ReceiptView } from "./components/pos/ReceiptView";
import { DailySalesReportPage } from "./components/reports/DailySalesReportPage";
import { StockReportPage } from "./components/reports/StockReportPage";

function App() {
  return (
    <BrowserRouter basename="/AMEnterprise/">
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id/edit" element={<ProductFormPage />} />
          <Route path="/pos" element={<PosPage />} />
          <Route path="/receipt" element={<ReceiptView />} />
          <Route path="/reports/daily" element={<DailySalesReportPage />} />
          <Route path="/reports/stock" element={<StockReportPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;

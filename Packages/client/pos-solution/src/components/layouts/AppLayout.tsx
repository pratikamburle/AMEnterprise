// src/layouts/AppLayout.tsx
import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

type AppLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/products", label: "Products" },
  { to: "/products/barcode", label: "Product Barcode" },
  { to: "/pos", label: "Sales" },
  { to: "/reports/daily", label: "Reports" },
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-200">
          <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center">
            <span className="text-emerald-600 font-semibold">AM</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              AM Enterprise
            </p>
            <p className="text-xs text-slate-500">Import &amp; retail</p>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white/80 backdrop-blur">
          <h1 className="text-sm font-medium text-slate-800">POS Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Logged in as <span className="text-slate-800">Owner</span>
            </span>
            <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-4 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}

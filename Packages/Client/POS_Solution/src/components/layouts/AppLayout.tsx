import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type AppLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/products", label: "Products" },
  { to: "/pos", label: "POS" },
  { to: "/reports", label: "Reports" },
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-800">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 font-semibold">AM</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">
              AM Enterprise
            </p>
            <p className="text-xs text-slate-400">Import & Retail</p>
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
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-slate-300 hover:bg-slate-800 hover:text-slate-50",
                ].join(" ")
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/60 backdrop-blur">
          <h1 className="text-sm font-medium text-slate-200">POS Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Logged in as <span className="text-slate-200">Owner</span>
            </span>
            <button className="inline-flex items-center rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800">
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-4 bg-linear-to-b from-slate-950 via-slate-950 to-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}

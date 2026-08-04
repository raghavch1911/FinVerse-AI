import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <main className="ml-72 flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>

    </div>
  );
}
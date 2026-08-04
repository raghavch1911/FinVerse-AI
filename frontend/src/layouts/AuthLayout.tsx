import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        {/* Left Glow */}

        <div className="absolute -left-40 top-0 h-[700px] w-[700px] rounded-full bg-indigo-600/15 blur-[180px]" />

        {/* Right Glow */}

        <div className="absolute -right-40 bottom-0 h-[700px] w-[700px] rounded-full bg-cyan-500/15 blur-[180px]" />

        {/* Center Glow */}

        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[220px]" />

        {/* Noise Overlay */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_55%)]" />

      </div>

      {/* Content */}

      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <Outlet />
      </div>

    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import {
  LayoutDashboard,
  LineChart,
  ArrowLeftRight,
  PiggyBank,
  FileText,
  Bot,
  Landmark,
  UserCircle,
  Settings,
  LogOut,
  ChevronUp,
  FileBarChart2,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileBarChart2,
  },
  {
    name: "Insights",
    path: "/insights",
    icon: LineChart,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Budgets",
    path: "/budgets",
    icon: PiggyBank,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    name: "AI Assistant",
    path: "/assistant",
    icon: Bot,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  const [openProfile, setOpenProfile] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}

      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">

        <div className="rounded-xl bg-indigo-600 p-3">

          <Landmark size={24} />

        </div>

        <div>

          <h1 className="text-xl font-bold">
            FinVerse AI
          </h1>

          <p className="text-xs text-slate-400">
            Financial Operating System
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-4 py-6">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon size={20} />

              <span>{item.name}</span>

            </NavLink>
          );

        })}

      </nav>

      {/* Profile */}

      <div
        ref={profileRef}
        className="relative border-t border-slate-800 p-4"
      >

        <button
          onClick={() =>
            setOpenProfile(!openProfile)
          }
          className="flex w-full items-center justify-between rounded-xl p-3 transition hover:bg-slate-800"
        >

          <div className="flex items-center gap-3">

            <UserCircle
              size={42}
              className="text-slate-300"
            />

            <div className="text-left">

              <p className="font-semibold uppercase text-white">
                {user?.username}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email}
              </p>

            </div>

          </div>

          <ChevronUp
            size={18}
            className={`transition ${
              openProfile
                ? "rotate-180"
                : ""
            }`}
          />

        </button>

        {openProfile && (

          <div className="absolute bottom-24 left-4 right-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">

            <Link
              to="/settings"
              onClick={() =>
                setOpenProfile(false)
              }
              className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-700"
            >

              <Settings size={18} />

              Settings

            </Link>

            <button
              onClick={() => {
                setOpenProfile(false);
                logout();
              }}
              className="flex w-full items-center gap-3 px-5 py-4 text-red-400 transition hover:bg-red-500/10"
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        )}

      </div>

    </aside>
  );
}
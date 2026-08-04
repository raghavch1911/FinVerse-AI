import {
  Bell,
  Moon,
  LogOut,
  Shield,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

import AccountCard from "../components/settings/AccountCard";
import PasswordCard from "../components/settings/PasswordCard";
import ProfileCard from "../components/settings/ProfileCard";

export default function Settings() {
  const { logout } = useAuth();

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account, financial profile and
          application preferences.
        </p>
      </div>

      {/* Account */}

      <AccountCard />

      {/* Password */}

      <PasswordCard />

      {/* Financial Profile */}

      <ProfileCard />

      {/* Preferences */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Preferences
        </h2>

        <div className="space-y-8">

          {/* Appearance */}

          <div className="flex gap-5">

            <div className="rounded-xl bg-indigo-600/20 p-3 h-fit">
              <Moon
                className="text-indigo-400"
                size={22}
              />
            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                Appearance
              </h3>

              <p className="mt-2 text-slate-300">
                Theme:
                <span className="font-semibold text-indigo-400">
                  {" "}Dark Theme
                </span>
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                FinVerse AI is designed with a modern dark
                interface that improves readability,
                minimizes eye strain during extended use,
                and provides a consistent professional
                experience.
              </p>

            </div>

          </div>

          <hr className="border-slate-800" />

          {/* Budget Alerts */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <Bell
                className="text-yellow-400"
                size={22}
              />

              <div>

                <h3 className="font-semibold text-white">
                  Budget Alerts
                </h3>

                <p className="text-sm text-slate-400">
                  Notify me whenever a budget exceeds its
                  configured limit.
                </p>

              </div>

            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-indigo-600"
            />

          </div>

          <hr className="border-slate-800" />

          {/* AI Insights */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <Shield
                className="text-cyan-400"
                size={22}
              />

              <div>

                <h3 className="font-semibold text-white">
                  AI Financial Insights
                </h3>

                <p className="text-sm text-slate-400">
                  Allow FinVerse AI to generate
                  personalized financial recommendations
                  based on your spending and budgeting
                  patterns.
                </p>

              </div>

            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-indigo-600"
            />

          </div>

        </div>

      </div>

      {/* About */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          About FinVerse AI
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">
              Application
            </span>

            <span className="font-semibold text-white">
              FinVerse AI
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">
              Version
            </span>

            <span className="font-semibold text-white">
              v1.0.0
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">
              Frontend
            </span>

            <span className="font-semibold text-white">
              React + TypeScript
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">
              Backend
            </span>

            <span className="font-semibold text-white">
              FastAPI
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">
              AI Engine
            </span>

            <span className="font-semibold text-white">
              LangGraph + Gemini AI
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Database
            </span>

            <span className="font-semibold text-white">
              PostgreSQL + ChromaDB
            </span>
          </div>

        </div>

      </div>

      {/* Logout */}

      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

        <h2 className="mb-3 text-2xl font-bold text-white">
          Sign Out
        </h2>

        <p className="mb-6 text-slate-400">
          Sign out from your FinVerse AI account on this
          device.
        </p>

        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}
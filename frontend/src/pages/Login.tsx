import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="w-full flex items-center justify-center">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[160px]" />

      </div>

      {/* Card */}

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/5 px-14 py-10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(79,70,229,0.25)]"
      >

        {/* Logo */}

        <div className="mb-10 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />

            <span>Home</span>

          </Link>

          <div className="rounded-xl bg-indigo-600 px-3 py-2 font-bold">
            FV
          </div>

        </div>

        <div className="text-center">

          <h1 className="text-4xl font-black tracking-tight">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-400">
            Sign in to continue to
            <span className="ml-2 font-semibold text-indigo-400">
              FinVerse AI
            </span>
          </p>

        </div>

        <form
  onSubmit={handleLogin}
  className="mx-auto mt-10 max-w-xl space-y-6"
>

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-slate-900/70 px-4 transition focus-within:border-indigo-500">

              <Mail
                size={18}
                className="text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full bg-transparent p-4 outline-none placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-slate-900/70 px-4 transition focus-within:border-indigo-500">

              <Lock
                size={18}
                className="text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full bg-transparent p-4 outline-none placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-slate-400 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Login Button */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            disabled={loading}
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-4 font-semibold text-white shadow-lg transition hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>

        </form>

        {/* Divider */}

        <div className="mx-auto my-10 flex max-w-xl items-center gap-4">

          <div className="h-px flex-1 bg-white/10" />

          <span className="text-xs uppercase tracking-widest text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        {/* Register */}

        <p className="mx-auto max-w-xl text-center text-slate-400">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            Create Account
          </Link>

        </p>

        {/* Footer */}

        <div className="mx-auto mt-10 max-w-xl border-t border-white/10 pt-6 text-center text-xs text-slate-500">

          © {new Date().getFullYear()} FinVerse AI

        </div>

      </motion.div>

    </div>
  );
}
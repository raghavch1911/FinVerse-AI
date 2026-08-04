import "@fontsource/inter";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-[140px]" />

        <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      </div>

      {/* Navbar */}

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">

  <h1 className="text-3xl font-black tracking-tight">
    FinVerse AI
  </h1>

  <nav className="hidden gap-10 text-slate-300 md:flex">

    <a href="#features">Features</a>

    <a href="#dashboard">Dashboard</a>

    <a href="#assistant">AI</a>

    <a href="#contact">Contact</a>

  </nav>

  <div className="flex gap-4">

    <Link
      to="/login"
      className="rounded-xl border border-white/10 px-5 py-2 transition hover:border-indigo-500"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="rounded-xl bg-indigo-600 px-5 py-2 transition hover:bg-indigo-700"
    >
      Get Started
    </Link>

  </div>

</div>

      </header>

      {/* Hero */}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-20 px-8 pt-40 pb-20">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="max-w-3xl"
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-indigo-300">

            <Sparkles size={18} />

            AI Powered Personal Finance

          </div>

          <h2 className="text-7xl font-black leading-[1.05] tracking-tight">

            Manage Money

            <span className="block text-indigo-400">

              Smarter.

            </span>

            <span className="block">

              Faster.

            </span>

          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-400">

            FinVerse AI combines budgeting, investments,
            intelligent document analysis and conversational AI
            into one powerful financial operating system.

          </p>

          <div className="mt-12 flex gap-6">

            <Link
              to="/register"
              className="flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-semibold transition hover:bg-indigo-700"
            >
              Start Free

              <ArrowRight size={20} />

            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/10 px-8 py-4 text-lg transition hover:border-indigo-500"
            >
              Live Demo
            </Link>

          </div>

        </motion.div>

        {/* Right */}

        <HeroDashboard />

      </div>

    </section>
  );
}
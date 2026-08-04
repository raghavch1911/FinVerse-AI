import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-32">
      <div className="mx-auto max-w-5xl px-8">
        <div className="rounded-[40px] border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-slate-900 to-cyan-600/20 p-14 text-center backdrop-blur-xl">

          <h2 className="text-5xl font-black">
            Ready to Take Control
            <span className="block text-indigo-400">
              of Your Finances?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Join FinVerse AI and experience intelligent budgeting,
            investment insights, AI-powered document analysis, and a
            personal financial assistant—all in one place.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">

            <Link
              to="/register"
              className="flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/10 px-8 py-4 text-lg hover:border-indigo-500 transition"
            >
              Login
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
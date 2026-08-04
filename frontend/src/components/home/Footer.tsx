export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-slate-950"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 py-12 md:flex-row">

        {/* Left */}

        <div>
          <h2 className="text-2xl font-black">
            FinVerse AI
          </h2>

          <p className="mt-3 max-w-md text-slate-400">
            Intelligent Financial Operating System powered by AI,
            helping users budget smarter, invest confidently,
            and understand their finances effortlessly.
          </p>
        </div>

        {/* Right */}

        <div className="flex gap-4">

          <a
            href="#"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:border-indigo-500 transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:border-indigo-500 transition"
          >
            Website
          </a>

          <a
            href="#"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:border-indigo-500 transition"
          >
            Email
          </a>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} FinVerse AI. All rights reserved.
      </div>
    </footer>
  );
}
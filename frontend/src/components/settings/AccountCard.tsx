import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import authService from "../../services/authService";

export default function AccountCard() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const user =
        await authService.getCurrentUser();

      setUsername(user.username);
      setEmail(user.email);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveUser() {
    try {
      setSaving(true);

      await authService.updateCurrentUser({
        username,
        email,
      });

      toast.success(
        "Account updated successfully."
      );
    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to update account."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-white">
        Loading account...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Account
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Username
          </label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Email
          </label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

      </div>

      <button
        onClick={saveUser}
        disabled={saving}
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500"
      >
        {saving
          ? "Saving..."
          : "Save Account"}
      </button>

    </div>
  );
}
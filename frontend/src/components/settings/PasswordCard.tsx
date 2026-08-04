import { useState } from "react";
import toast from "react-hot-toast";

import authService from "../../services/authService";

export default function PasswordCard() {
  const [saving, setSaving] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  async function updatePassword() {
    if (newPassword !== confirmPassword) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    try {
      setSaving(true);

      await authService.changePassword({
        current_password:
          currentPassword,
        new_password: newPassword,
      });

      toast.success(
        "Password updated successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to change password."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Change Password
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

      </div>

      <button
        onClick={updatePassword}
        disabled={saving}
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500"
      >
        {saving
          ? "Updating..."
          : "Update Password"}
      </button>

    </div>
  );
}
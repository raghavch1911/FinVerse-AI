import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import profileService from "../../services/profileService";

import type {
  Profile,
  ProfileRequest,
} from "../../types/profile";

export default function ProfileCard() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState<ProfileRequest>({
      phone: "",
      date_of_birth: "",
      currency: "INR",
      monthly_income: 0,
      financial_goal: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data =
        await profileService.getProfile();

      setProfile(data);

      setForm({
        phone: data.phone ?? "",
        date_of_birth:
          data.date_of_birth ?? "",
        currency: data.currency,
        monthly_income:
          data.monthly_income,
        financial_goal:
          data.financial_goal ?? "",
      });
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    key: keyof ProfileRequest,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      if (profile) {
        await profileService.updateProfile(
          form
        );
      } else {
        await profileService.createProfile(
          form
        );
      }

      toast.success(
        "Profile saved successfully."
      );

      loadProfile();
    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to save profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Profile
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Phone
          </label>

          <input
            value={form.phone}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Date of Birth
          </label>

          <input
            type="date"
            value={
              form.date_of_birth ?? ""
            }
            onChange={(e) =>
              updateField(
                "date_of_birth",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Currency
          </label>

          <select
            value={form.currency}
            onChange={(e) =>
              updateField(
                "currency",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="INR">
              INR
            </option>

            <option value="USD">
              USD
            </option>

            <option value="EUR">
              EUR
            </option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Monthly Income
          </label>

          <input
            type="number"
            value={
              form.monthly_income
            }
            onChange={(e) =>
              updateField(
                "monthly_income",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm text-slate-400">
          Financial Goal
        </label>

        <textarea
          rows={4}
          value={
            form.financial_goal
          }
          onChange={(e) =>
            updateField(
              "financial_goal",
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </button>

    </div>
  );
}
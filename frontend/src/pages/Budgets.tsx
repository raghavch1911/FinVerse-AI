import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  PiggyBank,
  AlertTriangle,
  Wallet,
  Plus,
} from "lucide-react";

import budgetService from "../services/budgetService";
import categoryService from "../services/categoryService";

import type {
  Budget,
  BudgetListResponse,
} from "../types/budget";

import type { Category } from "../types/category";

import BudgetCard from "../components/finance/BudgetCard";
import AddBudgetModal from "../components/finance/AddBudgetModal";
import EditBudgetModal from "../components/finance/EditBudgetModal";
import DeleteBudgetModal from "../components/finance/DeleteBudgetModal";

export default function Budgets() {
  const [data, setData] =
    useState<BudgetListResponse | null>(null);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [selectedBudget, setSelectedBudget] =
    useState<Budget | null>(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const loadBudgets = useCallback(async () => {
    try {
      setLoading(true);

      const response =
        await budgetService.getBudgets(page);

      setData(response);
    } catch (err) {
      console.error(err);
      setError("Unable to load budgets.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  async function loadCategories() {
    try {
      const response =
        await categoryService.getCategories();

      setCategories(
        response.filter(
          (c) => c.type === "EXPENSE"
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadBudgets();
    loadCategories();
  }, [loadBudgets]);

  const summary = useMemo(() => {
    if (!data) {
      return {
        totalBudget: 0,
        remaining: 0,
        active: 0,
        overspent: 0,
      };
    }

    return {
      totalBudget: data.items.reduce(
        (sum, b) => sum + b.amount,
        0
      ),

      remaining: data.items.reduce(
        (sum, b) => sum + b.remaining,
        0
      ),

      active: data.items.filter(
        (b) => b.is_active
      ).length,

      overspent: data.items.filter(
        (b) => b.status === "OVER_BUDGET"
      ).length,
    };
  }, [data]);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading budgets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  if (!data) return null;
    return (
    <div className="space-y-8 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Budgets
          </h1>

          <p className="text-slate-400">
            Track and manage your monthly budgets
          </p>

        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />

          Add Budget
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <Wallet
            size={30}
            className="mb-4 text-indigo-400"
          />

          <p className="text-slate-400">
            Total Budget
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹
            {summary.totalBudget.toLocaleString(
              "en-IN"
            )}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <PiggyBank
            size={30}
            className="mb-4 text-green-400"
          />

          <p className="text-slate-400">
            Active Budgets
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {summary.active}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <AlertTriangle
            size={30}
            className="mb-4 text-red-400"
          />

          <p className="text-slate-400">
            Overspent
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {summary.overspent}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <Wallet
            size={30}
            className="mb-4 text-cyan-400"
          />

          <p className="text-slate-400">
            Remaining
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹
            {summary.remaining.toLocaleString(
              "en-IN"
            )}
          </h2>

        </div>

      </div>

      {/* Budget Cards */}

      {data.items.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 py-24 text-center">

          <PiggyBank
            size={60}
            className="mx-auto mb-6 text-slate-500"
          />

          <h2 className="text-2xl font-semibold text-white">
            No Budgets Found
          </h2>

          <p className="mt-3 text-slate-400">
            Create your first monthly budget to start
            tracking expenses.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 lg:grid-cols-2">

          {data.items.map((budget) => (

            <BudgetCard
              key={budget.id}
              budget={budget}
              categories={categories}
              onEdit={(budget) => {
                setSelectedBudget(budget);
                setShowEditModal(true);
              }}
              onDelete={(budget) => {
                setSelectedBudget(budget);
                setShowDeleteModal(true);
              }}
            />

          ))}

        </div>

      )}

      {/* Pagination */}

      {data.total_pages > 1 && (

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4">

          <button
            disabled={!data.has_previous}
            onClick={() =>
              setPage((p) => p - 1)
            }
            className="rounded-xl bg-slate-800 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-slate-300">
            Page {data.page} of {data.total_pages}
          </span>

          <button
            disabled={!data.has_next}
            onClick={() =>
              setPage((p) => p + 1)
            }
            className="rounded-xl bg-slate-800 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>

      )}
            <AddBudgetModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadBudgets}
      />

      <EditBudgetModal
        open={showEditModal}
        budget={selectedBudget}
        onClose={() => {
          setSelectedBudget(null);
          setShowEditModal(false);
        }}
        onSuccess={loadBudgets}
      />

      <DeleteBudgetModal
        open={showDeleteModal}
        budget={selectedBudget}
        onClose={() => {
          setSelectedBudget(null);
          setShowDeleteModal(false);
        }}
        onSuccess={loadBudgets}
      />
            </div>
    );
}
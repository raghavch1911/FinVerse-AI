import { Search, RotateCcw } from "lucide-react";

import type { Category } from "../../types/category";
import type { TransactionFilters } from "../../types/transaction";

interface Props {
  filters: TransactionFilters;
  categories: Category[];
  onDraftChange: (filters: TransactionFilters) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function TransactionFilters({
  filters,
  categories,
  onDraftChange,
  onApply,
  onClear,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {/* Search */}

        <div className="lg:col-span-3">

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={filters.search ?? ""}
              placeholder="Search title or description..."
              onChange={(e) =>
                onDraftChange({
                  ...filters,
                  search: e.target.value,
                  page: 1,
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none transition focus:border-indigo-500"
            />

          </div>

        </div>

        {/* Type */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Transaction Type
          </label>

          <select
            value={filters.transaction_type ?? ""}
            onChange={(e) =>
              onDraftChange({
                ...filters,
                transaction_type:
                  e.target.value === ""
                    ? undefined
                    : (e.target.value as
                        | "INCOME"
                        | "EXPENSE"),
                page: 1,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          >
            <option value="">
              All Types
            </option>

            <option value="INCOME">
              Income
            </option>

            <option value="EXPENSE">
              Expense
            </option>

          </select>

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </label>

          <select
            value={filters.category ?? ""}
            onChange={(e) =>
              onDraftChange({
                ...filters,
                category:
                  e.target.value || undefined,
                page: 1,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}

          </select>

        </div>

        {/* Start Date */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Start Date
          </label>

          <input
            type="date"
            value={filters.start_date ?? ""}
            onChange={(e) =>
              onDraftChange({
                ...filters,
                start_date:
                  e.target.value || undefined,
                page: 1,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

        </div>

        {/* End Date */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            End Date
          </label>

          <input
            type="date"
            value={filters.end_date ?? ""}
            onChange={(e) =>
              onDraftChange({
                ...filters,
                end_date:
                  e.target.value || undefined,
                page: 1,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

        </div>

        {/* Min Amount */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Min Amount
          </label>

          <input
            type="number"
            value={filters.min_amount ?? ""}
            placeholder="0"
            onChange={(e) =>
              onDraftChange({
                ...filters,
                min_amount:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
                page: 1,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

        </div>

        {/* Max Amount */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Max Amount
          </label>

          <input
            type="number"
            value={filters.max_amount ?? ""}
            placeholder="10000"
            onChange={(e) =>
              onDraftChange({
                ...filters,
                max_amount:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
                page: 1,
              })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

        </div>

      </div>

      <div className="mt-6 flex justify-end gap-3">

  <button
    onClick={onClear}
    className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
  >
    <RotateCcw size={18} />
    Clear Filters
  </button>

  <button
    onClick={onApply}
    className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
  >
    Apply Filters
  </button>

</div>

    </div>
  );
}
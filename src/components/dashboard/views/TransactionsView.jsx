import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TRANSACTIONS, CATEGORIES } from "@/lib/finance-data";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Filters } from "@/components/dashboard/Filters";

export function TransactionsView() {
  const [range, setRange] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    if (range === "7d") cutoff.setDate(now.getDate() - 7);
    else if (range === "30d") cutoff.setDate(now.getDate() - 30);
    else if (range === "90d") cutoff.setDate(now.getDate() - 90);
    else cutoff.setFullYear(2000);

    const q = query.trim().toLowerCase();
    return TRANSACTIONS.filter((t) => {
      const d = new Date(t.date);
      if (d < cutoff) return false;
      if (category !== "all" && t.category !== category) return false;
      if (q && !t.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [range, category, query]);

  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expenses = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    return { income, expenses, count: filtered.length };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Entries</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{totals.count}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Inflow</p>
          <p className="mt-2 text-2xl font-semibold text-success">+${totals.income.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Outflow</p>
          <p className="mt-2 text-2xl font-semibold text-danger">-${totals.expenses.toLocaleString()}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name..."
              className="h-10 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Filters range={range} category={category} onRangeChange={setRange} onCategoryChange={setCategory} />
        </div>
        <TransactionsTable transactions={filtered} />
      </section>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {TRANSACTIONS.length} transactions across {CATEGORIES.length} categories.
      </p>
    </div>
  );
}

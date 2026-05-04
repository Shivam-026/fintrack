import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Wallet, TrendingDown, PiggyBank, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { Filters } from "@/components/dashboard/Filters";
import { TransactionsTable, TransactionsTableSkeleton } from "@/components/dashboard/TransactionsTable";
import { TRANSACTIONS } from "@/lib/finance-data";
import { ProfileProvider, useProfile } from "@/lib/profile-context";
import { TransactionsView } from "@/components/dashboard/views/TransactionsView";
import { AnalyticsView } from "@/components/dashboard/views/AnalyticsView";
import { SettingsView } from "@/components/dashboard/views/SettingsView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinTrack — Personal Finance Dashboard" },
      { name: "description", content: "Track balance, expenses, savings and income with a beautiful, premium finance dashboard." },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProfileProvider>
      <Dashboard />
    </ProfileProvider>
  );
}

function Dashboard() {
  const [theme, setTheme] = useState("dark");
  const { view } = useProfile();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div key={view} className="animate-fade-up mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {view === "dashboard" && <DashboardView />}
            {view === "transactions" && <TransactionsView />}
            {view === "analytics" && <AnalyticsView />}
            {view === "settings" && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  const [range, setRange] = useState("30d");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    if (range === "7d") cutoff.setDate(now.getDate() - 7);
    else if (range === "30d") cutoff.setDate(now.getDate() - 30);
    else if (range === "90d") cutoff.setDate(now.getDate() - 90);
    else cutoff.setFullYear(2000);

    return TRANSACTIONS.filter((t) => {
      const d = new Date(t.date);
      if (d < cutoff) return false;
      if (category !== "all" && t.category !== category) return false;
      return true;
    });
  }, [range, category]);

  const stats = useMemo(() => {
    const income = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expenses = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const balance = 24580 + income - expenses;
    const savings = Math.max(income - expenses, 0);
    return { income, expenses, balance, savings };
  }, [filtered]);

  const fmt = (n) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 w-full rounded-2xl" />)
        ) : (
          <>
            <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
              <StatCard label="Total Balance" value={fmt(stats.balance)} trend={12.4} icon={Wallet} accent="primary" />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
              <StatCard label="Total Expenses" value={fmt(stats.expenses)} trend={-5.2} icon={TrendingDown} accent="danger" />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <StatCard label="Total Savings" value={fmt(stats.savings)} trend={8.1} icon={PiggyBank} accent="success" />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
              <StatCard label="Monthly Income" value={fmt(stats.income)} trend={3.6} icon={TrendingUp} accent="warning" />
            </div>
          </>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {loading ? (
          <>
            <div className="skeleton h-80 rounded-2xl lg:col-span-2" />
            <div className="skeleton h-80 rounded-2xl" />
          </>
        ) : (
          <>
            <div className="animate-fade-up lg:col-span-2"><SpendingChart /></div>
            <div className="animate-fade-up min-w-0" style={{ animationDelay: "80ms" }}>
              <CategoryChart transactions={filtered} />
            </div>
          </>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">Recent Transactions</h3>
            <p className="text-xs text-muted-foreground">{filtered.length} matching {filtered.length === 1 ? "entry" : "entries"}</p>
          </div>
          <Filters range={range} category={category} onRangeChange={setRange} onCategoryChange={setCategory} />
        </div>

        {loading ? <TransactionsTableSkeleton /> : <TransactionsTable transactions={filtered} />}
      </section>
    </>
  );
}

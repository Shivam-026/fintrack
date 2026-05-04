import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TRANSACTIONS, MONTHLY_SPENDING } from "@/lib/finance-data";
import { CategoryChart } from "@/components/dashboard/CategoryChart";

export function AnalyticsView() {
  const stats = useMemo(() => {
    const income = TRANSACTIONS.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expenses = TRANSACTIONS.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const avgExpense = expenses / TRANSACTIONS.filter((t) => t.amount < 0).length;
    const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
    return { income, expenses, avgExpense, savingsRate };
  }, []);

  const netData = MONTHLY_SPENDING.map((m) => ({ month: m.month, net: m.income - m.expenses }));

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Lifetime Income", value: `$${stats.income.toLocaleString()}`, color: "text-success" },
          { label: "Lifetime Expenses", value: `$${stats.expenses.toLocaleString()}`, color: "text-danger" },
          { label: "Avg. Expense", value: `$${stats.avgExpense.toFixed(2)}`, color: "text-foreground" },
          { label: "Savings Rate", value: `${stats.savingsRate}%`, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6 lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-base font-semibold tracking-tight text-foreground">Net Cash Flow</h3>
            <p className="text-xs text-muted-foreground">Income minus expenses by month</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={netData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: "12px", fontSize: "12px", color: "var(--color-foreground)" }}
                  formatter={(v) => `$${v.toLocaleString()}`}
                  cursor={{ fill: "color-mix(in oklab, var(--color-muted) 60%, transparent)" }}
                />
                <Bar dataKey="net" fill="oklch(0.6 0.22 270)" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <CategoryChart transactions={TRANSACTIONS} />
      </section>
    </div>
  );
}

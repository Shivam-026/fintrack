import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MONTHLY_SPENDING } from "@/lib/finance-data";

export function SpendingChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">Monthly Overview</h3>
          <p className="text-xs text-muted-foreground">Income vs expenses, last 6 months</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" /> Income
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-danger" /> Expenses
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_SPENDING} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.6 0.22 270)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="oklch(0.6 0.22 270)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.65 0.22 25)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.65 0.22 25)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                color: "var(--color-foreground)",
                fontSize: "12px",
                boxShadow: "0 8px 24px -8px rgba(0,0,0,0.3)",
              }}
              formatter={(v) => `$${v.toLocaleString()}`}
            />
            <Area type="monotone" dataKey="income" stroke="oklch(0.6 0.22 270)" strokeWidth={2.5} fill="url(#incomeGrad)" animationDuration={800} />
            <Area type="monotone" dataKey="expenses" stroke="oklch(0.65 0.22 25)" strokeWidth={2.5} fill="url(#expGrad)" animationDuration={800} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

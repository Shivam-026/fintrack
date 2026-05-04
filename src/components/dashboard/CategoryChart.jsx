import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";

const COLORS = [
  "oklch(0.6 0.22 270)",
  "oklch(0.7 0.18 155)",
  "oklch(0.78 0.17 70)",
  "oklch(0.65 0.22 25)",
  "oklch(0.65 0.18 200)",
  "oklch(0.7 0.18 320)",
  "oklch(0.65 0.18 100)",
];

export function CategoryChart({ transactions }) {
  const data = useMemo(() => {
    const map = new Map();
    transactions
      .filter((t) => t.amount < 0)
      .forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + Math.abs(t.amount)));
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Spending by Category</h3>
        <p className="text-xs text-muted-foreground">Filtered totals</p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          No expense data
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-44 w-44 shrink-0 sm:h-48 sm:w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={56}
                  outerRadius={84}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  animationDuration={700}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "var(--color-foreground)",
                  }}
                  formatter={(v) => `$${v.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p>
              <p className="text-lg font-semibold text-foreground">${total.toLocaleString()}</p>
            </div>
          </div>

          <ul className="w-full min-w-0 space-y-2">
            {data.slice(0, 6).map((d, i) => {
              const pct = total ? Math.round((d.value / total) * 100) : 0;
              return (
                <li key={d.name} className="flex min-w-0 items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="min-w-0 flex-1 truncate text-foreground">{d.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">${d.value.toLocaleString()}</span>
                  <span className="w-9 shrink-0 text-right text-xs font-medium text-muted-foreground tabular-nums">{pct}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

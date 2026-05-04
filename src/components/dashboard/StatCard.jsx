import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const accentBg = {
  primary: "var(--gradient-primary)",
  success: "var(--gradient-success)",
  warning: "var(--gradient-warning)",
  danger: "linear-gradient(135deg, oklch(0.65 0.22 25), oklch(0.7 0.2 15))",
};

export function StatCard({ label, value, trend, icon: Icon, accent }) {
  const positive = trend >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{ background: accentBg[accent] }} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground shadow-md" style={{ background: accentBg[accent] }}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
            positive ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {positive ? "+" : ""}{trend}%
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}

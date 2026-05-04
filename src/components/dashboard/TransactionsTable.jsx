import { ShoppingBag, Utensils, Car, Briefcase, Receipt, Film, HeartPulse } from "lucide-react";

const CATEGORY_ICON = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Transport: Car,
  Salary: Briefcase,
  Bills: Receipt,
  Entertainment: Film,
  Health: HeartPulse,
};

const STATUS_STYLES = {
  completed: "bg-success/15 text-success",
  pending: "bg-warning/15 text-warning",
  failed: "bg-danger/15 text-danger",
};

function formatAmount(n) {
  const sign = n < 0 ? "-" : "+";
  return `${sign}$${Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
        <Receipt className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">No transactions found</p>
        <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              const Icon = CATEGORY_ICON[t.category];
              const positive = t.amount > 0;
              return (
                <tr key={t.id} className="group border-b border-border last:border-0 transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground/80 group-hover:bg-surface-elevated">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(t.date)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground/80">{t.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[t.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {t.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold tabular-nums ${positive ? "text-success" : "text-foreground"}`}>
                    {formatAmount(t.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TransactionsTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

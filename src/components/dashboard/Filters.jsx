import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/finance-data";

const RANGE_LABELS = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  all: "All time",
};

function Select({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 cursor-pointer appearance-none rounded-lg border border-border bg-surface pl-3 pr-8 text-sm text-foreground transition hover:bg-surface-elevated focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export function Filters({ range, category, onRangeChange, onCategoryChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={range}
        onChange={onRangeChange}
        options={Object.keys(RANGE_LABELS).map((k) => ({ value: k, label: RANGE_LABELS[k] }))}
      />
      <Select
        value={category}
        onChange={onCategoryChange}
        options={[
          { value: "all", label: "All categories" },
          ...CATEGORIES.map((c) => ({ value: c, label: c })),
        ]}
      />
    </div>
  );
}

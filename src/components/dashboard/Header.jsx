import { Bell, Search, Sun, Moon } from "lucide-react";
import { useProfile, getInitials } from "@/lib/profile-context";

const TITLES = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, here's your financial overview." },
  transactions: { title: "Transactions", subtitle: "Browse and search every transaction." },
  analytics: { title: "Analytics", subtitle: "Deep dive into your spending patterns." },
  settings: { title: "Settings", subtitle: "Manage your profile and preferences." },
};

export function Header({ theme, onToggleTheme }) {
  const { profile, view, setView } = useProfile();
  const { title, subtitle } = TITLES[view];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
          <p className="hidden text-xs text-muted-foreground sm:block">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="h-10 w-48 rounded-xl border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:w-64 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 md:w-64 md:focus:w-72"
            />
          </div>

          <button
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-background" />
          </button>

          <button
            onClick={() => setView("settings")}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pl-1.5 pr-3 transition hover:bg-surface-elevated"
            aria-label="Open profile settings"
          >
            <div
              className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg text-xs font-semibold text-primary-foreground"
              style={profile.avatar ? undefined : { background: "var(--gradient-primary)" }}
            >
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                getInitials(profile.name)
              )}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-medium leading-tight text-foreground">{profile.name}</p>
              <p className="text-[10px] leading-tight text-muted-foreground">{profile.plan}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

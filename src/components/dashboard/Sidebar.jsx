import { LayoutDashboard, ArrowLeftRight, BarChart3, Settings, Wallet, LogOut } from "lucide-react";
import { useProfile } from "@/lib/profile-context";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { view, setView } = useProfile();

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg" style={{ background: "var(--gradient-primary)" }}>
          <Wallet className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-white">FinTrack</h1>
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">Finance Suite</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 px-3">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">Menu</p>
        <ul className="flex flex-col gap-1">
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = view === id;
            return (
              <li key={id}>
                <button
                  onClick={() => setView(id)}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-sidebar-active text-white shadow-lg"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-x-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="m-3 rounded-2xl p-4" style={{ background: "var(--gradient-primary)" }}>
        <p className="text-xs font-medium text-primary-foreground/80">Upgrade to Pro</p>
        <p className="mt-1 text-sm font-semibold text-primary-foreground">Unlock advanced insights</p>
        <button className="mt-3 w-full rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-white/25">
          Upgrade
        </button>
      </div>

      <div className="border-t border-white/5 p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/70 transition hover:bg-sidebar-hover hover:text-white">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

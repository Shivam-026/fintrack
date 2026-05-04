import { Plus, MessageSquare, Sparkles, Settings } from "lucide-react";

export function Sidebar({ chats, activeId, onNewChat, onSelectChat }) {
  return (
    <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-sidebar border-r border-border">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <h1 className="text-base font-semibold tracking-tight text-sidebar-foreground">AI Assistant</h1>
      </div>

      <div className="px-3">
        <button
          onClick={onNewChat}
          className="group flex w-full items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 ease-in-out hover:bg-primary-hover hover:shadow-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          New Chat
        </button>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto scrollbar-thin px-3">
        <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Recent</p>
        <div className="flex flex-col gap-0.5">
          {chats.length === 0 && (
            <p className="px-2 py-3 text-xs text-muted-foreground">No conversations yet</p>
          )}
          {chats.map((chat) => {
            const active = chat.id === activeId;
            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-all duration-200 ease-in-out ${
                  active ? "bg-sidebar-active text-foreground" : "text-sidebar-foreground hover:bg-sidebar-hover"
                }`}
              >
                <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className="truncate">{chat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-sidebar-foreground transition-colors duration-200 hover:bg-sidebar-hover">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            U
          </div>
          <span className="flex-1 text-left">My Account</span>
          <Settings className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}

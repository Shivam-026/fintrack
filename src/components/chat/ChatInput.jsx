import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="sticky bottom-0 border-t border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="group relative flex items-end gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-lg transition-all duration-200 ease-in-out focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Message AI Assistant..."
            className="max-h-40 flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none scrollbar-thin"
          />
          <button
            onClick={submit}
            disabled={!canSend}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary-hover hover:shadow-md hover:shadow-primary/40 active:scale-95 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI can make mistakes. Consider checking important info.
        </p>
      </div>
    </div>
  );
}

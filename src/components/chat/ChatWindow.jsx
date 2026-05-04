import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { MessageBubble, TypingIndicator } from "./MessageBubble";

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a haiku about the ocean",
  "Plan a 3-day trip to Tokyo",
  "Debug a React useEffect loop",
];

export function ChatWindow({ messages, isTyping }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-7 w-7 text-primary-foreground" />
        </div>
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          How can I help you today?
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Ask anything, get intelligent responses
        </p>
        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {SUGGESTIONS.map((s) => (
            <div
              key={s}
              className="cursor-pointer rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-elevated hover:text-foreground hover:shadow-lg"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={endRef} />
      </div>
    </div>
  );
}

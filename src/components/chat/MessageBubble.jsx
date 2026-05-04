import { Sparkles, User } from "lucide-react";

export function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex w-full animate-message-in gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      <div
        className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-bubble ${
          isUser
            ? "bg-bubble-user text-bubble-user-foreground rounded-br-md"
            : "bg-bubble-ai text-bubble-ai-foreground rounded-bl-md"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex w-full animate-message-in justify-start gap-3">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-bubble-ai px-4 py-3.5 shadow-bubble">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
        <span className="ml-1 text-xs text-muted-foreground">AI is typing...</span>
      </div>
    </div>
  );
}

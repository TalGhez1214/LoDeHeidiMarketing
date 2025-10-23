"use client";

import "../styles/globals.css"; // make --noah-* variables available
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ExternalLink, FileText, ChevronDown, X, SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SummaryModal from "./SummaryModal";
import ArticlesModal, { ArticlesModalItem } from "./ArticlesModal";

/* ---------------- Types ---------------- */

type MessageKind = "text" | "summary" | "articles" | "info" | "actions" | "welcome";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  kind?: MessageKind;
  summaryPayload?: SummaryPayloadWithMeta;
  articlesPayload?: ArticlesModalItem[];
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type SummaryPayload = { title: string; summary: string };
type SummaryPayloadWithMeta = SummaryPayload & {
  imageUrl?: string | null;
  articleUrl?: string | null;
};

type UIItems = {
  type: "summary" | "articles" | "highlights" | string;
  data: any;
};

/* ---------------- Constants ---------------- */

const QUICK_ACTIONS = [
  "Summarize this page",
  "Highlight the most important phrase(s)",
  "Show where this article mentions ..",
  "Find related articles",
] as const;

/* ---------------- Utilities ---------------- */

function getCurrentArticleImage(): string | null {
  const tagged = document.querySelector<HTMLImageElement>('img[data-article-cover="true"]');
  if (tagged?.src) return tagged.src;

  const og = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content;
  if (og) return og;

  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
  const visible = imgs.filter((img) => {
    const rect = img.getBoundingClientRect();
    return rect.width >= 500 && rect.height >= 250 && !!img.src;
  });
  if (visible.length > 0) return visible[0].src;

  return null;
}

/* ---------------- Component ---------------- */

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      text: "Hi, how can I help today?",
      isUser: false,
      timestamp: new Date(),
      kind: "welcome",
    },
    {
      id: "assistant-actions-1",
      text: "",
      isUser: false,
      timestamp: new Date(),
      kind: "actions",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [summaryModal, setSummaryModal] = useState<SummaryPayloadWithMeta | null>(null);
  const [articlesModal, setArticlesModal] = useState<ArticlesModalItem[] | null>(null);

  // Streaming
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPageContext = () => {
    const url = window.location.href;
    const title = document.title;
    const selection = window.getSelection()?.toString() || "";
    let context = `Current page: ${url}\nPage title: ${title}`;
    if (selection) context += `\nSelected text: "${selection}"`;
    return context;
  };

  function handleUiItems(items: UIItems) {
    if (items.type === "summary") {
      const payload = Array.isArray(items.data) ? items.data[0] : items.data;
      if (!payload) return;

      const summaryPayload: SummaryPayloadWithMeta = {
        title: payload.title ?? "",
        summary: payload.summary ?? payload.answer ?? "",
        imageUrl: getCurrentArticleImage(),
        articleUrl: window.location.href,
      };

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 100).toString(),
          text: "",
          isUser: false,
          timestamp: new Date(),
          kind: "summary",
          summaryPayload,
        },
      ]);
      return;
    }

    if (items.type === "articles") {
      const rawList: any[] = Array.isArray(items.data) ? items.data : [];
      if (!rawList.length) return;

      const list = rawList.map((r) => ({
        title: r.title ?? "",
        author: (Array.isArray(r.author) ? r.author.join(", ") : r.author) ?? r.byline ?? "",
        url: r.url ?? r.link ?? "",
        summary: r.summary ?? r.excerpt ?? r.description ?? "",
        quote: r.quote ?? "",
        imageUrl: r.imageUrl ?? r.image ?? r.coverImage ?? null,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 200).toString(),
          text: "",
          isUser: false,
          timestamp: new Date(),
          kind: "articles",
          articlesPayload: list,
        },
      ]);
      return;
    }

    if (items.type === "highlights") {
      const spans = Array.isArray(items.data) ? items.data : [];
      try {
        window.dispatchEvent(
          new CustomEvent("noah:highlights-apply", {
            detail: { url: window.location.href, spans },
          })
        );
      } catch (e) {
        console.error("Failed to apply highlights:", e);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 301).toString(),
            text: "I couldn't apply highlights on this page.",
            isUser: false,
            timestamp: new Date(),
            kind: "info",
          },
        ]);
      }
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 400).toString(),
        text: "Received UI content.",
        isUser: false,
        timestamp: new Date(),
        kind: "info",
      },
    ]);
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      kind: "text",
    };

    // Remove welcome/actions after first user message
    setMessages((prev) => {
      const filtered = prev.filter((m) => m.kind !== "welcome" && m.kind !== "actions");
      return [...filtered, userMessage];
    });

    setInput("");
    setIsLoading(true);

    try {
      const contextualQuery = `${messageText}\n\nPage Context:\n${getPageContext()}`;
      const backendUrl =
        import.meta.env.VITE_API_BASE_URL?.toString() || "http://127.0.0.1:8000";

      const resp = await fetch(`${backendUrl}/ask_stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: contextualQuery,
          page_url: window.location.href,
        }),
      });
      if (!resp.ok || !resp.body) throw new Error("Streaming not supported");

      const msgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: msgId, text: "", isUser: false, timestamp: new Date(), kind: "text" },
      ]);
      setStreamingMsgId(msgId);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, idx).trim();
          buffer = buffer.slice(idx + 1);
          if (!line) continue;

          try {
            const evt = JSON.parse(line);
            if (evt.type === "token") {
              const chunk = String(evt.data || "");
              setMessages((prev) => {
                const copy = [...prev];
                const i = copy.findIndex((m) => m.id === msgId);
                if (i >= 0) copy[i] = { ...copy[i], text: copy[i].text + chunk };
                return copy;
              });
            } else if (evt.type === "ui_items") {
              handleUiItems(evt.data as UIItems);
            }
          } catch {
            // ignore malformed line
          }
        }
      }

      setStreamingMsgId(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setStreamingMsgId(null);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Something went wrong. Please try again.",
          isUser: false,
          timestamp: new Date(),
          kind: "text",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const chooseAction = (a: string) => {
    setInput("");
    sendMessage(a);
  };

  if (!isOpen) return null;

  /** Header + growth logic **/
  const hasUserSent = messages.some((m) => m.isUser);
  const visibleCount = messages.filter((m) => m.kind !== "welcome" && m.kind !== "actions").length;
  const canGrow = hasUserSent && visibleCount > 1;

  // Reset conversation to welcome state (used by New Chat)
  const resetToWelcome = () => {
    setStreamingMsgId(null);
    setInput("");
    setSummaryModal(null);
    setArticlesModal(null);
    setMessages([
      {
        id: "welcome-1",
        text: "Hi, how can I help today?",
        isUser: false,
        timestamp: new Date(),
        kind: "welcome",
      },
      {
        id: "assistant-actions-1",
        text: "",
        isUser: false,
        timestamp: new Date(),
        kind: "actions",
      },
    ]);
  };

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        className={cn(
          // Rounded top AND bottom
          "fixed z-[60] rounded-t-3xl rounded-b-3xl shadow-2xl transition-all duration-300 origin-bottom-right",
          "bottom-0 left-0 right-0 h-[90vh]",
          "md:right-8 md:left-auto md:bottom-8 md:w-[600px]",
          canGrow ? "md:h-auto md:min-h-[500px] md:max-h-[75vh]" : "md:h-[500px]",
          "flex flex-col",
          "border-2",
          "bg-[var(--noah-panel-bg)]",
          "border-[var(--noah-border)]"
        )}
      >
        {/* Header is ALWAYS visible; white */}
        <div className="h-12 px-3 flex items-center justify-end bg-white rounded-t-3xl relative shrink-0">
          {/* New Chat button with compose-like icon and tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={resetToWelcome}
                  className="mr-0.5 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
                  aria-label="Start new chat"
                >
                  <SquarePen className="w-4 h-4 text-[var(--noah-text-muted)]" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="end"
                className="border-0 text-white font-semibold"
                style={{ backgroundColor: "#374151" }}
              >
                New Chat
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Close button (X), vertically centered by flex */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-[var(--noah-text-muted)]" />
          </button>
        </div>

        {/* Messages */}
        <div
          className={cn(
            "flex-1 p-4 space-y-4 min-h-0 chat-scroll rounded-t-3xl",
            hasUserSent ? "overflow-y-auto pt-4" : "overflow-y-hidden pt-12" /* raise content & hide scrollbar initially */
          )}
        >
          {messages.map((message) => {
            const isStreamingThis = !message.isUser && streamingMsgId === message.id;
            const isStreamingTextEmpty =
              isStreamingThis && (!message.text || message.text.trim().length === 0);

            const showAssistantAvatar =
              !message.isUser && message.kind !== "summary" && message.kind !== "articles";

            const renderAssistantActions = () => (
              <div className="w-full">
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((a) => (
                    <button
                      key={a}
                      onClick={() => chooseAction(a)}
                      className="text-sm px-4 py-2 rounded-full transition-all border
                                 bg-[var(--noah-chip-bg)] text-[var(--noah-chip-text)]
                                 border-[var(--noah-chip-border)] hover:bg-[var(--noah-chip-hover-bg)]"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            );

            const renderWelcome = () => (
              <div className="w-full flex flex-col items-center text-center gap-4 py-2">
                <div className="noah-gradient-orb w-16 h-16 rounded-full shadow-lg" aria-hidden />
                <div className="font-semibold text-lg md:text-xl text-[var(--noah-text-primary)]">
                  {message.text}
                </div>
              </div>
            );

            if (message.kind === "welcome") {
              return (
                <div key={message.id} className="w-full">
                  {renderWelcome()}
                </div>
              );
            }

            if (message.kind === "actions" && !message.isUser) {
              return (
                <div key={message.id} className="w-full">
                  {renderAssistantActions()}
                </div>
              );
            }

            if (isStreamingTextEmpty) {
              return (
                <div
                  key={message.id}
                  className={cn("flex flex-col gap-1 md:max-w-[85%]", "mr-auto items-start")}
                >
                  <div className="flex gap-3 w-full items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <div className="noah-gradient-orb w-full h-full rounded-full" aria-hidden />
                    </div>
                    <div className="flex items-center gap-1 translate-y-0.5">
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: "var(--noah-typing-dot-1)", animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: "var(--noah-typing-dot-2)", animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: "var(--noah-typing-dot-3)", animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col gap-1 md:max-w-[85%]",
                  message.isUser ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "flex gap-3 w-full items-start",
                    message.isUser ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {message.isUser ? (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-[6px]
                                    bg-[var(--noah-user-avatar-bg)] text-[var(--noah-user-avatar-text)]"
                    >
                      <span className="text-xs">Y</span>
                    </div>
                  ) : showAssistantAvatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-[6px]">
                      <div className="noah-gradient-orb w-full h-full rounded-full" aria-hidden />
                    </div>
                  ) : (
                    <div className="w-8 h-8 flex-shrink-0 mt-[6px]" />
                  )}

                  {message.kind === "summary" && message.summaryPayload ? (
                  <button
                    onClick={() => setSummaryModal(message.summaryPayload!)}
                    className="
                      w-1/4 min-w-[140px]
                      rounded-xl bg-[var(--noah-user-avatar-bg)]
                      text-white font-semibold shadow-sm transition
                      px-5 py-3.5
                      hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white/30
                    "
                  >
                    <div className="flex items-center gap-0">
                      <span
                        className="
                          shrink-0
                          h-5 w-5
                          self-center
                          -mt-[1px]
                        "
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm line-clamp-1">
                          Summary
                        </div>
                      </div>
                    </div>
                  </button>

                  ) : message.kind === "articles" && message.articlesPayload ? (
                    <button
                      onClick={() => setArticlesModal(message.articlesPayload!)}
                      className="text-left w-full rounded-xl border border-indigo-200/50 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-colors p-3 shadow-sm group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 mt-0.5 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-[var(--noah-text-primary)]">
                            Found {message.articlesPayload.length} related article
                            {message.articlesPayload.length > 1 ? "s" : ""}
                          </div>
                          <div className="text-xs text-indigo-600/70">Click to view the list</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 shrink-0 mt-1" />
                      </div>
                    </button>
                  ) : (
                    <div
                      className={cn(
                        "relative rounded-2xl px-4 leading-relaxed whitespace-pre-wrap break-words break-anywhere",
                        message.isUser
                          ? "py-3 min-h-[48px] flex items-start bg-[var(--noah-bubble-user-bg)]"
                          : "py-2.5 bg-[var(--noah-bubble-assistant-bg)]",
                        "text-[var(--noah-text-primary)]"
                      )}
                    >
                      {message.text}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer with TEXTAREA */}
        <div className="px-4 py-3">
          <form onSubmit={handleSubmit} className="relative h-24">
            <div className="relative h-full">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search articles, highlight content or ask anything..."
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
                className="h-full w-full pr-20 pl-4 pt-2 pb-12
                           border-[2.5px]
                           !text-[15px] rounded-[18px]
                           outline-none focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0
                           focus-visible:ring-offset-0 focus:ring-offset-0
                           resize-none overflow-y-auto whitespace-pre-wrap break-words break-anywhere
                           bg-[var(--noah-panel-bg)]
                           border-[var(--noah-border-strong)]
                           text-[var(--noah-text-secondary)]
                           placeholder:text-[var(--noah-text-muted)]
                           focus:border-[var(--noah-border-focus)]"
              />

              {/* Send */}
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 bottom-2 h-8 w-8 rounded-full p-0 text-white shadow-md flex items-center justify-center z-20
                           bg-[var(--noah-send-btn-bg)] hover:bg-[var(--noah-send-btn-bg-hover)]"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>

              {/* Actions */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "absolute bottom-2 right-11 z-30",
                      "px-2.5 py-1.5 rounded-md select-none",
                      "text-sm font-semibold",
                      "text-[var(--noah-text-secondary)]",
                      "hover:bg-[var(--noah-dropdown-hover-bg)] hover:text-[var(--noah-dropdown-hover-text)]",
                      "data-[state=open]:bg-[var(--noah-dropdown-hover-bg)] data-[state=open]:text-[var(--noah-dropdown-hover-text)]",
                      "focus:outline-none focus-visible:ring-0"
                    )}
                    aria-label="Open actions menu"
                  >
                    <span className="inline-flex items-center">
                      ⚡Actions
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" side="top" sideOffset={8} className="w-64 p-1 z-[60]">
                  <DropdownMenuItem
                    className="text-sm font-medium cursor-pointer
                               hover:bg-[var(--noah-dropdown-hover-bg)] hover:text-[var(--noah-dropdown-hover-text)]
                               focus:bg-[var(--noah-dropdown-hover-bg)] focus:text-[var(--noah-dropdown-hover-text)]
                               data-[highlighted]:bg-[var(--noah-dropdown-hover-bg)] data-[highlighted]:text-[var(--noah-dropdown-hover-text)]
                               focus-visible:ring-0 text-[var(--noah-text-primary)]"
                    onSelect={(e) => { e.preventDefault(); chooseAction('Find related articles'); }}
                  >
                    Find related articles
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm font-medium cursor-pointer
                               hover:bg-[var(--noah-dropdown-hover-bg)] hover:text-[var(--noah-dropdown-hover-text)]
                               focus:bg-[var(--noah-dropdown-hover-bg)] focus:text-[var(--noah-dropdown-hover-text)]
                               data-[highlighted]:bg-[var(--noah-dropdown-hover-bg)] data-[highlighted]:text-[var(--noah-dropdown-hover-text)]
                               focus-visible:ring-0 text-[var(--noah-text-primary)]"
                    onSelect={(e) => { e.preventDefault(); chooseAction('Summarize this page'); }}
                  >
                    Summarize this page
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm font-medium cursor-pointer
                               hover:bg-[var(--noah-dropdown-hover-bg)] hover:text-[var(--noah-dropdown-hover-text)]
                               focus:bg-[var(--noah-dropdown-hover-bg)] focus:text-[var(--noah-dropdown-hover-text)]
                               data-[highlighted]:bg-[var(--noah-dropdown-hover-bg)] data-[highlighted]:text-[var(--noah-dropdown-hover-text)]
                               focus-visible:ring-0 text-[var(--noah-text-primary)]"
                    onSelect={(e) => { e.preventDefault(); chooseAction('Highlight important phrases'); }}
                  >
                    Highlight important phrases
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </form>
        </div>
      </div>

      {/* Modals */}
      {summaryModal && (
        <SummaryModal
          open
          onClose={() => setSummaryModal(null)}
          title={summaryModal.title}
          summary={summaryModal.summary}
          imageUrl={summaryModal.imageUrl}
          articleUrl={summaryModal.articleUrl}
        />
      )}
      {articlesModal && (
        <ArticlesModal
          open
          onClose={() => setArticlesModal(null)}
          articles={articlesModal}
        />
      )}

      <style>
        {`
        /* Prevent layout nudge / white line on the left */
        html { scrollbar-gutter: stable; }

        /* Allow breaking anywhere for long unspaced strings */
        .break-anywhere { overflow-wrap: anywhere; word-break: normal; }

        /* Scrollbar integrates with rounded top-right */
        .chat-scroll::-webkit-scrollbar { width: 10px; }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 1rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background-color: var(--noah-scrollbar-thumb);
          border-radius: 1rem;
          border: 2px solid transparent;
          background-clip: content-box;
        }

        .noah-gradient-orb {
          background:
            radial-gradient(86% 86% at 22% 20%, var(--noah-orb-orange) 40%, rgba(247,164,87,0.28) 90%, rgba(247,164,87,0) 102%),
            radial-gradient(68% 68% at 84% 40%, var(--noah-orb-pink) 0%, rgba(245,179,201,0.38) 68%, rgba(245,179,201,0) 86%),
            radial-gradient(74% 78% at 48% 82%, var(--noah-orb-yellow) 0%, rgba(246,229,141,0.42) 55%, rgba(246,229,141,0) 72%),
            radial-gradient(100% 100% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%);
          background-blend-mode: screen, screen, screen, normal;
          box-shadow: inset 0 0 18px rgba(0,0,0,0.06), inset 0 18px 24px rgba(255,255,255,0.18);
          filter: saturate(1.05);
        }
        `}
      </style>
    </>
  );
}

export default ChatPanel;
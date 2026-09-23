"use client";

import { ChatCircleDots, PaperPlaneTilt, X } from "@phosphor-icons/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { chatbotSuggestions } from "@/data/chatbot";

type Message = {
  id: number;
  role: "user" | "model";
  text: string;
};

const welcomeMessage: Message = {
  id: 0,
  role: "model",
  text: "Halo, saya asisten portofolio Zakian. Tanyakan pengalaman, keahlian, pendidikan, proyek, atau cara menghubunginya.",
};

function cleanAssistantText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .trim();
}

function AssistantText({ text, animate, onProgress }: { text: string; animate: boolean; onProgress: () => void }) {
  const cleanText = cleanAssistantText(text);
  const [visibleText, setVisibleText] = useState(animate ? "" : cleanText);

  useEffect(() => {
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setVisibleText(cleanText), 0);
      return () => window.clearTimeout(timer);
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(index + 6, cleanText.length);
      setVisibleText(cleanText.slice(0, index));
      onProgress();
      if (index >= cleanText.length) window.clearInterval(timer);
    }, 16);
    return () => window.clearInterval(timer);
  }, [animate, cleanText, onProgress]);

  return (
    <p>
      {visibleText}
      {visibleText.length < cleanText.length ? <span className="chat-caret" aria-hidden="true" /> : null}
    </p>
  );
}

export function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeChat();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, isLoading]);

  const followLatestMessage = useCallback(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, []);

  function closeChat() {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  async function sendMessage(text: string) {
    const cleanText = text.trim();
    if (!cleanText || isLoading) return;

    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      text: cleanText,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.id !== 0)
            .map(({ role, text: messageText }) => ({ role, text: messageText })),
        }),
      });
      const data = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !data.text) {
        throw new Error(data.error || "Chat sedang tidak tersedia.");
      }
      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: "model", text: data.text as string },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Chat sedang tidak tersedia. Coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <aside className="portfolio-chat" aria-label="Asisten portofolio Zakian">
      {isOpen ? (
        <section id="chat-panel" className="chat-panel" aria-labelledby="chat-title">
          <header className="chat-header">
            <div>
              <span className="chat-kicker">zakian.assistant</span>
              <h2 id="chat-title">Tanya tentang Zakian</h2>
            </div>
            <button className="chat-close" type="button" onClick={closeChat} aria-label="Tutup chat">
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <div className="chat-messages" ref={listRef} aria-live="polite" aria-busy={isLoading}>
            {messages.map((message, index) => (
              <div className={`chat-message chat-message-${message.role}`} key={message.id}>
                <span>{message.role === "model" ? "Asisten" : "Anda"}</span>
                {message.role === "model" ? (
                  <AssistantText
                    text={message.text}
                    animate={index === messages.length - 1 && message.id !== 0}
                    onProgress={followLatestMessage}
                  />
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            ))}
            {isLoading ? (
              <div className="chat-message chat-message-model chat-loading" aria-label="Asisten sedang mengetik">
                <span>Asisten</span>
                <div className="chat-typing-indicator" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="chat-suggestions" aria-label="Pertanyaan yang bisa dipilih">
              {chatbotSuggestions.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <form className="chat-form" onSubmit={handleSubmit}>
            <label htmlFor="portfolio-chat-input" className="sr-only">
              Pertanyaan tentang Zakian
            </label>
            <input
              id="portfolio-chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={600}
              autoComplete="off"
              placeholder="Tanya tentang Zakian..."
              aria-describedby={error ? "chat-error" : undefined}
              aria-invalid={Boolean(error)}
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Kirim pertanyaan">
              <PaperPlaneTilt size={18} weight="fill" aria-hidden="true" />
            </button>
          </form>
          <p id="chat-error" className="chat-error" role="alert">
            {error}
          </p>
        </section>
      ) : null}

      {!isOpen ? (
        <button
          ref={triggerRef}
          className="chat-trigger"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded="false"
          aria-controls="chat-panel"
        >
          <ChatCircleDots size={23} weight="fill" aria-hidden="true" />
          <span>Tanya Zakian</span>
        </button>
      ) : null}
    </aside>
  );
}

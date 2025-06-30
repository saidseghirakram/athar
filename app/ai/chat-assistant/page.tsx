"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AiChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from AI");
      }

      const assistantMessage = await res.json();
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] mt-16">
      <div className="p-4 border-b border-[var(--input-border)] text-center bg-white/80 backdrop-blur-sm sticky top-16 z-10">
        <h1 className="text-2xl font-bold text-[var(--text)]">Chat with Dahman</h1>
        <p className="text-sm text-[var(--text-muted)]">Your AI guide to Algeria</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-10 h-10 rounded-full bg-[var(--icon-bg)] text-[var(--primary-color)] flex items-center justify-center border-2 border-[var(--primary-color)] flex-shrink-0">
                <Bot size={24} />
              </div>
            )}
            <div
              className={`max-w-lg p-4 rounded-xl shadow-md ${
                msg.role === "user"
                  ? "bg-[var(--primary-color)] text-[var(--foreground-text)] rounded-br-none"
                  : "bg-[var(--card-bg)] text-[var(--text)] rounded-bl-none"
              }`}
            >
              <div className="prose prose-sm max-w-none text-current">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="my-2" {...props} />
                    ),
                  }}
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-[var(--icon-bg)] text-[var(--text)] flex items-center justify-center border-2 border-[var(--input-border)] flex-shrink-0">
                <User size={24} />
              </div>
            )}
          </div>
        ))}
         {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--icon-bg)] text-[var(--primary-color)] flex items-center justify-center border-2 border-[var(--primary-color)] flex-shrink-0">
              <Bot size={24} />
            </div>
            <div className="max-w-lg p-4 rounded-xl shadow-md bg-[var(--card-bg)] text-[var(--text)] rounded-bl-none">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse delay-200"></span>
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-[var(--background)] p-4 border-t border-[var(--input-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSubmit} className="flex-1">
              <Input
                type="text"
                placeholder="Ask me anything about your trip to Algeria..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}  
                className="h-12 w-full rounded-full bg-white border-[var(--input-border)] focus-visible:ring-1 focus-visible:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
              />
            </form>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              onClick={handleSubmit}
              className="bg-[var(--button-primary)] text-[var(--button-text-primary)] h-12 w-12 rounded-full flex-shrink-0"
            >
              <Send size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatPage; 
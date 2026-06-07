"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Headphones, Sparkles, CheckCircle } from "lucide-react";
import { supportResponses } from "@/data/mockData";

interface Message {
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

const quickIssues = [
  "Where's my order? 📍",
  "I want a refund 💰",
  "Wrong order delivered ❌",
  "Cancel my order 🚫",
];

function getAgentResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("refund") || lower.includes("money back")) return supportResponses.refund;
  if (lower.includes("late") || lower.includes("where") || lower.includes("order")) return supportResponses.late;
  if (lower.includes("wrong") || lower.includes("incorrect")) return supportResponses.wrong;
  if (lower.includes("cancel")) return supportResponses.cancel;
  return supportResponses.default;
}

export default function GenieSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "Hi! I'm Genie Support, your AI assistant 👋\n\nI can help you with order tracking, refunds, cancellations, and more — instantly, no hold time.\n\nWhat can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getAgentResponse(text);
      const agentMsg: Message = { role: "agent", text: response, timestamp: new Date() };
      setMessages((prev) => [...prev, agentMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-3 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Headphones size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Genie Support</p>
              <p className="text-xs text-green-500 font-medium">● AI Agent — Instant Resolution</p>
            </div>
          </div>
          <div className="ml-auto bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
            ~30s avg
          </div>
        </div>

        {/* Active Order Banner */}
        <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-700">Active Order #SW2847362</p>
            <p className="text-xs text-gray-500">Chicken Dum Biryani · Behrouz Biryani</p>
          </div>
          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-lg">Out for delivery</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-36">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%]">
              {msg.role === "agent" && (
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles size={10} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Genie Support</span>
                </div>
              )}
              <div className={`rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-orange-500 text-white rounded-tr-sm"
                  : "bg-gray-100 text-gray-800 rounded-tl-sm"
              }`}>
                {msg.text.split("\n").map((line, j) => (
                  <p key={j} className={line === "" ? "h-2" : ""}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Resolved State */}
        {resolved && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <CheckCircle size={28} className="text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800 text-sm">Issue Resolved! 🎉</p>
            <p className="text-xs text-gray-500 mt-1">We've added ₹50 to your Swiggy wallet as a goodwill gesture.</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 pt-3 pb-6">
        {!resolved && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {quickIssues.map((issue) => (
                <button
                  key={issue}
                  onClick={() => sendMessage(issue)}
                  className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition font-medium"
                >
                  {issue}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 flex items-center bg-gray-100 rounded-2xl px-4 py-2.5">
                <input
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                  placeholder="Describe your issue..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                />
              </div>
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-blue-600 transition"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            <button
              onClick={() => setResolved(true)}
              className="w-full mt-2 text-xs text-gray-400 hover:text-green-500 transition text-center"
            >
              ✓ Mark as resolved
            </button>
          </>
        )}
      </div>
    </div>
  );
}
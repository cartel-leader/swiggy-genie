"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Star, Clock, ShoppingCart, Mic } from "lucide-react";
import { restaurants, genieResponses } from "@/data/mockData";

interface Message {
  role: "user" | "genie";
  text: string;
  recommendations?: number[];
  timestamp: Date;
}

const quickPrompts = [
  "Something spicy 🌶️",
  "Light & healthy 🥗",
  "Comfort food 🤗",
  "Biryani please 🍛",
  "Under ₹200 💸",
];

function getGenieResponse(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes("spicy") || lower.includes("hot")) return genieResponses.spicy;
  if (lower.includes("light") || lower.includes("healthy") || lower.includes("diet")) return genieResponses.healthy;
  if (lower.includes("comfort") || lower.includes("lazy") || lower.includes("tired")) return genieResponses.comfort;
  if (lower.includes("biryani")) return genieResponses.biryani;
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("200")) return genieResponses.budget;
  return genieResponses.default;
}

function getDishById(id: number) {
  for (const r of restaurants) {
    const dish = r.dishes.find((d) => d.id === id);
    if (dish) return { ...dish, restaurant: r.name, deliveryTime: r.deliveryTime, rating: r.rating };
  }
  return null;
}

export default function GenieChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "genie",
      text: "Hey! I'm Genie, your personal AI food concierge 🧞‍♂️\n\nJust tell me what you're craving — in plain words. Try something like 'something spicy under ₹300' or 'I'm tired, want comfort food'.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
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
      const response = getGenieResponse(text);
      const genieMsg: Message = {
        role: "genie",
        text: response.message,
        recommendations: response.recommendations,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, genieMsg]);
      setLoading(false);
    }, 1200);
  };

  const addToCart = (dishId: number) => {
    setCart((prev) => [...prev, dishId]);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <div className="bg-white px-4 pt-10 pb-3 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Swiggy Genie</p>
              <p className="text-xs text-green-500 font-medium">● Online — AI Concierge</p>
            </div>
          </div>
          {cart.length > 0 && (
            <div className="ml-auto flex items-center gap-1 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full">
              <ShoppingCart size={12} />
              {cart.length} items
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-36">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${msg.role === "user" ? "" : "w-full"}`}>
              {msg.role === "genie" && (
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles size={10} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Genie</span>
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

              {msg.recommendations && (
                <div className="mt-3 space-y-2">
                  {msg.recommendations.map((dishId) => {
                    const dish = getDishById(dishId);
                    if (!dish) return null;
                    const inCart = cart.includes(dishId);
                    return (
                      <div key={dishId} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{dish.name}</p>
                            <p className="text-xs text-gray-500">{dish.restaurant}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-0.5 text-xs text-green-600">
                                <Star size={10} fill="currentColor" />{dish.rating}
                              </span>
                              <span className="flex items-center gap-0.5 text-xs text-gray-400">
                                <Clock size={10} />{dish.deliveryTime}
                              </span>
                              <span className="text-xs text-gray-400">{dish.calories} kcal</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800 text-sm">₹{dish.price}</p>
                            <button
                              onClick={() => addToCart(dishId)}
                              className={`mt-1 text-xs px-3 py-1.5 rounded-xl font-semibold transition ${
                                inCart
                                  ? "bg-green-100 text-green-600"
                                  : "bg-orange-500 text-white hover:bg-orange-600"
                              }`}
                            >
                              {inCart ? "✓ Added" : "+ Add"}
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {dish.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 pt-3 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 hover:bg-orange-100 transition font-medium"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 gap-2">
            <input
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
              placeholder="Tell Genie what you're craving..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <Mic size={16} className="text-gray-400" />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-orange-600 transition"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
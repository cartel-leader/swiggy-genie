"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, Star, Clock, Zap, Brain, Calendar, Headphones, ChevronRight, Sparkles } from "lucide-react";
import { restaurants } from "@/data/mockData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
              <MapPin size={14} className="text-orange-500" />
              Home
              <ChevronRight size={14} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">Sector 18, Gurugram, Haryana</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm">
            R
          </div>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none"
            placeholder="Search for restaurants and food"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 pb-24 space-y-6 mt-4">
        {/* Genie Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} />
            <span className="font-bold text-lg">Meet Swiggy Genie ✨</span>
          </div>
          <p className="text-orange-100 text-sm mb-3">Your AI food concierge. Just tell it what you feel like.</p>
          <Link href="/genie-chat">
            <button className="bg-white text-orange-500 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-orange-50 transition">
              Try Genie Chat →
            </button>
          </Link>
        </div>

        {/* AI Features Row */}
        <div>
          <h2 className="font-bold text-gray-800 mb-3 text-base">Genie Features</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/genie-chat">
              <div className="bg-orange-50 rounded-2xl p-3 text-center hover:bg-orange-100 transition cursor-pointer">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Brain size={18} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Genie Chat</p>
                <p className="text-xs text-gray-400">AI ordering</p>
              </div>
            </Link>
            <Link href="/meal-planner">
              <div className="bg-green-50 rounded-2xl p-3 text-center hover:bg-green-100 transition cursor-pointer">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar size={18} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Meal Planner</p>
                <p className="text-xs text-gray-400">Weekly plan</p>
              </div>
            </Link>
            <Link href="/genie-support">
              <div className="bg-blue-50 rounded-2xl p-3 text-center hover:bg-blue-100 transition cursor-pointer">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Headphones size={18} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-700">AI Support</p>
                <p className="text-xs text-gray-400">Instant help</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["All", "🍛 Biryani", "🍔 Burgers", "🥗 Healthy", "🌶️ Spicy", "🧀 Veg"].map((f) => (
              <button key={f} className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500 transition">
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div>
          <h2 className="font-bold text-gray-800 mb-3 text-base">Restaurants Near You</h2>
          <div className="space-y-3">
            {restaurants.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 h-28 flex items-center justify-center text-5xl">
                  {r.image}
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{r.name}</h3>
                      <p className="text-xs text-gray-500">{r.cuisine}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-lg">
                      <Star size={10} fill="white" />
                      {r.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={11} />{r.deliveryTime}</span>
                    <span>₹{r.minOrder} min</span>
                  </div>
                  {r.offer && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-500 font-medium">
                      <Zap size={11} />{r.offer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-around z-50">
        {[
          { icon: "🏠", label: "Home", href: "/" },
          { icon: "🔍", label: "Search", href: "/" },
          { icon: "✨", label: "Genie", href: "/genie-chat" },
          { icon: "📦", label: "Orders", href: "/genie-support" },
          { icon: "👤", label: "Profile", href: "/" },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
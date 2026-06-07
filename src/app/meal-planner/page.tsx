"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Zap, RefreshCw, CheckCircle, ShoppingCart } from "lucide-react";
import { mealPlan } from "@/data/mockData";

const goals = ["High Protein 💪", "Low Carb 🥗", "Vegetarian 🌿", "Budget ₹ Friendly", "Balanced 🍱"];
const days = ["Monday", "Tuesday", "Wednesday"];

export default function MealPlanner() {
  const [selectedGoal, setSelectedGoal] = useState("High Protein 💪");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderedMeals, setOrderedMeals] = useState<string[]>([]);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGenerated(true);
      setLoading(false);
    }, 1800);
  };

  const orderMeal = (key: string) => {
    setOrderedMeals((prev) => [...prev, key]);
  };

  const totalCalories = mealPlan.slice(0, 3).reduce((sum, m) => sum + m.calories, 0);
  const totalCost = mealPlan.slice(0, 3).reduce((sum, m) => sum + m.price, 0);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-3 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Calendar size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Smart Meal Planner</p>
              <p className="text-xs text-gray-400">Powered by Genie AI ✨</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 pb-24 space-y-5">
        {/* Goal Selector */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">What's your weekly goal?</p>
          <div className="flex flex-wrap gap-2">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => { setSelectedGoal(g); setGenerated(false); }}
                className={`text-xs px-3 py-2 rounded-full border font-medium transition ${
                  selectedGoal === g
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        {!generated ? (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-green-500 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Genie is planning your week...
              </>
            ) : (
              <>
                <Zap size={16} />
                Generate My Meal Plan
              </>
            )}
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Plan ready for this week!</p>
                <p className="text-xs text-gray-500">Goal: {selectedGoal}</p>
              </div>
            </div>
            <button onClick={() => setGenerated(false)} className="text-xs text-green-600 font-medium underline">
              Redo
            </button>
          </div>
        )}

        {/* Stats */}
        {generated && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Avg Daily Cal", value: `${Math.round(totalCalories / 3)} kcal`, color: "bg-orange-50 text-orange-600" },
              { label: "Daily Cost", value: `₹${totalCost}`, color: "bg-green-50 text-green-600" },
              { label: "Meals Planned", value: `${mealPlan.length}`, color: "bg-blue-50 text-blue-600" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-2xl p-3 text-center`}>
                <p className="font-bold text-base">{s.value}</p>
                <p className="text-xs mt-0.5 opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Meal Plan */}
        {generated && days.map((day) => (
          <div key={day}>
            <h3 className="font-bold text-gray-800 mb-2 text-sm">{day}</h3>
            <div className="space-y-2">
              {mealPlan.filter((m) => m.day === day).map((m) => {
                const key = `${m.day}-${m.meal}`;
                const ordered = orderedMeals.includes(key);
                return (
                  <div key={key} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{m.meal}</span>
                        <span className="text-xs text-green-600 font-medium">{m.tag}</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm mt-1">{m.dish}</p>
                      <p className="text-xs text-gray-500">{m.restaurant} · ₹{m.price} · {m.calories} kcal</p>
                    </div>
                    <button
                      onClick={() => orderMeal(key)}
                      className={`ml-3 text-xs px-3 py-2 rounded-xl font-semibold transition flex items-center gap-1 ${
                        ordered
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {ordered ? <><CheckCircle size={12} /> Done</> : <><ShoppingCart size={12} /> Order</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Nudge */}
        {generated && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-orange-700">🔔 Tomorrow's Nudge</p>
            <p className="text-xs text-gray-600 mt-1">
              Your Tuesday lunch — <strong>Chicken Dum Biryani from Behrouz</strong> — is ready to order. Tap to pre-order now!
            </p>
            <button className="mt-2 text-xs bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
              Pre-order for Tomorrow →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
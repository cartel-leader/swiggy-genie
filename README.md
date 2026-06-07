# 🧞 Swiggy Genie — AI-Powered Food Concierge

> Reimagining Swiggy with a Generative AI layer that makes food ordering intelligent, personalised, and effortless.

---

## ✨ What is Swiggy Genie?

Swiggy already solves food delivery. But it still makes _you_ do the thinking.

**Swiggy Genie** is a GenAI layer on top of Swiggy that acts as your personal food concierge — understanding your mood, your goals, and your context to make ordering completely frictionless.

Stop scrolling. Just tell Genie what you feel like. It figures out the rest.

---

## 🚀 Features

### 🧠 Genie Chat — Conversational Ordering

Stop scrolling. Just talk.

- Type naturally: _"something spicy under ₹200"_ or _"I'm tired, want comfort food"_
- Genie parses your intent using an LLM and curates 3 perfect options with reasoning
- See dish tags, calories, ratings, delivery time — all in one view
- One-tap add to cart

### 📅 Smart Meal Planner — Weekly AI Meal Planning

Set a goal. Let Genie plan your week.

- Choose from: High Protein, Low Carb, Vegetarian, Budget-Friendly, or Balanced
- Genie generates a full 7-day meal plan (breakfast, lunch, dinner) using real nearby restaurants
- Tracks daily calories and cost
- Morning nudges to pre-order upcoming meals

### 🎧 Genie Support — Autonomous AI Support Agent

No hold music. No frustrating bots.

- Describe your issue in plain language
- Genie fetches your live order data and resolves it instantly
- Handles refunds, wrong orders, cancellations, and ETA queries
- Escalates to human agents only when truly needed

---

## 🎯 Business Impact

| Metric                  | Target                              |
| ----------------------- | ----------------------------------- |
| Cart Conversion Rate    | +18–25% uplift                      |
| Average Order Value     | +12% via smart upsells              |
| Support Cost per Ticket | -45% via autonomous resolution      |
| Time-to-Order           | 4–7 min → under 90 seconds          |
| Monthly Active Users    | +10% via meal planner re-engagement |

---

## 🛠 Tech Stack

| Layer      | Technology                                                     |
| ---------- | -------------------------------------------------------------- |
| Framework  | Next.js 14 (App Router)                                        |
| Styling    | Tailwind CSS                                                   |
| Language   | TypeScript                                                     |
| Icons      | Lucide React                                                   |
| Animation  | Framer Motion                                                  |
| AI Layer   | Mock responses (production: Anthropic Claude / GPT-4o via RAG) |
| Deployment | Vercel                                                         |

---

## 🧠 GenAI Architecture (Production Vision)

User Input
↓
Intent Parser (LLM)
↓
Context Injector (order history + location + time + weather)
↓
RAG Retrieval (live Swiggy restaurant + menu catalogue)
↓
Response Generator (grounded — no hallucinations)
↓
Personalised Output → User

- All dish and restaurant recommendations grounded in **live catalogue data via RAG**
- Zero hallucination on food items — LLM only ranks and reasons, never invents
- Tiered model routing: small models for simple intents, GPT-4 class for complex conversations
- Target p95 latency: **under 1.5 seconds**

---

## 📁 Project Structure

swiggy-genie/
├── src/
│ ├── app/
│ │ ├── page.tsx # Home — Swiggy-style feed
│ │ ├── genie-chat/
│ │ │ └── page.tsx # Genie Chat feature
│ │ ├── meal-planner/
│ │ │ └── page.tsx # Smart Meal Planner
│ │ └── genie-support/
│ │ └── page.tsx # Genie Support Agent
│ ├── data/
│ │ └── mockData.ts # Mock restaurants, dishes, AI responses
│ └── components/ # Reusable UI components
├── public/
├── tailwind.config.ts
└── README.md

---

## 🏃 Running Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/swiggy-genie.git

# Navigate into project
cd swiggy-genie

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 What This Would Look Like in Production

- Replace mock responses with **Anthropic Claude API** calls
- Integrate **Swiggy's live restaurant catalogue** as RAG knowledge base
- Add **voice input** via Web Speech API for hands-free ordering
- Implement **multimodal dish search** — photograph a dish, find it on Swiggy
- **Personalisation engine** that learns from every interaction
- **Push notifications** for Meal Planner morning nudges

---

## 👥 Built By

Made with 🧡 using Next.js, Tailwind CSS, and TypeScript

_Reimagining mobile experiences with Generative AI_

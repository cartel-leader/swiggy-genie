export const restaurants = [
  {
    id: 1,
    name: "Freshmenu",
    cuisine: "Continental, Healthy",
    rating: 4.3,
    deliveryTime: "25-30 min",
    minOrder: 149,
    offer: "50% off up to ₹100",
    image: "🥗",
    dishes: [
      { id: 101, name: "Grilled Chicken Bowl", price: 289, calories: 420, tags: ["high-protein", "healthy"] },
      { id: 102, name: "Dal Khichdi", price: 179, calories: 310, tags: ["light", "comfort"] },
      { id: 103, name: "Paneer Tikka Wrap", price: 219, calories: 380, tags: ["veg", "filling"] },
    ],
  },
  {
    id: 2,
    name: "Behrouz Biryani",
    cuisine: "Biryani, Mughlai",
    rating: 4.5,
    deliveryTime: "35-40 min",
    minOrder: 299,
    offer: "Free delivery",
    image: "🍛",
    dishes: [
      { id: 201, name: "Chicken Dum Biryani", price: 349, calories: 650, tags: ["spicy", "heavy", "non-veg"] },
      { id: 202, name: "Veg Biryani", price: 279, calories: 520, tags: ["veg", "filling"] },
      { id: 203, name: "Mutton Biryani", price: 429, calories: 720, tags: ["spicy", "heavy", "non-veg"] },
    ],
  },
  {
    id: 3,
    name: "Subway",
    cuisine: "Sandwiches, Salads",
    rating: 4.1,
    deliveryTime: "20-25 min",
    minOrder: 199,
    offer: "Buy 2 get 1 free",
    image: "🥪",
    dishes: [
      { id: 301, name: "Veggie Delite Sub", price: 199, calories: 290, tags: ["veg", "light", "healthy"] },
      { id: 302, name: "Chicken Teriyaki Sub", price: 269, calories: 410, tags: ["non-veg", "filling"] },
      { id: 303, name: "Paneer Tikka Sub", price: 239, calories: 370, tags: ["veg", "spicy"] },
    ],
  },
  {
    id: 4,
    name: "McDonald's",
    cuisine: "Burgers, Fast Food",
    rating: 4.2,
    deliveryTime: "20-30 min",
    minOrder: 149,
    offer: "20% off on ₹299+",
    image: "🍔",
    dishes: [
      { id: 401, name: "McSpicy Chicken", price: 189, calories: 490, tags: ["spicy", "non-veg"] },
      { id: 402, name: "McAloo Tikki Burger", price: 99, calories: 320, tags: ["veg", "budget"] },
      { id: 403, name: "Fries + McFlurry Combo", price: 219, calories: 580, tags: ["indulgent", "sweet"] },
    ],
  },
];

export const genieResponses: Record<string, { message: string; recommendations: number[] }> = {
  spicy: {
    message: "Ooh, you're in the mood for some heat! 🌶️ Based on your location and time of day, here are my top spicy picks:",
    recommendations: [201, 401, 303],
  },
  light: {
    message: "Something light and easy — good call. Here's what I'd suggest for a guilt-free meal right now:",
    recommendations: [102, 301, 103],
  },
  comfort: {
    message: "Comfort food incoming 🤗 It's been a long day — let me pick something warm and satisfying:",
    recommendations: [102, 202, 402],
  },
  healthy: {
    message: "Staying on track! 💪 Here are the best high-protein, balanced options near you:",
    recommendations: [101, 301, 103],
  },
  budget: {
    message: "Smart choice! Here are great meals under ₹200 that don't compromise on taste:",
    recommendations: [402, 102, 301],
  },
  biryani: {
    message: "Biryani it is — no questions asked 🍛 Here are the top-rated options near you:",
    recommendations: [201, 202, 203],
  },
  default: {
    message: "Based on your order history and the time of day, here are my top picks for you right now:",
    recommendations: [101, 201, 301],
  },
};

export const mealPlan = [
  { day: "Monday", meal: "Breakfast", dish: "Veggie Delite Sub", restaurant: "Subway", price: 199, calories: 290, tag: "🥗 Light Start" },
  { day: "Monday", meal: "Lunch", dish: "Grilled Chicken Bowl", restaurant: "Freshmenu", price: 289, calories: 420, tag: "💪 High Protein" },
  { day: "Monday", meal: "Dinner", dish: "Dal Khichdi", restaurant: "Freshmenu", price: 179, calories: 310, tag: "🌙 Light Dinner" },
  { day: "Tuesday", meal: "Breakfast", dish: "McAloo Tikki Burger", restaurant: "McDonald's", price: 99, calories: 320, tag: "⚡ Quick Bite" },
  { day: "Tuesday", meal: "Lunch", dish: "Chicken Dum Biryani", restaurant: "Behrouz", price: 349, calories: 650, tag: "🔥 Treat Yourself" },
  { day: "Tuesday", meal: "Dinner", dish: "Paneer Tikka Wrap", restaurant: "Freshmenu", price: 219, calories: 380, tag: "🧀 Veg Delight" },
  { day: "Wednesday", meal: "Breakfast", dish: "Veggie Delite Sub", restaurant: "Subway", price: 199, calories: 290, tag: "🥗 Light Start" },
  { day: "Wednesday", meal: "Lunch", dish: "Chicken Teriyaki Sub", restaurant: "Subway", price: 269, calories: 410, tag: "💪 Protein Boost" },
  { day: "Wednesday", meal: "Dinner", dish: "Veg Biryani", restaurant: "Behrouz", price: 279, calories: 520, tag: "🌿 Veg Special" },
];

export const supportResponses: Record<string, string> = {
  refund: "I've checked your order #SW2847362. ₹349 will be refunded to your original payment method within 5–7 business days. You'll get an SMS confirmation shortly. 🙏",
  late: "Your order is running ~12 minutes behind due to high traffic. The delivery partner is 1.2 km away. I've added a ₹30 coupon to your account as an apology!",
  wrong: "I'm really sorry about the wrong order. I've initiated a full refund of ₹289 and flagged this restaurant for quality review. Refund in 3–5 days.",
  cancel: "Order #SW2847362 cancelled. A ₹50 cancellation fee applies since it was being prepared. ₹299 refunded in 5–7 days.",
  default: "I'm on it! Let me pull up your recent orders and resolve this right away. Could you share your order ID or describe the issue?",
};
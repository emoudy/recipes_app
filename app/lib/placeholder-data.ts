// USERS TABLE
const users = [
  {
    id: 92301928,
    name: "Alice",
    email: "alice@hotmail.com",
  },
  {
    id: 92301929,
    name: "Bob",
    email: "bob@hotmail.com",
  },
  {
    id: 92301930,
    name: "Charlie",
    email: "charlie@hotmail.com",
  }
];

// RECIPES TABLE (Recipes are stored independently)
const recipes = [
  {
    id: 1,
    name: "Egg Sandwich",
    category: "breakfast",
    description: "A simple and delicious breakfast sandwich.",
    ingredients: [
      { id: 1, name: "Egg", quantity: 2, unit: "pcs" },
      { id: 2, name: "Bread", quantity: 2, unit: "slices" },
      { id: 3, name: "Butter", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      "Heat a pan over medium heat.",
      "Crack eggs into the pan and cook until the whites are set.",
      "Toast the bread slices and spread butter on them.",
      "Place the cooked eggs between the bread slices and serve.",
    ],
    servings: 1,
    prep_time: 10,
    cook_time: 5,
    created_at: "2022-12-06",
    updated_at: "2022-12-06",
    last_viewed: "2022-12-06",
  },
  {
    id: 2,
    name: "Avocado Toast",
    category: "breakfast",
    description: "A quick and healthy avocado toast recipe.",
    ingredients: [
      { id: 4, name: "Avocado", quantity: 1, unit: "pcs" },
      { id: 5, name: "Bread", quantity: 1, unit: "slice" },
      { id: 6, name: "Salt", quantity: 1, unit: "pinch" },
    ],
    instructions: [
      "Mash avocado and spread on toasted bread.",
      "Sprinkle with salt and serve.",
    ],
    servings: 1,
    prep_time: 5,
    cook_time: 0,
    created_at: "2022-12-11",
    updated_at: "2022-12-11",
    last_viewed: "2022-12-14",
  },
  {
    id: 3,
    name: "Banana Smoothie",
    category: "drink",
    description: "A refreshing banana smoothie.",
    ingredients: [
      { id: 7, name: "Banana", quantity: 1, unit: "pcs" },
      { id: 8, name: "Milk", quantity: 1, unit: "cup" },
      { id: 9, name: "Honey", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      "Blend all ingredients until smooth.",
      "Serve chilled.",
    ],
    servings: 1,
    prep_time: 5,
    cook_time: 0,
    created_at: "2022-12-15",
    updated_at: "2022-12-15",
    last_viewed: "2022-12-18",
  }
];

// USER_RECIPES TABLE (Tracks which user saved which recipe)
const userRecipes = [
  { user_id: 92301928, recipe_id: [1, 2, 3] },
  { user_id: 92301929, recipe_id: [2, 3]},
  { user_id: 92301930, recipe_id: [3] },
];

// CHAT SESSIONS TABLE
const chatSessions = [
  {
    id: 1,
    name: "Breakfast Recipes",
    user_id: 92301928, // Alice
    created_at: "2022-12-06T12:00:00Z",
    updated_at: "2022-12-06T12:00:00Z",
  },
  {
    id: 2,
    name: "Healthy Meals",
    user_id: 92301929, // Bob
    created_at: "2022-12-07T10:00:00Z",
    updated_at: "2022-12-07T10:05:00Z",
  },
  {
    id: 3,
    name: "Quick Breakfast Ideas",
    user_id: 92301930, // Charlie
    created_at: "2022-12-08T08:00:00Z",
    updated_at: "2022-12-08T08:10:00Z",
  }
];

// MESSAGES TABLE
const messages = [
  {
    id: 1,
    chat_session_id: 1,
    user_query: "Hello, how are you?",
    timestamp: "2022-12-06T12:00:00Z",
    ai_response: "Doing well, thanks. How about you?",
  },
  {
    id: 2,
    chat_session_id: 1,
    user_query: "I am planning to make an egg sandwich for breakfast. Do you have a recipe?",
    timestamp: "2022-12-06T12:02:00Z",
    ai_response: "Sure! Here is a simple recipe for an egg sandwich...",
  },
  {
    id: 3,
    chat_session_id: 2,
    user_query: "What's a healthy meal for lunch?",
    timestamp: "2022-12-07T10:00:00Z",
    ai_response: "How about a fresh chicken salad? Would you like a recipe?",
  },
  {
    id: 4,
    chat_session_id: 3,
    user_query: "I need a quick breakfast idea. Any suggestions?",
    timestamp: "2022-12-08T08:00:00Z",
    ai_response: "Pancakes are a great option! Here's a recipe for fluffy pancakes...",
  }
];

export { users, recipes, userRecipes, chatSessions, messages };

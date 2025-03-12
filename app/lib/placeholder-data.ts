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
    prepTime: 10,
    cookTime: 5,
    createdAt: "2022-12-06",
    updatedAt: "2022-12-06",
    lastViewed: "2022-12-06",
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
    prepTime: 5,
    cookTime: 0,
    createdAt: "2022-12-11",
    updatedAt: "2022-12-11",
    lastViewed: "2022-12-14",
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
    prepTime: 5,
    cookTime: 0,
    createdAt: "2022-12-15",
    updatedAt: "2022-12-15",
    lastViewed: "2022-12-18",
  }
];

// USER_RECIPES TABLE (Tracks which user saved which recipe)
const userRecipes = [
  { userId: 92301928, recipeId: 1, savedAt: "2022-12-06" },
  { userId: 92301929, recipeId: 2, savedAt: "2022-12-11" },
  { userId: 92301930, recipeId: 3, savedAt: "2022-12-15" },
];

// CHAT SESSIONS TABLE
const chatSessions = [
  {
    id: 1,
    name: "Breakfast Recipes",
    userId: 92301928, // Alice
    createdAt: "2022-12-06T12:00:00Z",
    updatedAt: "2022-12-06T12:00:00Z",
  },
  {
    id: 2,
    name: "Healthy Meals",
    userId: 92301929, // Bob
    createdAt: "2022-12-07T10:00:00Z",
    updatedAt: "2022-12-07T10:05:00Z",
  },
  {
    id: 3,
    name: "Quick Breakfast Ideas",
    userId: 92301930, // Charlie
    createdAt: "2022-12-08T08:00:00Z",
    updatedAt: "2022-12-08T08:10:00Z",
  }
];

// MESSAGES TABLE
const messages = [
  {
    id: 1,
    chatSessionId: 1,
    userInput: "Hello, how are you?",
    timestamp: "2022-12-06T12:00:00Z",
    aiOutput: "Doing well, thanks. How about you?",
  },
  {
    id: 2,
    chatSessionId: 1,
    userInput: "I am planning to make an egg sandwich for breakfast. Do you have a recipe?",
    timestamp: "2022-12-06T12:02:00Z",
    aiOutput: "Sure! Here is a simple recipe for an egg sandwich...",
  },
  {
    id: 3,
    chatSessionId: 2,
    userInput: "What's a healthy meal for lunch?",
    timestamp: "2022-12-07T10:00:00Z",
    aiOutput: "How about a fresh chicken salad? Would you like a recipe?",
  },
  {
    id: 4,
    chatSessionId: 3,
    userInput: "I need a quick breakfast idea. Any suggestions?",
    timestamp: "2022-12-08T08:00:00Z",
    aiOutput: "Pancakes are a great option! Here's a recipe for fluffy pancakes...",
  }
];

export { users, recipes, userRecipes, chatSessions, messages };

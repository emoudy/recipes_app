// USERS TABLE
const users = [
  {
    userId: 92301928,
    name: "Alice",
    email: "alice@hotmail.com",
  },
  {
    userId: 92301929,
    name: "Bob",
    email: "bob@hotmail.com",
  },
  {
    userId: 92301930,
    name: "Charlie",
    email: "charlie@hotmail.com",
  }
];

// RECIPES TABLE (Each user has recipes)
const recipes = [
  {
    userId: 92301928,
    recipes: [
      {
        recipeId: 1,
        name: "Egg Sandwich",
        category: "breakfast",
        description: "A simple and delicious breakfast sandwich.",
        ingredients: [
          { ingredientId: 1, name: "Egg", quantity: 2, unit: "pcs" },
          { ingredientId: 2, name: "Bread", quantity: 2, unit: "slices" },
          { ingredientId: 3, name: "Butter", quantity: 1, unit: "tbsp" },
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
      }
    ],
  },
  {
    userId: 92301929,
    recipes: [
      {
        recipeId: 4,
        name: "Avocado Toast",
        category: "breakfast",
        description: "A quick and healthy avocado toast recipe.",
        ingredients: [
          { ingredientId: 11, name: "Avocado", quantity: 1, unit: "pcs" },
          { ingredientId: 12, name: "Bread", quantity: 1, unit: "slice" },
          { ingredientId: 13, name: "Salt", quantity: 1, unit: "pinch" },
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
      }
    ],
  },
  {
    userId: 92301930,
    recipes: [
      {
        recipeId: 6,
        name: "Banana Smoothie",
        category: "drink",
        description: "A refreshing banana smoothie.",
        ingredients: [
          { ingredientId: 18, name: "Banana", quantity: 1, unit: "pcs" },
          { ingredientId: 19, name: "Milk", quantity: 1, unit: "cup" },
          { ingredientId: 20, name: "Honey", quantity: 1, unit: "tbsp" },
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
    ],
  }
];

// CHAT SESSIONS TABLE (Each user has a chat session)
const chatSessions = [
  {
    chatSessionId: 1,
    chatSessionName: "Breakfast Recipes",
    userId: 92301928, // Alice
    createdAt: "2022-12-06T12:00:00Z",
    updatedAt: "2022-12-06T12:00:00Z",
  },
  {
    chatSessionId: 2,
    chatSessionName: "Healthy Meals",
    userId: 92301929, // Bob
    createdAt: "2022-12-07T10:00:00Z",
    updatedAt: "2022-12-07T10:05:00Z",
  },
  {
    chatSessionId: 3,
    chatSessionName: "Quick Breakfast Ideas",
    userId: 92301930, // Charlie
    createdAt: "2022-12-08T08:00:00Z",
    updatedAt: "2022-12-08T08:10:00Z",
  }
];

// MESSAGES TABLE (Each user has messages in their chat sessions)
const messages = [
  {
    messageId: 1,
    chatSessionId: 1,
    userInput: "Hello, how are you?",
    messageTimestamp: "2022-12-06T12:00:00Z",
    aiInput: "Doing well, thanks. How about you?",
  },
  {
    messageId: 2,
    chatSessionId: 1,
    userInput: "I am planning to make an egg sandwich for breakfast. Do you have a recipe?",
    messageTimestamp: "2022-12-06T12:02:00Z",
    aiInput: "Sure! Here is a simple recipe for an egg sandwich...",
  },
  {
    messageId: 3,
    chatSessionId: 2,
    userInput: "What's a healthy meal for lunch?",
    messageTimestamp: "2022-12-07T10:00:00Z",
    aiInput: "How about a fresh chicken salad? Would you like a recipe?",
  },
  {
    messageId: 4,
    chatSessionId: 3,
    userInput: "I need a quick breakfast idea. Any suggestions?",
    messageTimestamp: "2022-12-08T08:00:00Z",
    aiInput: "Pancakes are a great option! Here's a recipe for fluffy pancakes...",
  }
];

export { users, recipes, chatSessions, messages };

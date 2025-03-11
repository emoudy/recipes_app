export type UserInterface  = {
	userId: string;
	name: string;
	email: string;
};

export type ChatSessionInterface  = {
	chatSessionId: string;
	chatSessionName: string;
	userId: string;
	createdAt: string; // ISO 8601 date-time string
	updatedAt: string; // ISO 8601 date-time string
};

export type MessageInterface  = {
  messageId: string;
  chatSessionId: string;
  userInput: string;
  aiInput: string;
  messageTimestamp: string; // ISO 8601 date-time string
};

export type RecipeInterface = {
  recipeId: string;
  userId: string;
  name: string;
  category: string;
  description: string;
  servings: number;
  prepTime: number; // In minutes
  cookTime: number; // In minutes
  createdAt: string; // YYYY-MM-DD format
  updatedAt: string; // YYYY-MM-DD format
  lastViewed: string; // YYYY-MM-DD format
};

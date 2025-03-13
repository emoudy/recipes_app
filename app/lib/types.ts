export type UserInterface  = {
	id: number;
	name: string;
	email: string;
};

export type ChatSessionInterface  = {
	id: number;
	name: string;
	userId: number;
	createdAt: Date; // YYYY-MM-DD format
	updatedAt: Date; // YYYY-MM-DD format
};

export type MessageInterface  = {
  id: number;
  chatSessionId: number;
  userQuery: string;
  aiResponse: string;
  messageTimestamp: Date; // ISO 8601 date-time string
};

export type RecipeInterface = {
  id: number;
  name: string;
  category: string;
  description: string;
  servings: number;
  prepTime: number; // In minutes
  cookTime: number; // In minutes
  createdAt: Date; // YYYY-MM-DD format
  updatedAt: Date; // YYYY-MM-DD format
  lastViewed: Date; // YYYY-MM-DD format
};

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

export interface RecipeInterface {
  id: number;
  name: string;
  category: string;
  description: string;
  ingredients: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string[];
  servings: number;
  prep_time: number;
  cook_time: number;
  created_at: string;
  updated_at: string;
  last_viewed: string;
}

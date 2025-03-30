export interface UserInterface {
	id: number;
	name: string;
	email: string;
};

export interface ChatSessionInterface {
	id: number;
	name: string;
	userId: number;
	createdAt?: Date; // YYYY-MM-DD format
	updatedAt?: Date; // YYYY-MM-DD format
};

export interface MessageInterface {
  id?: number;
  chatSessionId?: number;
  userQuery: string;
  aiResponse: string;
  timestamp?: Date; // ISO 8601 date-time string
};

export interface RecipeInterface {
  id?: number;
  name: string;
  category: string;
  description?: string;
  ingredients: {
    id?: number;
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions?: string[];
  servings?: number;
  prep_time?: number;
  cook_time?: number;
  created_at?: Date;
  updated_at?: Date;
  last_viewed?: Date;
}

export interface RecipeApiResponseInterface {
  recipes: RecipeInterface[];
  totalRecipes: number;
  hasNextPage: boolean;
}

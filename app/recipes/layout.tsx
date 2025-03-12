import RecipeMenu from "./components/RecipeMenu";
import { ReactNode } from "react";

export default function RecipesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Recipe Menu (Filters & Actions) */}
      <RecipeMenu />

      {/* Recipes Content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}

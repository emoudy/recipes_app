import RecipeMenu from "../components/RecipeMenu";
import RecipeList from "../components/RecipeList";

export default function RecipesPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Recipe Menu (Filters, Actions) */}
      <RecipeMenu />
      
      {/* Recipe List Section */}
      <div className="flex-1 overflow-y-auto">
        <RecipeList />
      </div>
    </div>
  );
}

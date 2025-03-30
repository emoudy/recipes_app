import Header from "@/ui/Header";
import { ReactNode } from "react";

export default function RecipesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
    	{/* Header */}
			<Header />

      {/* Recipes Content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}

export async function fetchChatSessions(userId: number) {
    const res = await fetch(`/api/chatsessions?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch chat sessions");
    return res.json();
  }
  
  export async function fetchMessages(chatSessionId: number) {
    const res = await fetch(`/api/messages?chatSessionId=${chatSessionId}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
  }
  
  export async function fetchRecipes(userId: number) {
    const res = await fetch(`/api/recipes?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json();
  }
  
  export async function saveRecipe(recipeData: any) {
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!res.ok) throw new Error("Failed to save recipe");
    return res.json();
  }
  
  export async function deleteRecipe(recipeId: number) {
    const res = await fetch(`/api/recipes/${recipeId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete recipe");
    return res.json();
  }
  
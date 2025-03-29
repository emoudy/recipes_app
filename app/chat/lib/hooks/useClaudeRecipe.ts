import { useState } from 'react';

export function useClaudeRecipe() {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async ( prompt: string, chatSessionId: number): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, chatSessionId }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      setRecipe(data.recipe);
      return data.recipe;
    } catch (err: any) {
      console.error(err);
      setError('Failed to generate recipe');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { recipe, generateRecipe, loading, error };
}

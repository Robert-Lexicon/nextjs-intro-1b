import { Recipe, RecipeResponse } from "../interfaces/recipe";

export async function fetchAllRecipes(limit = 8, skip = 0) {
  const response = await fetch(
    `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`
  );
  const { recipes, total }: RecipeResponse = await response.json();

  return { recipes, total };
}

export async function fetchRecipeById(id: string) {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
  const recipe: Recipe = await response.json();
  return recipe;
}

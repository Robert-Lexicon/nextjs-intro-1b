import { Recipe, RecipeResponse } from "../interfaces/recipe";

export async function fetchAllRecipes(skip: number = 0, limit: number = 0) {
  const response = await fetch(
    `https://dummyjson.com/recipes?skip=${skip}&limit=${limit}`
  );
  const { recipes }: RecipeResponse = await response.json();

  return recipes;
}

export async function fetchRecipeById(id: string) {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
  const recipe: Recipe = await response.json();
  return recipe;
}

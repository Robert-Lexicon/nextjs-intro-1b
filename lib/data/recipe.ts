import { Recipe, RecipeResponse } from "../interfaces";

export async function fetchAllRecipes() {
  const response = await fetch("https://dummyjson.com/recipes");
  const { recipes }: RecipeResponse = await response.json();

  return recipes;
}

export async function fetchAllRecipeById() {
  const response = await fetch("https://dummyjson.com/recipe/2");
  const recipe: Recipe = await response.json();

  return recipe;
}

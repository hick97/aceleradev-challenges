import { getRecipesByIngredients, getRecipesByName } from "./recipes";

describe("RecipesService", () => {
  test("getRecipesByName success", () => {
    const result = getRecipesByName();

    expect(result).toHaveLength(10);
  });

  test("getRecipesByIngredients success", () => {
    const result = getRecipesByIngredients();

    expect(result).toHaveLength(0);
  });
});

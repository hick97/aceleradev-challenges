import axios from "axios";
const API_PATH = "http://localhost:3030/api";

const getRecipesByIngredients = async (ingredients, page = 1) => {
  // TODO implementar método
  const obj = await axios.get(`${API_PATH}?i=${ingredients}&p=${page}`);
  const { results } = obj.data;
  return obj.data ? results : [];
};

const getRecipesByName = async (name = "", page = 1) => {
  // TODO implementar método
  const obj = await axios.get(`${API_PATH}?q=${name}&p=${page}`);
  const { results } = obj.data;

  return obj.data ? results : [];
};

export { getRecipesByIngredients, getRecipesByName };

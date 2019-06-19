import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RecipeItem from "./RecipeItem";
import { getRecipesByIngredients } from "../services/recipes";

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        thumbnail: "",
        title: "",
        ingredients: ""
      },
      similarsRecipes: []
    };
  }
  async componentDidMount() {
    const { recipe } = this.props;
    if (recipe !== undefined) {
      const recipes = await getRecipesByIngredients(recipe.ingredients);
      const similarsRecipes = recipes.slice(0, 4);

      this.setState({
        recipe: {
          thumbnail: recipe.thumbnail,
          title: recipe.title,
          ingredients: recipe.ingredients
        },
        similarsRecipes: similarsRecipes
      });
    }
  }

  render() {
    const { recipe, similarsRecipes } = this.state;
    const { thumbnail, title, ingredients } = recipe;

    return (
      <div>
        <img src={thumbnail} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <strong>Ingredients: </strong>
            {ingredients}
          </p>
          <h5 className="card-title">Similar recipes</h5>
          <div className="row">
            {similarsRecipes.map((r, index) => (
              <RecipeItem key={index} id={index} recipe={r} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RecipePage);

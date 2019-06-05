import React, { Fragment } from "react";
import PropTypes from "prop-types";

// TODO: Você deve verificar se a receita existe
const RecipePage = ({ recipe }) => (
  <div>
    {recipe ? (
      <Fragment>
        <img className="card-img-top img-fluid" src={recipe.thumbnail} alt="" />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">
            <strong>Ingredients: </strong>
            {recipe.ingredients}
          </p>
        </div>
      </Fragment>
    ) : (
      <div className="col-sm-12 mt-4">
        <h1>Recipe not found</h1>
      </div>
    )}
  </div>
);

RecipePage.propTypes = {
  recipe: PropTypes.object
};

export default RecipePage;

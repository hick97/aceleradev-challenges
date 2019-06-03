import React from "react";

const RecipeItem = ({
  thumbnail,
  title,
  ingredients,
  id,
  linkToRecipePage
}) => (
  <div
    className="RecipeItem col-sm-3 mt-4"
    onClick={() => linkToRecipePage(title, id)}
  >
    <div className="card">
      <img className="card-img-top img-fluid" src={thumbnail} alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          <strong>Ingredients: </strong>
          {ingredients}
        </p>
      </div>
    </div>
  </div>
);

export default RecipeItem;

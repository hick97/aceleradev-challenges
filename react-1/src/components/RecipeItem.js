import React from "react";
import PropTypes from "prop-types";

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

RecipeItem.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  ingredients: PropTypes.string,
  id: PropTypes.number,
  linkToRecipePage: PropTypes.func
};

export default RecipeItem;

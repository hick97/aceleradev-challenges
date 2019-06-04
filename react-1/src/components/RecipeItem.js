import React from "react";
import PropTypes from "prop-types";

const RecipeItem = ({ item, id, linkToRecipePage }) => (
  <div
    className="RecipeItem col-sm-3 mt-4"
    onClick={() => linkToRecipePage(item.title, id)}
  >
    <div className="card">
      <img className="card-img-top img-fluid" src={item.thumbnail} alt="" />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">
          <strong>Ingredients: </strong>
          {item.ingredients}
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

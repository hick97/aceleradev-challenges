import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { slugify } from "../helpers";

const RecipeItem = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <div className="RecipeItem col-sm-3 mt-4">
      <div className="card">
        <Link to={`/recipe/${slugify(item.title)}`}>
          <img className="card-img-top img-fluid" src={item.thumbnail} alt="" />
        </Link>
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
};

RecipeItem.propTypes = {
  item: PropTypes.object
};

export default RecipeItem;

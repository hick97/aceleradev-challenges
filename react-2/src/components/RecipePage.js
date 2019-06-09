import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CommentsBlock from "./CommentsBlock";

// TODO: Você deve verificar se a receita existe
const RecipePage = ({ recipes }) => (
  <div>
    {recipes ? (
      <Fragment>
        <img
          className="card-img-top img-fluid"
          src={recipes.thumbnail}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{recipes.title}</h5>
          <p className="card-text">
            <strong>Ingredients: </strong>
            {recipes.ingredients}
          </p>
        </div>
        <CommentsBlock />
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

import React from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";

const Home = ({ recipes = [], searchString = "", linkToRecipePage }) => (
  <div className="row">
    {recipes.map((r, index) => (
      <RecipeItem
        key={index}
        id={index}
        title={r.title}
        thumbnail={r.thumbnail}
        ingredients={r.ingredients}
        linkToRecipePage={linkToRecipePage}
      />
    ))}
  </div>
);

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default Home;

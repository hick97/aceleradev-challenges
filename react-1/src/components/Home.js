import React from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";

const Home = ({ recipes = [], searchString = "", linkToRecipePage }) => (
  <div className="row">
    {recipes.map((r, index) => (
      <RecipeItem
        key={index}
        id={index}
        item={r}
        linkToRecipePage={linkToRecipePage}
      />
    ))}
  </div>
);

Home.propTypes = {
  linkToRecipePage: PropTypes.func,
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default Home;

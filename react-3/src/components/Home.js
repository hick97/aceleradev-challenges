import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipeItem from "./RecipeItem";
import { getRecipesByName } from "../services/recipes";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      recipes: [],
      page: 1
    };
  }
  async componentDidMount() {
    const { searchString: recipeName } = this.props;
    await this.handlePage(recipeName);
    this.setState({
      searchString: recipeName
    });
  }
  handlePage = async (recipeName, page = 1) => {
    const results = await getRecipesByName(recipeName, page);

    this.setState({
      recipes: results
    });
  };

  handleNextAndPreviousPage = (page, e) => {
    e.preventDefault();

    this.setState(s => {
      var value = s.page + page;
      if (value < 1) {
        value = 1;
      }
      this.handlePage(s.searchString, value);
      return { page: value };
    });
  };

  render() {
    const { recipes } = this.state;
    return (
      <div>
        <div className="row">
          {recipes.map((r, index) => (
            <RecipeItem key={index} id={index} recipe={r} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  onClick={this.handleNextAndPreviousPage.bind(this, -1)}
                  id="prev"
                  className="page-link"
                  href="#"
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={this.handleNextAndPreviousPage.bind(this, 1)}
                  id="next"
                  className="page-link"
                  href="#"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  searchString: PropTypes.string,
  recipes: PropTypes.array
};

export default Home;

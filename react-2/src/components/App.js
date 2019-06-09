import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import RecipePage from "./RecipePage";
import Login from "./Login";
import User from "./User";
import { slugify } from "../helpers";
import recipes from "../sample_data/recipes.json";

const HomeRoute = ({ match, recipes, searchString }) => (
  <Home recipes={recipes} searchString={searchString} />
);
const RecipePageRoute = ({ recipe }) => <RecipePage recipes={recipe} />;
const LoginRoute = () => <Login />;
const ProfileRoute = () => <User />;

class App extends Component {
  state = {
    searchString: "",
    recipes: [],
    recipe: {}
  };
  componentDidMount() {
    const { pathname } = this.props.history.location;

    if (pathname.indexOf("/recipe/") >= 0) {
      const t = pathname.replace("/recipe/", "");
      const result = this.handleLinkToRecipePage(t);

      this.setState({
        recipe: result
      });
    } else if (pathname !== "/") {
      const keySearch = pathname
        .match(/[a-zA-Z]+/g)
        .join(" ")
        .toLowerCase();

      let rec = this.filterRecipes(keySearch);
      this.setState({
        recipes: rec,
        searchString: keySearch
      });
    } else {
      this.setState({
        recipes: recipes.results
      });
    }
  }
  componentWillReceiveProps() {
    const { pathname } = this.props.history.location;

    if (pathname.indexOf("/recipe/") >= 0) {
      const t = pathname.replace("/recipe/", "");
      const result = this.handleLinkToRecipePage(t);

      this.setState({
        recipe: result
      });
    }
  }
  filterRecipes = keySearch => {
    const initialRecipes = recipes.results;
    const ks = keySearch.toLowerCase();

    let result = initialRecipes.filter(item => {
      let { title, ingredients } = item;
      return (
        title.toLowerCase().search(ks) !== -1 ||
        ingredients.toLowerCase().search(ks) !== -1
      );
    });

    return result;
  };

  handleInputChange = async keySearch => {
    this.props.history.push(`/${keySearch}`);
    let rec = this.filterRecipes(keySearch);
    await this.setState({
      searchString: keySearch,
      recipe: {},
      recipes: rec
    });
    if (this.state.recipes.length === 0) {
      this.props.history.push(`/recipe/inexistent`);
    }
  };

  handleLinkToRecipePage = keySearch => {
    const initialRecipes = recipes.results;
    let result = initialRecipes.filter(item => {
      let { title } = item;
      return slugify(title.toLowerCase()).search(keySearch) !== -1;
    });

    return result[0];
  };
  render() {
    return (
      <div className="App">
        <Navbar
          searchString={this.state.searchString}
          inputChange={this.handleInputChange}
        />

        <div className="container mt-10">
          <Route path="/user/login" component={LoginRoute} />
          <Route path="/user/profile" component={ProfileRoute} />
          <Route
            path="/"
            exact
            component={props => (
              <HomeRoute
                searchString={this.state.searchString}
                recipes={this.state.recipes}
              />
            )}
          />
          <Route
            path="/:searchString"
            exact
            component={props => (
              <HomeRoute
                searchString={this.state.searchString}
                recipes={this.state.recipes}
              />
            )}
          />
          <Route
            path="/recipe/:recipeSlug"
            component={props => <RecipePageRoute recipe={this.state.recipe} />}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);

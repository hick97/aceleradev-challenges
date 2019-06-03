import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import RecipePage from "./RecipePage";
import { slugify } from "../helpers";
import recipes from "../sample_data/recipes.json";

class App extends Component {
  state = {
    searchString: "",
    recipes: [],
    recipe: {}
  };
  async componentDidMount() {
    const { pathname } = this.props.location;

    if (pathname !== "/") {
      const initialRecipes = recipes.results;
      const keySearch = pathname
        .match(/[a-zA-Z]+/g)
        .join(" ")
        .toLowerCase();
      await this.setState({
        recipes: initialRecipes.filter(item => {
          let { title } = item;
          return title.toLowerCase().search(keySearch) !== -1;
        }),
        searchString: keySearch
      });
      if (this.state.recipes.length === 0) {
        this.props.history.push(`/recipe/inexistent`);
      }
    } else {
      this.setState({
        recipes: recipes.results
      });
    }
  }

  handleInputChange = e => {
    const initialRecipes = recipes.results;
    this.setState(
      {
        searchString: e.target.value,
        recipe: {},
        recipes: initialRecipes.filter(item => {
          let { title } = item;
          return (
            title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
          );
        })
      },
      () => {
        if (this.state.recipes.length === 0) {
          this.props.history.push(`/recipe/inexistent`);
        } else {
          this.props.history.push(`/${this.state.searchString}`);
        }
      }
    );
  };
  handleLinkToRecipePage = async (title, id) => {
    const t = await slugify(title);
    const r = this.state.recipes[id];

    this.setState({
      recipe: r
    });

    this.props.history.push(`recipe/${t}`);
  };
  render() {
    return (
      <div className="App">
        {/* TODO: Navbar precisa receber a string da URL */}
        <Navbar
          searchString={this.state.searchString}
          inputChange={this.handleInputChange}
        />
        )}/>
        <div className="container mt-10">
          {/* TODO: Implementar rotas  */}
          <Route
            path="/"
            exact={true}
            component={props => (
              <Home
                {...props}
                searchString={this.state.searchString}
                recipes={this.state.recipes}
                linkToRecipePage={this.handleLinkToRecipePage}
              />
            )}
          />
          <Route
            path="/:searchString"
            name="searchString"
            exact={true}
            component={props => (
              <Home
                {...props}
                searchString={this.state.searchString}
                recipes={this.state.recipes}
                linkToRecipePage={this.handleLinkToRecipePage}
              />
            )}
          />
          <Route
            path="/recipe/:recipe"
            name="recipe"
            exact={true}
            render={props => (
              <RecipePage {...props} recipe={this.state.recipe} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);

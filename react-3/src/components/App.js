import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import RecipePage from "./RecipePage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const HomeRoute = ({ match }) => (
      <Home searchString={match.params.searchString} />
    );

    const RecipePageRoute = props => (
      <RecipePage
        recipe={
          props.location.state !== undefined
            ? props.location.state.recipe
            : props.history.push("/search/")
        }
      />
    );

    return (
      <div className="App">
        <Route
          exact
          path="/search/:searchString?"
          children={({ match }) => (
            <Navbar
              searchString={match ? match.params.searchString || "" : ""}
            />
          )}
        />

        <div className="container mt-10">
          <Switch>
            <Route exact path="/recipe" component={RecipePageRoute} />
            <Route path="/search/:searchString?" component={HomeRoute} />
            <Redirect to="/search" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

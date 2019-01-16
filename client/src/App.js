import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import postRecipe from "./pages/postRecipe";
import Recipe from "./pages/recipe";
import privateRecipes from "./pages/privateRecipes";
import privateRecipe from "./pages/privateRecipe";


function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Home} />
          <Route exact path="/postRecipe" component={postRecipe} />
          <Route exact path="/recipes/:id" component={Recipe} />
          <Route exact path="/userRecipes/:userID" component={privateRecipes} />
          <Route exact path="/users/:userID/recipes/:recipeID" component={privateRecipe} />
          <Route component={Home} />
        </Switch>
    </Router>
  );
}

export default App;

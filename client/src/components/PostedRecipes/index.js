import React from "react";
import { Link } from "react-router-dom";
import "./postedRecipes.css";

function PostedRecipes(props) {

    const recipeCards = props.recipes.map(recipe => (
        <div className="card" key={recipe._id}>
        <Link to={"/recipes/" + recipe._id}>
            <h3 className="name">{recipe.name}</h3>
            </Link>
            {recipe.otherSite ? <p className="creator">{recipe.creator}</p> : <p className="creator">By {recipe.creator}</p>}
            <hr />
            <p className="cooktime">Takes {recipe.cooktime}</p>
            <p className="description">Description: {recipe.description}</p>
        </div>
    ))


    return (
        <div className="postedRecipes">
        <div className="top">
            <h3 className="title">Latest Recipes:</h3>
            <Link to={"/postRecipe"}>
                    <button className="btn btn-success toRecipePost">Post a Recipe</button>
                </Link>
                </div>
                {recipeCards}
        </div>
    );
}

export default PostedRecipes;
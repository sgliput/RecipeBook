import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import RecipeForm from "../components/RecipeForm";

class postRecipe extends Component {
    state = {

    }

    render() {
        return (
            <div>
            <Header />
            <br />
            <RecipeForm />
            </div>
        )

    }


}

export default postRecipe;
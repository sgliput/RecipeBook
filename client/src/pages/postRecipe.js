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
                <Link to={"/"}>
                    <button className="btn btn-info toHome">Home Page</button>
                </Link>
                <br />
                <RecipeForm />
            </div>
        )

    }


}

export default postRecipe;
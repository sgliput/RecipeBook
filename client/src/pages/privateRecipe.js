import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PrivateRecipeSpec from "../components/PrivateRecipeSpec";


class PrivateRecipe extends Component {
    state = {
        recipeID: this.props.match.params.recipeID
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
                <PrivateRecipeSpec recipeID={this.state.recipeID} />
            </div>
        );
    }
};

export default PrivateRecipe;
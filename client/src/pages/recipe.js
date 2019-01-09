import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import RecipeSpec from "../components/RecipeSpec";


class Recipe extends Component {
    state = {
        params: this.props.match.params.id
    }



    render() {
        return (
            <div>
                <Header />
                <br />
                <RecipeSpec params={this.state.params} />
            </div>
        );
    }
};

export default Recipe;
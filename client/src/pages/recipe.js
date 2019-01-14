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
                <Link to={"/"}>
                    <button className="btn btn-info toHome">Home Page</button>
                </Link>
                <br />
                <RecipeSpec params={this.state.params} />
            </div>
        );
    }
};

export default Recipe;
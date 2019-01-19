import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RecipeSpec from "../components/RecipeSpec";


class Recipe extends Component {
    state = {
        params: this.props.match.params.id,
        userID: ""
    }

    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        console.log(userID);
        this.setState({ userID });
    }


    render() {
        return (
            <div>
                <Header />
                <br />
                <Navbar userID={this.state.userID} />
                <RecipeSpec params={this.state.params} />
            </div>
        );
    }
};

export default Recipe;
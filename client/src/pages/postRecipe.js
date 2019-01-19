import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RecipeForm from "../components/RecipeForm";

class postRecipe extends Component {
    state = {
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
                <br />
                <RecipeForm />
            </div>
        )

    }


}

export default postRecipe;
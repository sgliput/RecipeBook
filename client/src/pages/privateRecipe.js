import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PrivateRecipeSpec from "../components/PrivateRecipeSpec";


class PrivateRecipe extends Component {
    state = {
        recipeID: this.props.match.params.recipeID,
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
                <PrivateRecipeSpec recipeID={this.state.recipeID} />
            </div>
        );
    }
};

export default PrivateRecipe;
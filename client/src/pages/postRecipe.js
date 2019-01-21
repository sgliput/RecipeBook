import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import RecipeForm from "../components/RecipeForm";

class postRecipe extends Component {
    state = {
        userID: "",
        userName: ""
    }

    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        this.setState({ userID, userName });
    }

    render() {
        return (
            <div>
                <Header />
                <br />
                {this.state.userName ? <Drawer userName={this.state.userName} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <RecipeForm />
            </div>
        )

    }


}

export default postRecipe;
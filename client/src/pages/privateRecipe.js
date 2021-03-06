import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import PrivateRecipeSpec from "../components/PrivateRecipeSpec";


class PrivateRecipe extends Component {
    state = {
        recipeID: this.props.match.params.recipeID,
        userID: "",
        userName: ""
    }
    
     //Immediately stores userName and userID in state
    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        this.setState({ userID, userName });
    }

    //Allows the user to log out (which directs back to the home page)
    logout = () => {
        this.setState({ userID: "", userName: ""});
        sessionStorage.setItem("userID", "");
        sessionStorage.setItem("userName", "");
    }

    //This is the page for displaying a specific private recipe
    render() {
        return (
            <div>
                <Header />
                {/* Drawer only appears if the user is logged in */}
                {this.state.userName ? <Drawer userName={this.state.userName} logout={this.logout} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <PrivateRecipeSpec recipeID={this.state.recipeID} />
            </div>
        );
    }
};

export default PrivateRecipe;
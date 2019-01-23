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
    
    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        this.setState({ userID, userName });
    }

    logout = () => {
        this.setState({ userID: "", userName: ""});
        sessionStorage.setItem("userID", "");
        sessionStorage.setItem("userName", "");
    }


    render() {
        return (
            <div>
                <Header />
                <br />
                {this.state.userName ? <Drawer userName={this.state.userName} logout={this.logout} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <PrivateRecipeSpec recipeID={this.state.recipeID} />
            </div>
        );
    }
};

export default PrivateRecipe;
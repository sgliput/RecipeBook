import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import RecipeForm from "../components/RecipeForm";

class postRecipe extends Component {
    state = {
        userID: "",
        userName: "",
        addModal: "none",
        addedRecipe: ""
    }

    //Immediately stores userName and userID in state
    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        this.setState({ userID, userName });
    }

    //Displays the addModal showing the recipe just added
    showAddModal = id => {
        this.setState({
            addModal: "block",
            addedRecipe: id
        });
    }

    //Closes add modal
    closeModal = () => {
        this.setState({addModal: "none"});
    }

    //Allows the user to log out (which directs back to the home page)
    logout = () => {
        this.setState({ userID: "", userName: ""});
        sessionStorage.setItem("userID", "");
        sessionStorage.setItem("userName", "");
    }

    //This is the page for the Recipe Form and submitting new recipes
    render() {
        return (
            <div>
                <Header />
                {/* Drawer only appears if the user is logged in */}
                {this.state.userName ? <Drawer userName={this.state.userName} logout={this.logout} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <RecipeForm addedRecipe={this.state.addedRecipe} showAddModal={this.showAddModal} addModal={this.state.addModal} closeModal={this.closeModal} />
            </div>
        )

    }


}

export default postRecipe;
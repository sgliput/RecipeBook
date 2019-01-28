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

    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        this.setState({ userID, userName });
    }

    showAddModal = id => {
        this.setState({
            addModal: "block",
            addedRecipe: id
        });
    }

    closeModal = () => {
        this.setState({addModal: "none"});
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
                
                {this.state.userName ? <Drawer userName={this.state.userName} logout={this.logout} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <RecipeForm addedRecipe={this.state.addedRecipe} showAddModal={this.showAddModal} addModal={this.state.addModal} closeModal={this.closeModal} />
            </div>
        )

    }


}

export default postRecipe;
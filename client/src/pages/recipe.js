import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import RecipeSpec from "../components/RecipeSpec";


class Recipe extends Component {
    state = {
        params: this.props.match.params.id,
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

    //This is the page for displaying a specific public recipe
    render() {
        return (
            <div>
                <Header />
                {/* Drawer only appears if the user is logged in */}
                {this.state.userName ? <Drawer userName={this.state.userName} logout={this.logout} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <RecipeSpec params={this.state.params} />
            </div>
        );
    }
};

export default Recipe;
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
               
                {this.state.userName ? <Drawer userName={this.state.userName} logout={this.logout} /> : ""}
                <Navbar userID={this.state.userID} />
                <br />
                <RecipeSpec params={this.state.params} />
            </div>
        );
    }
};

export default Recipe;
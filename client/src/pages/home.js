import React, { Component } from "react";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";
import Header from "../components/Header";
import PostedRecipes from "../components/PostedRecipes";
import SignInHome from "../components/SignInHome";
import "./home.css";

class Home extends Component {
    state = {
        recipes: [],
        signInModal: "none",
        logInModal: "none",
        deleteModal: "none",
        userID: "",
        recipeToRemove: ""
    }

    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        console.log(userID);
        API.getRecipes()
            .then(res => {
                console.log(res.data);
                this.setState({ 
                    recipes: res.data,
                    userID
                });

            })
    }

    showSignInModal = () => {
        this.setState({signInModal: "block"});
    }

    showLogInModal = () => {
        this.setState({logInModal: "block"});
    }

    showDeleteModal = id => {
        this.setState({deleteModal: "block"});
        this.setState({recipeToRemove: id});
    }

    //Handles hiding modal when its X is clicked
    closeModal = () => {
        const userID = sessionStorage.getItem("userID");
        this.setState({ 
            signInModal: "none",
            logInModal: "none",
            deleteModal: "none",
            userID });       
    }


    removeFromPublic = id => {
        console.log(id);
        API.updateRecipe(id, {public: false, deleted: true})
        .then(dbRecipe => {
            console.log(dbRecipe);
            API.getRecipes()
            .then(res => {
                console.log(res.data);
                this.setState({ 
                    recipes: res.data,
                    deleteModal: "none"
                });

            })
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Header />
                <br />
                <Container className="mainContainer">
                    <Row>
                        <Col size="md-6 sm-12">
                            <SignInHome showSignInModal={this.showSignInModal} showLogInModal={this.showLogInModal} signInModal={this.state.signInModal} logInModal={this.state.logInModal} closeModal={this.closeModal} />
                            <br />

                        </Col>
                        <Col size="md-6 sm-12">
                            <PostedRecipes recipes={this.state.recipes} userID={this.state.userID} removeFromPublic={this.removeFromPublic} recipeToRemove={this.state.recipeToRemove} showDeleteModal={this.showDeleteModal} deleteModal={this.state.deleteModal} closeModal={this.closeModal}  />
                            
                        </Col>
                        <br />

                    </Row>
                </Container>
            </div>
        )

    }


}

export default Home;
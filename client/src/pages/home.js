import React, { Component } from "react";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PostedRecipes from "../components/PostedRecipes";

import Drawer from "../components/Drawer";
import Collapsible from "../components/Collapsible";
import "./home.css";

class Home extends Component {
    state = {
        recipes: [],
        signInModal: "none",
        logInModal: "none",
        deleteModal: "none",
        userID: "",
        userName: "",
        recipeToRemove: "",
        searchTerms: "",
        searched: "",
        home: "home",
        currentTag: ""
    }

    componentDidMount() {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        API.getRecipes()
            .then(res => {
                console.log(res.data);
                this.setState({
                    recipes: res.data,
                    userID,
                    userName
                });

            })
    }

    handleSearchChange = event => {
        //Changes this.state.searchTerms to the content of the input box
        this.setState({
            searchTerms: event.target.value
        });
        console.log(this.state.searchTerms);
    };

    onSearch = () => {
        console.log("Search Terms: " + this.state.searchTerms);
        API.searchRecipes(this.state.searchTerms)
            .then(dbRecipes => {
                console.log(dbRecipes.data);
                this.setState({
                    recipes: dbRecipes.data,
                    searched: "searched",
                    currentTag: ""
                })
            })
    }

    tagSearch = text => {
        console.log("Tag: " + text);
        API.searchRecipesByTag(text)
            .then(dbRecipes => {
                console.log(dbRecipes.data);
                this.setState({
                    recipes: dbRecipes.data,
                    searched: "searched",
                    currentTag: text
                })
            })
    }

    getAllRecipes = () => {
        API.getRecipes()
            .then(res => {
                console.log(res.data);
                this.setState({
                    recipes: res.data,
                    searched: "",
                    currentTag: ""
                });
            })
    }


    showSignInModal = () => {
        this.setState({ signInModal: "block" });
    }

    showLogInModal = () => {
        this.setState({ logInModal: "block" });
    }

    showDeleteModal = id => {
        this.setState({ deleteModal: "block" });
        this.setState({ recipeToRemove: id });
    }

    //Handles hiding modal when its X is clicked
    closeModal = () => {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        this.setState({
            signInModal: "none",
            logInModal: "none",
            deleteModal: "none",
            userID,
            userName
        });
    }


    removeFromPublic = id => {
        console.log(id);
        API.updateRecipe(id, { public: false, deleted: true })
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
                <Navbar userID={this.state.userID} handleSearchChange={this.handleSearchChange} searchTerms={this.state.searchTerms} onSearch={this.onSearch} getAllRecipes={this.getAllRecipes} home="home" searched={this.state.searched} />
                {this.state.userName ? <Drawer userName={this.state.userName} home={this.state.home} tagSearch={this.tagSearch} /> : ""}
                <Container className="mainContainer">
                    <Row>
                        <Col size="md-6 sm-12">
                            <Collapsible showSignInModal={this.showSignInModal} showLogInModal={this.showLogInModal} signInModal={this.state.signInModal} logInModal={this.state.logInModal} closeModal={this.closeModal} />
                            <br />
                            <p className="rbIntro"><strong>Recipe Book</strong> is the one place you can keep all of your favorite recipes and share them with the world. Here, you can view and search recipes others have posted and, once signed in, save them to your personal <strong>Recipe Book</strong>, where you can edit them as you wish.</p>
                            <p className="rbIntro">You can even import recipes from sites like Food Network, Pinterest, Epicurious, and AllRecipes and add them to your private collection.</p>
                            <p className="rbIntro">And of course, if you have any family favorites or special creations of your own, you can post them publicly and let other readers enjoy them too.</p>
                            <p className="rbIntro">With <strong>Recipe Book</strong>, it's easier than ever to store your favorite recipes at the tip of your fingers.</p>

                        </Col>
                        <Col size="md-6 sm-12">
                            <PostedRecipes recipes={this.state.recipes} userID={this.state.userID} removeFromPublic={this.removeFromPublic} recipeToRemove={this.state.recipeToRemove} showDeleteModal={this.showDeleteModal} deleteModal={this.state.deleteModal} closeModal={this.closeModal} home={this.state.home} currentTag={this.state.currentTag} />

                        </Col>
                        <br />

                    </Row>
                </Container>
            </div>
        )

    }


}

export default Home;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import RecipeBook from "../components/RecipeBook";
import API from "../utils/API";

class privateRecipes extends Component {
    state = {
        userID: this.props.match.params.userID,
        recipes: [],
        loggedInUserID: "",
        userName: "",
        privateSearchTerms: "",
        searched: "",
        deleteModal: "none",
        chartModal: "none",
        recipeToRemove: "",
        currentTag: ""
    }

      //Immediately stores userName and userID in state
    componentDidMount() {
        this.setState({ 
            loggedInUserID: sessionStorage.getItem('userID'),
            userName: sessionStorage.getItem("userName")
        });
        console.log("UserID: " + this.state.userID);

        //Retrieve the user's data with their userID and stores the user's private recipes in state
        API.getUserByID(this.state.userID)
            .then(res => {
                console.log(res.data.recipes);
                this.setState({ recipes: res.data.recipes });
            })
            .catch(err => console.log(err));
    }

    handlePrivateSearchChange = event => {
        //Changes this.state.privateSearchTerms to the content of the input box
        this.setState({
            privateSearchTerms: event.target.value
        });
        console.log(this.state.privateSearchTerms);
    };

    //Searches recipes based on search terms, and stores what is returned to this.state.recipes
    onPrivateSearch = () => {
        console.log("Search Terms: " + this.state.privateSearchTerms);
        API.searchPrivateRecipes(this.state.userID, this.state.privateSearchTerms)
            .then(dbRecipes => {
                console.log(dbRecipes.data);
                this.setState({
                    recipes: dbRecipes.data,
                    searched: "searched",
                    currentTag: ""
                })
            })
    }

    //Searches recipes based on a specific tag, and stores what is returned to this.state.recipes
    privateTagSearch = text => {
        console.log("Tag: " + text);
        API.searchPrivateRecipesByTag(this.state.userID, text)
            .then(dbRecipes => {
                console.log(dbRecipes.data);
                this.setState({
                    recipes: dbRecipes.data,
                    searched: "searched",
                    currentTag: text
                })
            })
    }

    //Retrieves all private recipes (for the ALL button in the search field)
    getAllRecipes = () => {
        API.getUserByID(this.state.userID)
            .then(res => {
                this.setState({
                    recipes: res.data.recipes,
                    searched: "",
                    currentTag: ""
                });
            })
            .catch(err => console.log(err));
    }

    //Shows delete modal
    showDeleteModal = id => {
        this.setState({deleteModal: "block"});
        this.setState({recipeToRemove: id});
    }

    //Shows chart modal
    showChartModal = () => {
        this.setState({ chartModal: "block" });
    }

    //Closes all modals
    closeModal = () => {
        this.setState({ deleteModal: "none", chartModal: "none"});       
    }

    //Allows the user to log out (which directs back to the home page)
    logout = () => {
        this.setState({ userID: "", userName: ""});
        sessionStorage.setItem("userID", "");
        sessionStorage.setItem("userName", "");
    }

    deleteUserRecipe = id => {
        console.log("ID: " + id);
        //Gets the recipe data to delete
        API.getRecipe(id)
            .then(dbRecipe => {
                console.log("This is the recipe.");
                console.log(dbRecipe);
                //If the recipe is public, its ID will be deleted from the user's private recipes array
                if (dbRecipe.data.public === true) {
                    API.deleteUserRecipe(this.state.loggedInUserID, id)
                        .then(dbUser => {
                            console.log("Deleted from array");
                            console.log(dbUser);
                            //And their Recipe Book will be updated, hiding the delete modal
                            API.getUserByID(this.state.userID)
                                .then(res => {
                                    console.log(res.data.recipes);
                                    this.setState({ 
                                        recipes: res.data.recipes,
                                        deleteModal: "none"
                                    });
                                })
                                .catch(err => console.log(err));
                        })
                    //If the recipe is private, meaning it's been scraped by the user or edited to make it the user's own (a whole separate record)
                } else {
                    //The recipe is deleted from the database
                    API.deleteRecipe(id)
                        .then(dbRecipe => {
                            console.log("Deleted whole recipe");
                            console.log(dbRecipe);
                            //The recipe's id is deleted from the user's private recipes array
                            API.deleteUserRecipe(this.state.loggedInUserID, id)
                                .then(dbUser => {
                                    console.log("Deleted from user's array");
                                    console.log(dbUser);
                                    //And their Recipe Book is updated accordingly, hiding the delete modal
                                    API.getUserByID(this.state.loggedInUserID)
                                        .then(res => {
                                            console.log(res.data.recipes);
                                            this.setState({ 
                                                recipes: res.data.recipes,
                                                deleteModal: "none"
                                            });
                                        })
                                }).catch(err => console.log(err));
                        })
                }

            })
    }

    //This is the page for displaying the user's private Recipe Book
    render() {
        return (
            <div>
                <Header />
             {/* Drawer only appears if the user is logged in */}
                {this.state.userName ? <Drawer userName={this.state.userName} tagSearch={this.privateTagSearch} home="private" logout={this.logout} chartModal={this.state.chartModal} showChartModal={this.showChartModal} closeModal={this.closeModal} /> : ""}

                <Navbar userID={this.state.userID} handlePrivateSearchChange={this.handlePrivateSearchChange} privateSearchTerms={this.state.privateSearchTerms} onPrivateSearch={this.onPrivateSearch} getAllRecipes={this.getAllRecipes} private="private" withSearch="withSearch" searched={this.state.searched} />
                
                <RecipeBook userID={this.state.userID} recipes={this.state.recipes} deleteUserRecipe={this.deleteUserRecipe} recipeToRemove={this.state.recipeToRemove} showDeleteModal={this.showDeleteModal} deleteModal={this.state.deleteModal} closeModal={this.closeModal} currentTag={this.state.currentTag} searched={this.state.searched} />
            </div >
        );
    }
};

export default privateRecipes;
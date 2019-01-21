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
        recipeToRemove: "",
        currentTag: ""
    }

    componentDidMount() {
        this.setState({ 
            loggedInUserID: sessionStorage.getItem('userID'),
            userName: sessionStorage.getItem("userName")
        });
        console.log("UserID: " + this.state.userID);

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

    showDeleteModal = id => {
        this.setState({deleteModal: "block"});
        this.setState({recipeToRemove: id});
    }

    closeModal = () => {
        this.setState({ deleteModal: "none"});       
    }

    deleteUserRecipe = id => {
        console.log("ID: " + id);
        //Gets the recipe data to delete
        API.getRecipe(id)
            .then(dbRecipe => {
                console.log("This is the recipe.");
                console.log(dbRecipe);
                //If the recipe is public, it's ID will be deleted from the user's private recipes array
                if (dbRecipe.data.public === true) {
                    API.deleteUserRecipe(this.state.loggedInUserID, id)
                        .then(dbUser => {
                            console.log("Deleted from array");
                            console.log(dbUser);
                            //And their Recipe Book will be updated
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
                                    //And their Recipe Book is updated accordingly
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

    // db.getCollection('users').update(
    //     { _id: ObjectId("5c37f9b4358f962f9829a1b6") },
    //     { $pull: { 'recipes': ObjectId("5c3ac273b23037148cf7cbc7") } }
    //   );
    //onClick={() => props.deleteUserRecipe(recipe._id)}



    render() {
        return (
            <div>
                <Header />
                <br />
                {this.state.userName ? <Drawer userName={this.state.userName} tagSearch={this.privateTagSearch} private="private" /> : ""}
                <Navbar userID={this.state.userID} handlePrivateSearchChange={this.handlePrivateSearchChange} privateSearchTerms={this.state.privateSearchTerms} onPrivateSearch={this.onPrivateSearch} getAllRecipes={this.getAllRecipes} private="private" searched={this.state.searched} />
                <RecipeBook userID={this.state.userID} recipes={this.state.recipes} deleteUserRecipe={this.deleteUserRecipe} recipeToRemove={this.state.recipeToRemove} showDeleteModal={this.showDeleteModal} deleteModal={this.state.deleteModal} closeModal={this.closeModal} currentTag={this.state.currentTag} />
            </div >
        );
    }
};

export default privateRecipes;
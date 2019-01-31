import React, { Component } from "react";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PostedRecipes from "../components/PostedRecipes";
import Drawer from "../components/Drawer";
import Collapsible from "../components/Collapsible";
import Collapsible2 from "../components/Collapsible2";
import Card from '@material-ui/core/Card';
import "./home.css";

class Home extends Component {
    state = {
        recipes: [],
        signInModal: "none",
        logInModal: "none",
        deleteModal: "none",
        chartModal: "none",
        userID: "",
        userName: "",
        recipeToRemove: "",
        searchTerms: "",
        searched: "",
        home: "home",
        currentTag: "",
        recipeFives: {},
        iterator: 0,
        openCollapse: false
    }

    componentDidMount() {
        //Retrieves userID and userName from sessionStorage
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        //Gets all public recipes
        API.getRecipes()
            .then(res => {
                console.log(res.data);

                let a = res.data;
                const recipeFives = {};
                let iterator = 0;
                //Divides all the recipes into fives, storing them all in an object of arrays
                while (a.length > 5) {
                    recipeFives[iterator] = a.splice(0, 5);
                    iterator++;
                }
                //After counting by fives, adds whatever is left to the end of the object
                recipeFives[iterator] = a;
                console.log("This is a");
                console.log(a);
                console.log("Recipe recipeFives");
                console.log(recipeFives);
                //Stores the object of fives in state, setting recipes to the first array (so the first five recipes will be displayed first)
                //Storing the lastIterator is to indicate the end of the object when progressing through the fives
                this.setState({
                    recipes: recipeFives[0],
                    recipeFives,
                    lastIterator: iterator,
                    userID,
                    userName
                });

            })
    }

    //Function for displaying the next five recipes, which progresses to the next array in the recipeFives object
    nextFive = () => {
        const recipeFives = this.state.recipeFives;
        let iterator = this.state.iterator;
        iterator++;
        this.setState({
            recipes: recipeFives[iterator],
            iterator
        })
    }

    //Function for displaying the previous five recipes, which backtracks to the previous array in the recipeFives object
    prevFive = () => {
        const recipeFives = this.state.recipeFives;
        let iterator = this.state.iterator;
        iterator--;
        this.setState({
            recipes: recipeFives[iterator],
            iterator
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
        //Retrieves recipes that match the search terms
        API.searchRecipes(this.state.searchTerms)
            .then(dbRecipes => {
                console.log(dbRecipes.data);

                let a = dbRecipes.data;
                const recipeFives = {};
                let iterator = 0;
                //Divides all the recipes into fives, storing them all in an object of arrays
                while (a.length > 5) {
                    recipeFives[iterator] = a.splice(0, 5);
                    iterator++;
                }
                //After counting by fives, adds whatever is left to the end of the object
                recipeFives[iterator] = a;
                console.log("This is a");
                console.log(a);
                console.log("Recipe recipeFives");
                console.log(recipeFives);
                //Stores the object of fives in state, setting recipes to the first array (so the first five recipes will be displayed first)
                //Storing the lastIterator is to indicate the end of the object when progressing through the fives
                this.setState({
                    recipes: recipeFives[0],
                    recipeFives,
                    lastIterator: iterator,
                    iterator: 0,
                    searched: "searched",
                    currentTag: ""
                })
            })
    }

    tagSearch = text => {
        console.log("Tag: " + text);
        //Retrieves recipes that include the selected tag
        API.searchRecipesByTag(text)
            .then(dbRecipes => {
                console.log(dbRecipes.data);

                let a = dbRecipes.data;
                const recipeFives = {};
                let iterator = 0;
                //Divides all the recipes into fives, storing them all in an object of arrays
                while (a.length > 5) {
                    recipeFives[iterator] = a.splice(0, 5);
                    iterator++;
                }
                //After counting by fives, adds whatever is left to the end of the object
                recipeFives[iterator] = a;
                console.log("This is a");
                console.log(a);
                console.log("Recipe recipeFives");
                console.log(recipeFives);
                //Stores the object of fives in state, setting recipes to the first array (so the first five recipes will be displayed first)
                //Storing the lastIterator is to indicate the end of the object when progressing through the fives
                this.setState({
                    recipes: recipeFives[0],
                    recipeFives,
                    lastIterator: iterator,
                    iterator: 0,
                    searched: "searched",
                    currentTag: text
                })
            })
    }

    getAllRecipes = () => {
        //Gets all public recipes; this is used to get all recipes again after performing a search
        API.getRecipes()
            .then(res => {
                console.log(res.data);
                //Performs the same division as above, dividing the recipes into fives and storing them in the recipeFives object
                let a = res.data;
                const recipeFives = {};
                let iterator = 0;
                while (a.length > 5) {
                    recipeFives[iterator] = a.splice(0, 5);
                    iterator++;
                }
                recipeFives[iterator] = a;
                console.log("This is a");
                console.log(a);
                console.log("Recipe recipeFives");
                console.log(recipeFives);

                //Stores the object of fives in state, setting recipes to the first array (so the first five recipes will be displayed first); also clears the search field
                this.setState({
                    recipes: recipeFives[0],
                    recipeFives,
                    lastIterator: iterator,
                    iterator: 0,
                    searched: "",
                    currentTag: "",
                    searchTerms: ""
                });

            })
    }

    //Displays the sign-in modal for new users
    showSignInModal = () => {
        this.setState({ signInModal: "block" });
    }

    //Displays the log-in modal for returning users
    showLogInModal = () => {
        this.setState({ logInModal: "block" });
    }

    //Displays the delete modal for deleting a recipe
    showDeleteModal = id => {
        this.setState({
            deleteModal: "block",
            recipeToRemove: id
        });
    }

    //Displays the chart modal for showing a pie chart of the tags
    showChartModal = () => {
        this.setState({ chartModal: "block" });
    }

    //Handles hiding modal when its X is clicked; also closes the sign-in expansion panel
    closeModal = () => {
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        this.setState({
            signInModal: "none",
            logInModal: "none",
            deleteModal: "none",
            chartModal: "none",
            userID,
            userName,
            openCollapse: false
        });
    }

    //Opens and closes the sign-in expansion panel
    changePanel = () => {
        if (this.state.openCollapse) {
            this.setState({ openCollapse: false });
        } else {
            this.setState({ openCollapse: true });
        }
    }

    //Handles user logout, removing the currect user from state and sessionStorage
    logout = () => {
        this.setState({ userID: "", userName: "" });
        sessionStorage.setItem("userID", "");
        sessionStorage.setItem("userName", "");
    }

    //Function for deleting a recipe on the home page, or more specifically changing it from public to private
    removeFromPublic = id => {
        console.log(id);
        API.updateRecipe(id, { public: false, deleted: true })
            .then(dbRecipe => {
                console.log(dbRecipe);
                //Retrieves updated public recipes
                API.getRecipes()
                    .then(res => {
                        console.log(res.data);

                        //Performs the same division as above, dividing the recipes into fives and storing them in the recipeFives object
                        let a = res.data;
                        const recipeFives = {};
                        let iterator = 0;
                        while (a.length > 5) {
                            recipeFives[iterator] = a.splice(0, 5);
                            iterator++;
                        }
                        recipeFives[iterator] = a;
                        console.log("This is a");
                        
                        console.log("Recipe recipeFives");
                        console.log(recipeFives);

                        //Stores the object of fives in state, setting recipes to the first array (so the first five recipes will be displayed first); also closes the delete modal
                        this.setState({
                            recipes: recipeFives[0],
                            recipeFives,
                            lastIterator: iterator,
                            deleteModal: "none"
                        })
                    })

            })
            .catch(err => console.log(err));
    }

    //This is the home page
    render() {
        return (
            <div>
                <Header />

                <Navbar userID={this.state.userID} handleSearchChange={this.handleSearchChange} searchTerms={this.state.searchTerms} onSearch={this.onSearch} getAllRecipes={this.getAllRecipes} home="home" withSearch="withSearch" searched={this.state.searched} />

                {/* Displays drawer is user is logged in */}
                {this.state.userName ? <Drawer userName={this.state.userName} home={this.state.home} tagSearch={this.tagSearch} logout={this.logout} chartModal={this.state.chartModal} showChartModal={this.showChartModal} closeModal={this.closeModal} /> : ""}
                < br />
                <Container className="homeContainer">
                    <Row>
                        <Col size="md-6 sm-12">
                            <Card id="signInCard">
                                {!this.state.userID ? (
                                <Collapsible showSignInModal={this.showSignInModal} showLogInModal={this.showLogInModal} signInModal={this.state.signInModal} logInModal={this.state.logInModal} closeModal={this.closeModal} changePanel={this.changePanel} openCollapse={this.state.openCollapse} />
                                ) : ""}

                                {/* Displays expansion panel with user tips only if user is logged in */}
                                {this.state.userID ? (
                                    <Collapsible2 />
                                ) : ""}
                                <br />
                                <p className="rbIntro"><strong>Recipe Book</strong> is the one place you can keep all of your favorite recipes and share them with the world. Here, you can view and search recipes others have posted and, once signed in, save them to your personal <strong>Recipe Book</strong>, where you can edit them as you wish.</p>
                                <p className="rbIntro">You can even import recipes from sites like Food Network, Yummly, Epicurious, and AllRecipes and add them to your private collection.</p>
                                <p className="rbIntro">And of course, if you have any family favorites or special creations of your own, you can compile them in your own private culinary treasury or post them publicly and let other readers enjoy them too.</p>
                                <p className="rbIntro">With <strong>Recipe Book</strong>, it's easier than ever to store your favorite recipes at the tip of your fingers.</p>

                            </Card>
                        </Col>
                        <Col size="md-6 sm-12">
                            <Card id="publicRecipesCard">
                                <PostedRecipes recipes={this.state.recipes} userID={this.state.userID} removeFromPublic={this.removeFromPublic} recipeToRemove={this.state.recipeToRemove} showDeleteModal={this.showDeleteModal} deleteModal={this.state.deleteModal} closeModal={this.closeModal} home={this.state.home} currentTag={this.state.currentTag} recipeFives={this.state.recipeFives} iterator={this.state.iterator} lastIterator={this.state.lastIterator} nextFive={this.nextFive} prevFive={this.prevFive} />
                            </Card>
                        </Col>
                        <br />
                    </Row>
                </Container>
            </div >
        )

    }


}

export default Home;
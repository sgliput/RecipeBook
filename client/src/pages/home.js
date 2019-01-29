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
        const userID = sessionStorage.getItem("userID");
        const userName = sessionStorage.getItem("userName");
        console.log(userID);
        API.getRecipes()
            .then(res => {
                console.log(res.data);

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

                this.setState({
                    recipes: recipeFives[0],
                    recipeFives,
                    lastIterator: iterator,
                    userID,
                    userName
                });

            })
    }

    nextFive = () => {
        const recipeFives = this.state.recipeFives;
        let iterator = this.state.iterator;
        iterator++;
        this.setState({
            recipes: recipeFives[iterator],
            iterator
        })
    }

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

                this.setState({
                    recipes: recipeFives[0],
                    recipeFives,
                    lastIterator: iterator,
                    searched: "",
                    currentTag: "",
                    searchTerms: ""
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
        this.setState({
            deleteModal: "block",
            recipeToRemove: id
        });
    }

    showChartModal = () => {
        this.setState({ chartModal: "block" });
    }

    //Handles hiding modal when its X is clicked
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

    changePanel = () => {
        if (this.state.openCollapse) {
            this.setState({ openCollapse: false });
        } else {
            this.setState({ openCollapse: true });
        }
    }

    logout = () => {
        this.setState({ userID: "", userName: "" });
        sessionStorage.setItem("userID", "");
        sessionStorage.setItem("userName", "");
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

                <Navbar userID={this.state.userID} handleSearchChange={this.handleSearchChange} searchTerms={this.state.searchTerms} onSearch={this.onSearch} getAllRecipes={this.getAllRecipes} home="home" withSearch="withSearch" searched={this.state.searched} />
                {this.state.userName ? <Drawer userName={this.state.userName} home={this.state.home} tagSearch={this.tagSearch} logout={this.logout} chartModal={this.state.chartModal} showChartModal={this.showChartModal} closeModal={this.closeModal} /> : ""}
                <br />
                <Container className="homeContainer">
                    <Row>
                        <Col size="md-6 sm-12">
                            <Card id="signInCard">
                                <Collapsible showSignInModal={this.showSignInModal} showLogInModal={this.showLogInModal} signInModal={this.state.signInModal} logInModal={this.state.logInModal} closeModal={this.closeModal} changePanel={this.changePanel} openCollapse={this.state.openCollapse} />
                                
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
            </div>
        )

    }


}

export default Home;
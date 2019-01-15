import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import RecipeBook from "../components/RecipeBook";
import API from "../utils/API";

class privateRecipes extends Component {
    state = {
        params: this.props.match.params.id,
        recipes: [],
        loggedInUserID: ""
    }

    componentDidMount() {
        this.setState({ loggedInUserID: sessionStorage.getItem('userID') });
        console.log("Param: " + this.state.params);
        API.getUserByID(this.state.params)
            .then(res => {
                console.log(res.data.recipes);
                this.setState({ recipes: res.data.recipes });
            })
            .catch(err => console.log(err));
    }

    deleteUserRecipe = id => {
        console.log("ID: " + id);
        API.deleteUserRecipe(this.state.loggedInUserID, id)
            .then(dbUser => {
                console.log(dbUser);
                API.getUserByID(this.state.params)
                    .then(res => {
                        console.log(res.data.recipes);
                        this.setState({ recipes: res.data.recipes });
                    })
                    .catch(err => console.log(err));
            })

    }

    // db.getCollection('users').update(
    //     { _id: ObjectId("5c37f9b4358f962f9829a1b6") },
    //     { $pull: { 'recipes': ObjectId("5c3ac273b23037148cf7cbc7") } }
    //   );



    render() {
        return (
            <div>
                <Header />
                <br />
                <Link to={"/"}>
                    <button className="btn btn-info toHome">Home Page</button>
                </Link>
                <br />
                <RecipeBook params={this.state.params} recipes={this.state.recipes} deleteUserRecipe={this.deleteUserRecipe} />
            </div >
        );
    }
};

export default privateRecipes;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import "./recipeSpec.css";

class RecipeSpec extends Component {
    state = {
        recipeData: {},
        ingredients: [],
        directions: [],
        key1: 0,
        key2: 100
    }

    componentDidMount() {
        API.getRecipe(this.props.params)
            .then(res => {
                console.log(res.data);
                this.setState({ recipeData: res.data });
                this.getIngredientList();
                this.getDirectionsList();
            })
    }

    getIngredientList(){
        const upkey1 = () => {
            this.setState({key1: this.state.key1 + 1});
            return this.state.key1;
        }

    const ingArray = Object.values(this.state.recipeData.ingredients);
    const ingredients = ingArray.map(ingredient => (
        <li key={upkey1()}>{ingredient}</li>
    ));
    this.setState({ingredients});
    };

    getDirectionsList(){
        const upkey2 = () => {
            this.setState({key2: this.state.key2 + 1});
            return this.state.key2;
        }

        const dirArray = Object.values(this.state.recipeData.directions);
        const directions = dirArray.map(step => (
            <li key={upkey2()}>{step}</li>
        ));
        this.setState({directions});
        }

    render() {
        return (
            <Container>

                <h2>{this.state.recipeData.name}</h2>
                <p>{this.state.recipeData.creator}</p>
                <p>Takes {this.state.recipeData.cooktime}</p>
                <p>{this.state.recipeData.description}</p>
                <ul>
                    {this.state.ingredients}
                </ul>
                <br />
                <ul>
                    {this.state.directions}
                </ul>

            </Container>




        )
    }


};

export default RecipeSpec;
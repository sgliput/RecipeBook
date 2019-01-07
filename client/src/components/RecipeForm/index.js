import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import IngredientFields from "../IngredientFields";
import DirectionFields from "../DirectionFields";
import API from "../../utils/API";
import "./recipeForm.css";

// This file exports the SearchForm component

class RecipeForm extends Component {
    state = {
        recipeName: "",
        name: "",
        cooktime: "",
        description: "",
        ingredients: [],
        direction: []
    }

    handleRecipeNameChange = event => {
        //Changes this.state.recipeName to the content of the input box
        this.setState({
            recipeName: event.target.value
        });
        console.log("Recipe Name: " + this.state.recipeName);
    };

    handleNameChange = event => {
        //Changes this.state.name to the content of the input box
        this.setState({
            name: event.target.value
        });
        console.log("User Name: " + this.state.name);
    };

    handleCooktimeChange = event => {
        //Changes this.state.cooktime to the content of the input box
        this.setState({
            cooktime: event.target.value
        });
        console.log("Cook Time: " + this.state.cooktime);
    };

    handleDescriptionChange = event => {
        //Changes this.state.description to the content of the input box
        this.setState({
            description: event.target.value
        });
        console.log("Description: " + this.state.description);
    };



    handleSubmit = event => {
        event.preventDefault();
        const recipeName = this.state.recipeName;
        const userName = this.state.name;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        const fullRecipe = {
            name: recipeName,
            creator: userName,
            cooktime: cooktime,
            description: description
        };
        API.saveRecipe(fullRecipe)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));

    }

    render() {
        return (
            <Container>
                <section className="recipeForm">
                    <Row>
                        <h3>Input Your Recipe Below</h3>
                    </Row>

                    <div className="form-group">
                        <Row>
                            <Col size="md-4">
                                <label>Name of Recipe:</label>
                                <input className="form-control recipeNameField" onChange={this.handleRecipeNameChange} />
                                <br />
                                <label>Your Name:</label>
                                <input className="form-control nameField" onChange={this.handleNameChange} />
                                <br />
                                <label>Cook Time:</label>
                                <input className="form-control cooktimeField" onChange={this.handleCooktimeChange} />
                                <br />
                                <label>Description:</label>
                                <textarea className="form-control descriptionField" rows="3"  onChange={this.handleDescriptionChange} />
                                <br />
                            </Col>
                            <Col size="md-4">
                                <IngredientFields />
                            </Col>
                            <Col size="md-4">
                                <DirectionFields />
                            </Col>
                        </Row>
                        <Row>
                            <br />
                            <button className="btn btn-success submit" onClick={this.handleSubmit}>Submit</button>
                        </Row>
                    </div>
                </section>

            </Container>
        );
    };
}

export default RecipeForm;
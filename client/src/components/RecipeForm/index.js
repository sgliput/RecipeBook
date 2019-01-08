import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import IngredientFields from "../IngredientFields";
import IngChangeFunctions from "../IngredientFields/changeFunctions";
import DirectionFields from "../DirectionFields";
import DirChangeFunctions from "../DirectionFields/changeFunctions";
import API from "../../utils/API";
import "./recipeForm.css";

// This file exports the SearchForm component

class RecipeForm extends Component {
    state = {
        recipeName: "",
        name: "",
        cooktime: "",
        description: "",
        ingredients: {},
        IngNumberOfFields: 1,
        IngAddedFields:-1,
        directions: {},
        DirNumberOfFields: 1,
        DirAddedFields: -1
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

    ///////  Ingredient Fields Column  ////////////////////////

    Ingredient1Change = event => {
        const value = event.target.value;
        const ingrs = this.state.ingredients;
        ingrs.ingredient1 = value;

        //Changes this.state.ingredients to the current ingredients object
        this.setState({
            ingredients: ingrs
        });
        console.log("Ingredient 1: " + this.state.ingredient1);
        console.log(this.state.ingredients);
    };

    IngFields = [
        <div id="ingredient1" key="1">
            <label>Ingredient 1:</label>
            <input className="form-control ingredient1Field" rows="3" value={this.state.ingredients.ingredient1} onChange={this.Ingredient1Change} />
            <br />
        </div>
    ]

    addIngredient = () => {
        const newID = "ingredient" + (this.state.IngNumberOfFields + 1);
        const newFieldClass = "ingredient" + (this.state.IngNumberOfFields + 1) + "Field form-control";
        const addedFields = this.state.IngAddedFields + 1;
        const onChange = (event) => {        
            this.setState(IngChangeFunctions[addedFields](event, this.state));
        }

        this.IngFields.push(
        <div id = {newID} key={this.state.IngNumberOfFields + 1}>
        <label>Ingredient {this.state.IngNumberOfFields + 1}:</label>
        <br />
        <input className={newFieldClass} rows="3" value={this.state.ingredients[newID]} onChange={onChange} />
        <br />
        </div>);
        this.setState({
            IngNumberOfFields: this.state.IngNumberOfFields + 1,
            IngAddedFields: this.state.IngAddedFields + 1
        });
    }

     ///////  Direction Fields Column  ////////////////////////

     Step1Change = event => {
        const value = event.target.value;
        const steps = this.state.directions;
        steps.step1 = value;

        //Changes this.state.ingredient1 to the content of the input box
        this.setState({
            directions: steps
        });
        console.log(this.state.directions);
    };

    DirFields = [
        <div id="step1" key="1">
            <label>Step 1:</label>
            <textarea className="form-control step1Field" rows="3" value={this.state.directions.step1} onChange={this.Step1Change} />
            <br />
        </div>
    ]

    addStep = event => {
        const newID = "step" + (this.state.DirNumberOfFields + 1);
        const newFieldClass = "step" + (this.state.DirNumberOfFields + 1) + "Field form-control";
        const addedFields = this.state.DirAddedFields + 1;
        const onChange = (event) => {        
            this.setState(DirChangeFunctions[addedFields](event, this.state));
        }

        this.DirFields.push(
        <div id = {newID} key={this.state.DirNumberOfFields + 1}>
        <label>Step {this.state.DirNumberOfFields + 1}:</label>
        <br />
        <textarea className={newFieldClass} rows="3" value={this.state.directions[newID]} onChange={onChange} />
        <br />
        </div>);
        this.setState({
            DirNumberOfFields: this.state.DirNumberOfFields + 1,
            DirAddedFields: this.state.DirAddedFields + 1
        });
        console.log(this.state.directions);
       
    }

    ///////////////////////////////////////////

    handleSubmit = event => {
        event.preventDefault();
        const recipeName = this.state.recipeName;
        const userName = this.state.name;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        const ingredients = this.state.ingredients;
        const directions = this.state.directions;
        const fullRecipe = {
            name: recipeName,
            creator: userName,
            cooktime: cooktime,
            description: description,
            ingredients: ingredients,
            directions: directions
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
                                <IngredientFields addIngredient={this.addIngredient} IngFields={this.IngFields} />
                            </Col>
                            <Col size="md-4">
                                <DirectionFields addStep={this.addStep} DirFields={this.DirFields} />
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
import React, { Component } from "react";
import changeFunctions from "./changeFunctions";
//import { Col, Row, Container } from "../Grid";
//import "./ingredientField.css";

// This file exports the SearchForm component

class IngredientFields extends Component {
    state = {
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
        ingredient4: "",
        ingredient5: "",
        numberOfFields: 3,
        addedFields:-1,
        changeFunctions: changeFunctions
    }


    Ingredient1Change = event => {
        //Changes this.state.ingredient1 to the content of the input box
        this.setState({
            ingredient1: event.target.value
        });
        console.log("Ingredient 1: " + this.state.ingredient1);
    };

    Ingredient2Change = event => {
        //Changes this.state.ingredient2 to the content of the input box
        this.setState({
            ingredient2: event.target.value
        });
        console.log("Ingredient 2: " + this.state.ingredient2);
    };

    Ingredient3Change = event => {
        //Changes this.state.ingredient3 to the content of the input box
        this.setState({
            ingredient3: event.target.value
        });
        console.log("Ingredients 3: " + this.state.ingredient3);
    };

    addIngredient = () => {
        const newID = "ingredient" + (this.state.numberOfFields + 1);
        const newFieldClass = "ingredient" + (this.state.numberOfFields + 1) + "Field form-control";
        const addedFields = this.state.addedFields + 1;
        const onChange = (event) => {        
            this.setState(this.state.changeFunctions[addedFields](event));
        }

        this.fields.push(
        <div id = {newID} key={this.state.numberOfFields + 1}>
        <label>Ingredient {this.state.numberOfFields + 1}:</label>
        <br />
        <input className={newFieldClass} rows="3" onChange={onChange} />
        <br />
        </div>);
        this.setState({
            numberOfFields: this.state.numberOfFields + 1,
            addedFields: this.state.addedFields + 1
        });
        console.log("ingredient4: " + this.state.ingredient4);
        console.log("ingredient5: " + this.state.ingredient5);
    }

    fields = [
        <div id="ingredient1" key="1">
            <label>Ingredient 1:</label>
            <input className="form-control ingredient1Field" rows="3" onChange={this.Ingredient1Change} />
            <br />
        </div>,
        <div id="ingredient2" key="2">
            <label>Ingredient 2:</label>
            <input className="form-control ingredient2Field" rows="3" onChange={this.Ingredient2Change} />
            <br />
        </div>,
        <div id="ingredient3" key="3">
            <label>Ingredient 3:</label>
            <input className="form-control ingredient3Field" rows="3" onChange={this.Ingredient3Change} />
            <br />
        </div>
    ]


    render() {
        return (
            <div>
            <div id="ingredients">
                {this.fields}
            </div>
            <br />
            <button className="btn btn-info addIngredient" onClick={this.addIngredient}>Add an Ingredient</button>
        </div>
        );
    };
}

export default IngredientFields;
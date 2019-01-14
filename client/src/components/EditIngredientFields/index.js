import React, { Component } from "react";

//import { Col, Row, Container } from "../Grid";
//import "./ingredientField.css";

// This file exports the EditIngredientFields component

class EditIngredientFields extends Component {
    state = {
    
    };

    addField = () => {
        this.props.addIngredient();
        this.forceUpdate();
    }


render(){
    return(
        <div>
    <div id="ingredients">
        {this.props.ingredients.map((ingr, index) =>
    <div id={"ingredient" + index + "Div"} key={index}>
        <label>Ingredient {index + 1}:</label>
        <input className="form-control ingredient" id={"ingredient" + index} value={this.props.ingredients[index]} onChange={this.props.IngredientChange} />
        <br />
    </div>
)}
    </div>
    <br />
    <button className="btn btn-info addIngredient" onClick={this.addField}>Add an Ingredient</button>
    </div >
    );
  }
}

export default EditIngredientFields;
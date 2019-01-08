import React from "react";

//import { Col, Row, Container } from "../Grid";
//import "./ingredientField.css";

// This file exports the IngredientFields component

function IngredientFields(props) {
    return (
        <div>
        <div id="ingredients">
            {props.IngFields}
        </div>
        <br />
        <button className="btn btn-info addIngredient" onClick={props.addIngredient}>Add an Ingredient</button>
    </div>
    );
  }

export default IngredientFields;
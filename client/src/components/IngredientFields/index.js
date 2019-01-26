import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

// This file exports the IngredientFields component

function IngredientFields(props) {
    return (
        <div>
            <div id="ingredients">
                {props.IngFields}
            </div>
            <br />
            <Tooltip title="Add an Ingredient">  
                    <IconButton className="addIngredient" onClick={props.addIngredient}>
                        <AddCircleIcon />
                    </IconButton>
            </Tooltip>
            {/* <button className="btn btn-info addIngredient" onClick={props.addIngredient}>Add an Ingredient</button> */}
        </div>
    );
}

export default IngredientFields;
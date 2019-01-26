import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';


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
    <Tooltip title="Add an Ingredient">  
                    <IconButton className="addIngredient" onClick={this.addField}>
                        <AddCircleIcon />
                    </IconButton>
            </Tooltip>
    </div >
    );
  }
}

export default EditIngredientFields;
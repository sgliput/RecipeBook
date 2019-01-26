import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

// This file exports the EditDirectionFields component

class EditDirectionFields extends Component {
    state = {
    
    };

    addField = () => {
        this.props.addStep();
        this.forceUpdate();
    }


render(){
    return(
        <div>
    <div id="steps">
        {this.props.directions.map((ingr, index) =>
    <div id={"step" + index + "Div"} key={index}>
        <label>Step {index + 1}:</label>
        <textarea autofocus="autofocus" className="form-control step" id={"step" + index} rows="5" value={this.props.directions[index]} onChange={this.props.StepChange} />
        <br />
    </div>
)}
    </div>
    <br />
    <Tooltip title="Add a Step">  
                    <IconButton className="addStep" onClick={this.addField}>
                        <AddCircleIcon />
                    </IconButton>
            </Tooltip>
    </div >
    );
  }
}

export default EditDirectionFields;
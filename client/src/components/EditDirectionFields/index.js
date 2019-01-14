import React, { Component } from "react";

//import { Col, Row, Container } from "../Grid";
//import "./stepField.css";

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
        <textarea className="form-control step" id={"step" + index} rows="5" value={this.props.directions[index]} onChange={this.props.StepChange} />
        <br />
    </div>
)}
    </div>
    <br />
    <button className="btn btn-info addStep" onClick={this.addField}>Add a Step</button>
    </div >
    );
  }
}

export default EditDirectionFields;
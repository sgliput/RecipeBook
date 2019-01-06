import React, { Component } from "react";
//import { Col, Row, Container } from "../Grid";
import "./directionFields.css";

// This file exports the SearchForm component

class DirectionFields extends Component {
    state = {
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        numberOfFields: 3,
        addedFields: 0,
    }

    Step1Change = event => {
        //Changes this.state.step1 to the content of the input box
        this.setState({
            step1: event.target.value
        });
        console.log("Step 1: " + this.state.step1);
    };

    Step2Change = event => {
        //Changes this.state.step2 to the content of the input box
        this.setState({
            step2: event.target.value
        });
        console.log("Step 2: " + this.state.step2);
    };

    Step3Change = event => {
        //Changes this.state.step3 to the content of the input box
        this.setState({
            step3: event.target.value
        });
        console.log("Step 3: " + this.state.step3);
    };

    Step4Change = event => {
        //Changes this.state.step4 to the content of the input box
        
        this.setState({
            step4: event.target.value
        });
        console.log("Step 4: " + this.state.step4);
    };

    Step5Change = event => {
        //Changes this.state.step5 to the content of the input box
        
        this.setState({
            step5: event.target.value
        });
        console.log("Step 5: " + this.state.step5);
    };

    changeFunctions = [
        this.Step4Change,
        this.Step5Change
    ];


    addStep = event => {
        const newID = "step" + (this.state.numberOfFields + 1);
        const newFieldClass = "step" + (this.state.numberOfFields + 1) + "Field form-control";

        this.fields.push(
        <div id = {newID} key={this.state.numberOfFields + 1}>
        <label>Step {this.state.numberOfFields + 1}:</label>
        <br />
        <textarea className={newFieldClass} rows="3" onChange={this.changeFunctions[this.state.addedFields]} />
        <br />
        </div>);
        this.setState({
            numberOfFields: this.state.numberOfFields + 1,
            addedFields: this.state.addedFields + 1
        });
    }

    fields = [
        <div id="step1" key="1">
            <label>Step 1:</label>
            <textarea className="form-control step1Field" rows="3" onChange={this.Step1Change} />
            <br />
        </div>,
        <div id="step2" key="2">
            <label>Step 2:</label>
            <textarea className="form-control step2Field" rows="3" onChange={this.Step2Change} />
            <br />
        </div>,
        <div id="step3" key="3">
            <label>Steps 3:</label>
            <textarea className="form-control step3Field" rows="3" onChange={this.Step3Change} />
            <br />
        </div>
    ]



    render() {
        return (
            <div>
                <div id="steps">
                    {this.fields}
                </div>
                <br />
                <button className="btn btn-info addStep" onClick={this.addStep}>Add a Step</button>
            </div>
        );
    };
}

export default DirectionFields;
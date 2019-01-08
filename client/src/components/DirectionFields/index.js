import React from "react";
import "./directionFields.css";

// This file exports the DirectionFields component

function DirectionFields(props) {
        return (
            <div>
                <div id="steps">
                    {props.DirFields}
                </div>
                <br />
                <button className="btn btn-info addStep" onClick={props.addStep}>Add a Step</button>
            </div>
        );
    };

export default DirectionFields;
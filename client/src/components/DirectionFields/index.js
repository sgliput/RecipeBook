import React from "react";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import "./directionFields.css";

// This file exports the DirectionFields component

function DirectionFields(props) {
        return (
            <div>
                <div id="steps">
                    {props.DirFields}
                </div>
                <br />
                <Tooltip title="Add a Step">  
                    <IconButton className="addStep" onClick={props.addStep}>
                        <AddCircleIcon />
                    </IconButton>
            </Tooltip>
            </div>
        );
    };

export default DirectionFields;
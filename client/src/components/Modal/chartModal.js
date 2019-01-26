import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import TagChart from '../Chart';
import "./modal.css";


class ChartModal extends Component {
    state = {
        show: this.props.show
    }
    render() {
        return (
            <div id="chartModal" className="modal" style={{ display: `${this.props.show}` }}>

                <div className="modal-content">
                    <div className="md-content">
                    <span className="close" onClick={this.props.closeModal}>&times;</span>
                        <TagChart show={this.props.show} />

                    </div>
                </div>

            </div>
        );
    }
}


export default ChartModal;
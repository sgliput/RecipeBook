import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import "./modal.css";


class AddModal extends Component {
    state = {
        recipeData: "",
        show: this.props.show
    }

    componentDidMount() {
        console.log("Data");
        console.log(this.state.recipeData);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.show !== prevProps.show) {
            console.log(this.state.recipeData);
            if (this.props.show === "block") {
                API.getRecipe(this.props.addedRecipe)
                    .then(res => {
                        console.log("Hello!");
                        console.log(res.data);
                        this.setState({ recipeData: res.data });
                        console.log(this.state.recipeData);
                    });
            }

        }
    }

    render() {
        return (
            <div id="addModal" className="modal" style={{ display: `${this.props.show}` }}>

                <div className="modal-content">
                    <div className="md-content">

                        {this.state.recipeData !== undefined ? (
                            <div className="modal-body addModal-body">

                                <span className="close" onClick={this.props.closeModal}>&times;</span>
                                <h3>You added a recipe!</h3>
                                <br />
                                
                                <h4 className="addTitle">{this.state.recipeData.name}</h4>
                                <p className="addCreator">{this.state.recipeData.source === "Pinterest" ? "From Pinterest" : this.state.recipeData.otherSite ? this.state.recipeData.creator : `By ${this.state.recipeData.creator}`}</p>
                                
                                {this.state.recipeData.imgLink ? (
                                    <img className="addModalImg" alt={this.state.recipeData.name} src={this.state.recipeData.imgLink} />
                                ) : ""}
                                <br />
                                <br />
                                {this.state.recipeData.cooktime ? <p className="addCooktime">Takes {this.state.recipeData.cooktime}</p> : ""}
                                {this.state.recipeData.description ? <p className="addDescription">Description: {this.state.recipeData.description}</p> : ""}
                                <br />
                                <Link to={"/userRecipes/" + this.props.userID}>
                                        <button className="btn addRecipeBtn">Go to Your Recipe Book</button> 
                                </Link>
                            </div>
                        ) : ""}

                    </div>
                </div>

            </div>
        );
    }
}


export default AddModal;
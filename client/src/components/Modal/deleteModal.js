import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import "./modal.css";


class DeleteModal extends Component {
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
                API.getRecipe(this.props.recipeToRemove)
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
            <div id="deleteModal" className="modal" style={{ display: `${this.props.show}` }}>

                <div className="modal-content">
                    <div className="md-content">

                        {this.state.recipeData !== undefined ? (
                            <div className="modal-body deleteModal-body">

                                <span className="close" onClick={this.props.closeModal}>&times;</span>
                                {this.props.home ? (
                                    <h3 className="deleteModalQ">As the original poster, you can remove your recipe from being public.</h3>
                                ) : ""}
                                {this.props.home ? (
                                    <h3>Do you want to delete it from the home page?</h3>
                                ) : (
                                        <h3>Do you want to delete this recipe from your Recipe Book?</h3>
                                    )}
                                <br />
                                
                                <h4 className="deleteTitle">{this.state.recipeData.name}</h4>
                                <p className="deleteCreator">{this.state.recipeData.source === "Pinterest" ? "From Pinterest" : this.state.recipeData.otherSite ? this.state.recipeData.creator : this.state.recipeData.creator ? `By ${this.state.recipeData.creator}` : "By Anonymous (a.k.a. You)"}</p>
                                
                                {this.state.recipeData.imgLink ? (
                                    <img className="deleteModalImg" alt={this.state.recipeData.name} src={this.state.recipeData.imgLink} />
                                ) : ""}
                                <br />
                                <br />
                                {this.state.recipeData.cooktime ? <p className="deleteCooktime">Takes {this.state.recipeData.cooktime}</p> : ""}
                                {this.state.recipeData.description ? <p className="deleteDescription">Description: {this.state.recipeData.description}</p> : ""}
                                <br />
                                {this.props.home ? (
                                    <button className="btn btn-danger deleteRecipeBtn" onClick={() => this.props.removeFromPublic(this.state.recipeData._id)}>Delete</button>
                                ) : (
                                        <button className="btn btn-danger deleteRecipeBtn" onClick={() => this.props.deleteUserRecipe(this.state.recipeData._id)}>Delete</button>
                                    )}

                            </div>
                        ) : ""}

                    </div>
                </div>

            </div>
        );
    }
}


export default DeleteModal;
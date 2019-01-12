import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import "./recipeSpec.css";

class RecipeSpec extends Component {
    state = {
        recipeData: {},
        ingredients: [],
        directions: [],
        key1: 0,
        key2: 100
    }

    componentDidMount() {
        API.getRecipe(this.props.params)
            .then(res => {
                console.log(res.data);
                this.setState({ recipeData: res.data });
                this.getIngredientList();
                this.getDirectionsList();
            })
    }

    getIngredientList() {
        const upkey1 = () => {
            this.setState({ key1: this.state.key1 + 1 });
            return this.state.key1;
        }

        const ingArray = Object.values(this.state.recipeData.ingredients);
        const ingredients = ingArray.map(ingredient => (
            <li key={upkey1()}>{ingredient}</li>
        ));
        this.setState({ ingredients });
    };

    getDirectionsList() {
        const upkey2 = () => {
            this.setState({ key2: this.state.key2 + 1 });
            return this.state.key2;
        }
        if (this.state.recipeData.directions) {
            const dirArray = Object.values(this.state.recipeData.directions);
            const directions = dirArray.map(step => (
                <li key={upkey2()}>{step}</li>
            ));
            this.setState({ directions });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                <button className="btn btn-info editBtn">Edit Recipe</button>
                </Row>
                
                <h2 className="specRecipeName">{this.state.recipeData.name}</h2>
                {this.state.recipeData.source === "Pinterest" ? <p>From <a href={this.state.recipeData.creator} target="blank">Pinterest</a></p> : this.state.recipeData.otherSite ? <p className="specCreator">{this.state.recipeData.creator}</p> : <p className="specCreator">Posted by {this.state.recipeData.creator}</p>}
                {this.state.recipeData.link ? <a href={this.state.recipeData.link} target="blank"><p className="origin">See Source</p></a> : ""}
                {this.state.recipeData.cooktime ? <p className="specCooktime">Takes {this.state.recipeData.cooktime}</p> : ""}
                <p className="specDescription">{this.state.recipeData.description}</p>
                
                <Row className="underline">
                    <Col size="md-4 sm-12">
                        <ul className="specIngredientList">
                            {this.state.ingredients}
                        </ul>
                        <br />
                    </Col>
                    <Col size="md-7 sm-12">
                        {this.state.recipeData.directions ? (
                        <ol className="specDirectionList">
                            {this.state.directions}
                        </ol>
                        ) : <h3 className="noDirections">See source for directions</h3>}
                        <br />
                    </Col>
                </Row>
            </Container>




        )
    }


};

export default RecipeSpec;
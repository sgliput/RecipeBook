import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import DeleteModal from "../Modal/deleteModal";
import "./recipeBook.css";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


function RecipeBook(props) {

    const recipeCards = props.recipes.map((recipe, index) => (
        <div className="col-md-4 col-sm-6 cardCol">
            <Card>
                <CardContent>
            {/* <div className="card" key={recipe._id}> */}
                <Row>
                    <Col size="md-11" id="recipeNameCol">
                        <Link to={"/users/" + props.userID + "/recipes/" + recipe._id}>
                            <h3 className="name">{recipe.name}</h3>
                        </Link>
                    </Col>
                    <Col size="md-1" id="xCol">
                        <span className="deleteRecipePrivate" data-id={recipe._id} onClick={() => props.showDeleteModal(recipe._id)}>&times;</span>
                    </Col>
                </Row>
                <br />
                <p className="creator">{recipe.edited ? "Original: " : ""}{recipe.source === "Pinterest" && !recipe.edited ? "From Pinterest" : recipe.source === "Pinterest" && recipe.edited ? "Pinterest" : recipe.otherSite ? recipe.creator : recipe.creatorID === props.userID ? "By You" : `By ${recipe.creator}`}</p>
                <hr />
                {recipe.cooktime ? <p className="cooktime">Takes {recipe.cooktime}</p> : ""}
            {/* </div> */}
            </CardContent>
            </Card>
        </div>
    ))

    return (
        <div className="recipeBook">
            <div className="top">
                <Container className="topArea">
                    <Row>
                        <Col size="md-8">
                            <h3 className="title">Your Recipes:</h3>
                        </Col>
                        <Col size="md-4">
                            <Link to={"/postRecipe"}>
                                <button className="btn btn-success toRecipePostFromPrivate">Post a Recipe</button>
                            </Link>
                        </Col>
                    </Row>
                </Container>

            </div>

            {recipeCards[0] === undefined ? (
                <Container className="mainContainer">
                    <Row>
                        <h3 className="startPosting">Start posting to fill your own personal Recipe Book!</h3>
                    </Row>
                </Container>
            ) : (
                    <Container className="mainComponent">
                        <Row>
                            {recipeCards}
                        </Row>
                        <br />
                    </Container>

                )}
                <DeleteModal recipeToRemove={props.recipeToRemove} show={props.deleteModal} closeModal={props.closeModal} deleteUserRecipe={props.deleteUserRecipe} />
        </div >
    );
}

export default RecipeBook;
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import DeleteModal from "../Modal/deleteModal";
import "./recipeBook.css";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';


function RecipeBook(props) {

    const recipeCards = props.recipes.map((recipe, index) => (
        <div className="col-md-4 col-sm-6 cardCol" key={recipe._id}>
            <Card className="card">
                <CardContent className="cardContent">
                    <Row>
                        <Col size="md-10 sm-8" id="recipeNameCol">
                            <Link to={"/users/" + props.userID + "/recipes/" + recipe._id}>
                                <h3 className="name">{recipe.name}</h3>
                            </Link>
                        </Col>
                        <Col size="md-1 sm-2" id="xCol">
                            <Tooltip title="Delete Private Recipe">
                                <IconButton className="deleteRecipePrivate" onClick={() => props.showDeleteModal(recipe._id)}>
                                    <DeleteIcon data-id={recipe._id} />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br />
                    <p className="creator">{recipe.edited ? "Original: " : ""}{recipe.source === "Pinterest" && !recipe.edited ? "From Pinterest" : recipe.source === "Pinterest" && recipe.edited ? "Pinterest" : recipe.otherSite ? recipe.creator : recipe.creatorID === props.userID ? "By You" : `By ${recipe.creator}`}</p>
                    {recipe.imgLink ? (
                        <CardMedia className="cardImage" image={recipe.imgLink} title={recipe.name} />
                    ) : <CardMedia className="cardDefaultImage" src="./recipeCardDefault.jpg" title={recipe.name} />}
                    {recipe.cooktime ? <p className="cooktime">Takes {recipe.cooktime}</p> : ""}
                </CardContent>
            </Card>
        </div>
    ))

    return (
        <div className="recipeBook">
            <div className="top">
                <Container className="topArea">
                    <Row>
                        <Col size="md-8 sm-9" id="privateTitleCol">
                            <h3 className="title">Your {props.currentTag ? props.currentTag : ""} Recipes:</h3>
                        </Col>
                        <Col size="md-4 sm-3" id="privateBtnCol">
                            <Link to={"/postRecipe"}>
                                <button className="btn toRecipePostFromPrivate">Post a Recipe</button>
                            </Link>
                        </Col>
                    </Row>
                </Container>

            </div>

            {props.currentTag && recipeCards[0] === undefined ? (
                <Container className="mainContainer">
                    <Row>
                        <h3 className="noMatch">Sorry, no matches.</h3>
                    </Row>
                </Container>
            ) : recipeCards[0] === undefined ? (
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
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import DeleteModal from "../Modal/deleteModal";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "./postedRecipes.css";

//arcane-scrubland-36182

function PostedRecipes(props) {

    const recipeCards = props.recipes.map(recipe => (
        <div className="card" key={recipe._id}>
            <Container>
                <Row>
                    <Col size="md-10">
                        <Link to={"/recipes/" + recipe._id}>
                            <h3 className="nameMaster">{recipe.name}</h3>
                        </Link>
                    </Col>
                    <Col size="md-2">
                        {props.userID === recipe.creatorID ? (
                            <IconButton className="deleteRecipeMaster">
                                <DeleteIcon data-id={recipe._id} onClick={() => props.showDeleteModal(recipe._id)} />
                            </IconButton>
                        ) : ""}
                    </Col>
                </Row>
                <br />
                <Row>
                    {recipe.source === "Pinterest" ? <p className="creator">From Pinterest</p> : recipe.otherSite ? <p className="creator">{recipe.creator}</p> : recipe.creator ? <p className="creator">By {recipe.creator}</p> : <p className="creator">By Anonymous</p>}
                </Row>
            </Container>
            <hr />
            {recipe.cooktime ? <p className="cooktime">Takes {recipe.cooktime}</p> : ""}
            {recipe.description ? <p className="description">Description: {recipe.description}</p> : ""}
        </div>
    ))


    return (
        <div className="postedRecipes">
            <div className="top">
                <Container className="topArea">
                    <Row>
                        <Col size="md-8 sm-10" id="recipeTop">
                            <h3 className="title">Latest {props.currentTag ? props.currentTag : ""} Recipes:</h3>
                        </Col>
                        {props.userID ? (
                            <Col size="md-4 sm-2" id="toRecipePostCol">
                                <Link to={"/postRecipe"}>
                                    <button className="btn btn-success toRecipePost">Post a Recipe</button>
                                </Link>
                            </Col>) : ""}
                    </Row>
                    <DeleteModal recipeToRemove={props.recipeToRemove} show={props.deleteModal} closeModal={props.closeModal} removeFromPublic={props.removeFromPublic} home={props.home} />
                </Container>
            </div>
            {props.recipes.length === 0 ?

                <h3>Sorry, no matches.</h3> : (
                    <div>
                        {recipeCards}
                    </div>
                )}
        </div>
    );
}

export default PostedRecipes;
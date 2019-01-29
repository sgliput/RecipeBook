import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import DeleteModal from "../Modal/deleteModal";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import "./postedRecipes.css";


function PostedRecipes(props) {

    // Maps the recipes received, generating a card for each one
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
                            <Tooltip title="Delete Public Recipe">
                                <IconButton className="deleteRecipeMaster" data-id={recipe._id} onClick={() => props.showDeleteModal(recipe._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        ) : ""}
                    </Col>
                </Row>
                <br />
                <Row>
                    {/* The Pinterest possibility no longer applies, but this shows the creator name if there is one; if not, "By Anonymous" appears instead */}
                    {recipe.source === "Pinterest" ? <p className="creator">From Pinterest</p> : recipe.otherSite ? <p className="creator">{recipe.creator}</p> : recipe.creator ? <p className="creator">By {recipe.creator}</p> : <p className="creator">By Anonymous</p>}
                </Row>
            </Container>
            <hr />
            {/* The cooktime and description appear if they exist */}
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
                            {/* If a tag search has been done, the name of the tag is added to this title */}
                            <h3 className="title">Latest {props.currentTag ? props.currentTag : ""} Recipes:</h3>
                        </Col>
                        {props.userID ? (
                            <Col size="md-4 sm-2" id="toRecipePostCol">
                                <Link to={"/postRecipe"}>
                                    <button className="btn toRecipePost">Post a Recipe</button>
                                </Link>
                            </Col>) : ""}
                            {/* If the user is not logged in and if the first five recipes are not displayed, this left button with special margins appears */}
                        {props.iterator !== 0 && !props.userID ? (
                            <Tooltip title="Previous Recipes">
                                <IconButton className="recipeBackUnlogged" onClick={props.prevFive}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Tooltip>
                            // Otherwise, if the user is logged in and the first five recipes are not displayed, the normal left button appears 
                        ) : props.iterator !== 0 ? (
                            <Tooltip title="Previous Recipes">
                                <IconButton className="recipeBack" onClick={props.prevFive}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Tooltip>
                        ) : ""}
                            {/*If any recipes but the last round are displayed and if there are more recipes to display, the right arrow appears */}
                        {props.iterator !== props.lastIterator && props.recipeFives[1] !== undefined && props.recipes.length === 5  ? (
                            <Tooltip title="More Recipes">
                                <IconButton className="recipeForward" onClick={props.nextFive}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </Tooltip>
                        ) : ""}
                    </Row>
                    <DeleteModal recipeToRemove={props.recipeToRemove} show={props.deleteModal} closeModal={props.closeModal} removeFromPublic={props.removeFromPublic} home={props.home} />
                </Container>
            </div>
            {/* If there are no recipes to display, such as a search with no results, a "no matches" message appears */}
            {props.recipes.length === 0 ?
                <h3 className="noMatch">Sorry, no matches.</h3>
                // Otherwise, if the first five recipes are displayed, they are put in a div with special margins
                : props.iterator === 0 ? (
                    <div className="cardHolderFirst">
                        {recipeCards}
                    </div>
                ) : (
                    //The rest of the recipes are displayed in a normal div
                        <div className="cardHolder">
                            {recipeCards}
                        </div>
                    )}
                    {/* If any but the first five recipes are displayed, the left arrow appears at the bottom */}
            {props.iterator !== 0 ? (
                <Tooltip title="Previous Recipes">
                    <IconButton className="recipeBackBottom" onClick={props.prevFive}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Tooltip>
            ) : ""}
            {/*If any recipes but the last round are displayed and if there are more recipes to display, the right arrow appears at the bottom */}
            {props.iterator !== props.lastIterator && props.recipeFives[1] !== undefined && props.recipes.length === 5 ? (
                <Tooltip title="More Recipes">
                    <IconButton className="recipeForwardBottom" onClick={props.nextFive}>
                        <ChevronRightIcon />
                    </IconButton>
                </Tooltip>
            ) : ""}
        </div>
    );
}

export default PostedRecipes;
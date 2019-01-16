import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import "./recipeBook.css";

function RecipeBook(props) {

    const recipeCards = props.recipes.map((recipe, index) => (
        <Col size="md-4 sm-6">
            <div className="card" key={recipe._id}>
                <Row>
                    <Col size="md-10">
                        <Link to={"/users/" + props.userID + "/recipes/" + recipe._id}>
                            <h3 className="name">{recipe.name}</h3>
                        </Link>
                    </Col>
                    <Col size="md-2">
                        <span className="deleteRecipePrivate" data-id={recipe._id} onClick={() => props.deleteUserRecipe(recipe._id)}>&times;</span>
                    </Col>
                </Row>
                <p className="creator">{recipe.edited ? "Original: " : ""}{recipe.source === "Pinterest" && !recipe.edited ? "From Pinterest" : recipe.source === "Pinterest" && recipe.edited ? "Pinterest" : recipe.otherSite ? recipe.creator : recipe.creatorID === props.userID ? "By You" : `By ${recipe.creator}`}</p>
                <hr />
                {recipe.cooktime ? <p className="cooktime">Takes {recipe.cooktime}</p> : ""}
            </div>
        </Col>
    ))

    return (
        <div className="recipeBook">
            <div className="top">
                <Container className="topArea">
                    <Row>
                        <Col size="md-8">
                            <h3 className="title">Latest Recipes:</h3>
                        </Col>
                        <Col size="md-4">
                            <Link to={"/postRecipe"}>
                                <button className="btn btn-success toRecipePost">Post a Recipe</button>
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
                    </Container>

                )}

        </div >
    );
}

export default RecipeBook;
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
            {recipe.source === "Pinterest" ? <p className="creator">From Pinterest</p> : recipe.otherSite ? <p className="creator">{recipe.creator}</p> : <p className="creator">By {recipe.creator}</p>}
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
            <Container className="mainComponent">
            {!props.recipes ? (
                <Row>
                   
                        <Container>
                        <h3 className="startPosting">Start posting to fill your own personal Recipe Book!</h3>
                        </Container>
                        </Row>
                    ) : (
                        
                        <Row>
                    {recipeCards}
                    </Row>
                      
                    )}
              
            </Container>

        </div>
    );
}

export default RecipeBook;
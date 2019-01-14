import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
//import "./recipeBook.css";

function RecipeBook(props) {

    // const recipeCards = props.recipes.map((recipe, index) => (
    //     <div className="card" key={index}>
    //         <Link to={"/recipes/" + recipe._id}>
    //             <h3 className="name">{recipe.name}</h3>
    //         </Link>
    //         {recipe.source === "Pinterest" ? <p className="creator">From Pinterest</p> : recipe.otherSite ? <p className="creator">{recipe.creator}</p> : <p className="creator">By {recipe.creator}</p>}
    //         <hr />
    //         {recipe.cooktime ? <p className="cooktime">Takes {recipe.cooktime}</p> : ""}
    //         {recipe.description ? <p className="description">Description: {recipe.description}</p> : ""}
    //     </div>
    // ))

    const recipeCards = props.recipes.map((recipe, index) => (
        <Col size="md-4 sm-6">
        <div className="card" key={index}>
            <Link to={"/recipes/" + recipe}>
                <h3 className="name">Recipe Name</h3>
            </Link>
            <p className="creator">By Creator</p>
            <hr />
            <p className="cooktime">Takes an hour</p>
            <p className="description">Description</p>
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
                <Row>
            {recipeCards}
            </Row>
            </Container>

        </div>
    );
}

export default RecipeBook;
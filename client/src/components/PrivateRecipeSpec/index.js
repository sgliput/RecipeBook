import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import EditIngredientFields from "../EditIngredientFields";
import EditDirectionFields from "../EditDirectionFields";
import "./privateRecipeSpec.css";

class PrivateRecipeSpec extends Component {
    state = {
        recipeData: {},
        recipeName: "",
        creator: "",
        creatorID: "",
        cooktime: "",
        description: "",
        ingredients: [],
        ingList: [],
        ingFields: [],
        directions: [],
        dirList: [],
        source: "",
        otherSite: false,
        dateSaved: "",
        editing: false,
        recipeGone: false,
        beenEdited: false,
        loggedInUserID: ""
    }

    componentDidMount() {
        this.setState({ loggedInUserID: sessionStorage.getItem('userID') });
        console.log("RecipeID: " + this.props.recipeID);
        API.getRecipe(this.props.recipeID)
            .then(res => {
                console.log(res.data);
                if (res.data === null) {
                    this.setState({ recipeGone: true });
                } else {
                    this.setState({
                        recipeData: res.data,
                        recipeName: res.data.name,
                        creator: res.data.creator,
                        creatorID: res.data.creatorID,
                        cooktime: res.data.cooktime,
                        description: res.data.description,
                        beenEdited: res.data.edited,
                        dateSaved: res.data.dateSaved
                    });
                    if (res.data.otherSite) {
                        this.setState({
                            source: res.data.source,
                            otherSite: res.data.otherSite
                        });

                    };
                    this.getIngredientList();
                    this.getDirectionsList();
                    console.log(res.data.ingredients);
                    console.log(this.state.ingredients);
                }
            })
    }

    getIngredientList() {

        const ingArray = Object.values(this.state.recipeData.ingredients);
        const ingredients = ingArray.map(ingredient => ingredient);

        const ingList = ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ))

        this.setState({ ingredients, ingList });
    };

    getDirectionsList() {

        if (this.state.recipeData.directions) {
            const dirArray = Object.values(this.state.recipeData.directions);
            const directions = dirArray.map(step => step);
            const dirList = directions.map((step, index) => (
                <li key={index}>{step}</li>
            ))
            this.setState({ directions, dirList });
        }
    }



    handleRecipeNameChange = event => {
        //Changes this.state.recipeName to the content of the input box
        this.setState({
            recipeName: event.target.value
        });
        console.log("Recipe Name: " + this.state.recipeName);
    };

    handleCooktimeChange = event => {
        //Changes this.state.cooktime to the content of the input box
        this.setState({
            cooktime: event.target.value
        });
        console.log("Cook Time: " + this.state.cooktime);
    };

    handleDescriptionChange = event => {
        //Changes this.state.description to the content of the input box
        this.setState({
            description: event.target.value
        });
        console.log("Description: " + this.state.description);
    };






    IngredientChange = event => {
        const value = event.target.value;
        console.log("Value: " + value);
        const id = event.target.id.replace("ingredient", "");
        console.log("Ingredient " + id);
        const ingrs = this.state.ingredients;
        ingrs[id] = value;
        console.log("ingrs[id]: " + ingrs[id]);

        //Changes this.state.ingredients to the current ingredients array
        this.setState({
            ingredients: ingrs
        });
        console.log("Ingredient 1: " + this.state.ingredients[id]);
        console.log(ingrs);
        console.log(this.state.ingredients[0]);
    };

    handleEdit = event => {
        event.preventDefault();

        this.setState({ editing: true });
        console.log(this.IngredientChange);
    };

    addIngredient = () => {
        this.state.ingredients.push("");
        console.log(this.state.ingredients);
    }

    StepChange = event => {
        const value = event.target.value;
        console.log("Value: " + value);
        const id = event.target.id.replace("step", "");
        console.log("Step " + id);
        const steps = this.state.directions;
        steps[id] = value;
        console.log("steps[id]: " + steps[id]);

        //Changes this.state.ingredients to the current ingredients array
        this.setState({
            directions: steps
        });
        console.log("Step 1: " + this.state.directions[id]);
        console.log(steps);
        console.log(this.state.directions[0]);
    };

    addStep = () => {
        this.state.directions.push("");
        console.log(this.state.directions);
    }

    handlePrivateEdit = event => {
        event.preventDefault();
        const id = this.state.recipeData._id;
        const recipeName = this.state.recipeName;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        let ingredients = this.state.ingredients;
        //forEach loop removes any empty values in the ingredients array
        ingredients.forEach(function (element, index) {
            if (element === "") {
                delete ingredients[index];
            }
        });
        const ingObjects = Object.assign({}, ingredients);
        let ingKeys = Object.keys(ingObjects);
        for (var i = 0; i < ingKeys.length; i++) {
            var ingKey = ingKeys[i].replace(i, "ingredient" + i);
            ingObjects[ingKey] = ingObjects[ingKeys[i]];
            delete ingObjects[i];
        }
        let directions = this.state.directions;
        //forEach loop removes any empty values in the directions array
        directions.forEach(function (element, index) {
            if (element === "") {
                delete directions[index];
            }
        });
        const dirObjects = Object.assign({}, directions);
        let dirKeys = Object.keys(dirObjects);
        for (var j = 0; j < dirKeys.length; j++) {
            var dirKey = dirKeys[j].replace(j, "direction" + j);
            dirObjects[dirKey] = dirObjects[dirKeys[j]];
            delete dirObjects[j];
        }
        if (this.state.beenEdited) {
            const editedRecipe = {
                name: recipeName,
                cooktime: cooktime,
                description: description,
                ingredients: ingObjects,
                directions: dirObjects
            };

            API.updateRecipe(id, editedRecipe)
                .then(res => {
                    console.log("Res for Edited:");
                    console.log(res);
                })
                .catch(err => console.log(err));


        } else {
            const editedRecipe = {
                name: recipeName,
                creator: this.state.creator,
                creatorID: this.state.loggedInUserID,
                cooktime: cooktime,
                description: description,
                ingredients: ingObjects,
                directions: dirObjects,
                public: false,
                edited: true,
                deleted: false,
                otherSite: this.state.otherSite,
                source: this.state.source,
                dateSaved: this.state.dateSaved
            };
            console.log("Editedd Recipe");
            console.log(editedRecipe);
            API.saveRecipe(editedRecipe)
                .then(dbRecipe => {
                    console.log(dbRecipe);
                    API.deleteUserRecipe(this.state.loggedInUserID, id)
                        .then(dbUser => {
                            console.log(dbUser);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                })
                .catch(err => console.log(err));

        }
    }

    render() {
        return (

            <Container className="mainContainer">
                {this.state.recipeGone ? (<h3 className="sorry">Sorry, this recipe has been deleted by its original poster.</h3>) :

                    this.state.editing ? (
                        <section className="recipeForm">
                        <Row>
                                    <Link to={"/userRecipes/" + this.state.loggedInUserID}>
                                        <button className="btn btn-info backToRecipeBookEdit">Back to Your Recipe Book</button>
                                    </Link>
                                </Row>
                            <Row>
                                <Col size="md-6">
                                    <h3 className="formInst">Editing <br /> {this.state.recipeName}</h3>
                                    {this.state.source === "Pinterest" ? <h4 className="editCreator">From Pinterest</h4> : this.state.otherSite ? <h4 className="editCreator">{this.state.creator}</h4> : <h4 className="editCreator">By {this.state.creator}</h4>}

                                </Col>
                            </Row>
                            <br />
                            <div className="form-group">
                                <Row>
                                    <Col size="md-4" id="infoFieldCol">
                                        <label>Name of Recipe:</label>
                                        <input className="form-control recipeNameField" value={this.state.recipeName} onChange={this.handleRecipeNameChange} />
                                        <br />
                                        <label>Cook Time:</label>
                                        <input className="form-control cooktimeField" value={this.state.cooktime} onChange={this.handleCooktimeChange} />
                                        <br />
                                        <label>Description:</label>
                                        <textarea className="form-control descriptionField" rows="3" value={this.state.description} onChange={this.handleDescriptionChange} />
                                        <br />
                                    </Col>
                                    <Col size="md-4" id="ingrFieldCol">
                                        <EditIngredientFields addIngredient={this.addIngredient} IngredientChange={this.IngredientChange} ingredients={this.state.ingredients} />
                                    </Col>
                                    <Col size="md-4" id="dirFieldCol">
                                        <EditDirectionFields addStep={this.addStep} StepChange={this.StepChange} directions={this.state.directions} />
                                    </Col>
                                </Row>
                                <Row>
                                    <br />
                                    <button className="btn btn-success submit" onClick={this.handlePrivateEdit}>Submit</button>
                                </Row>
                            </div>
                        </section>

                    ) : (
                            <div>
                                <Row>
                                    <button className="btn btn-info editBtn" onClick={this.handleEdit}>Edit Recipe</button>
                                    <Link to={"/userRecipes/" + this.state.loggedInUserID}>
                                        <button className="btn btn-info backToRecipeBook">Back to Your Recipe Book</button>
                                    </Link>
                                </Row>

                                <h2 className="specRecipeName">{this.state.recipeData.name}</h2>
                                {this.state.recipeData.source === "Pinterest" ? <p>From <a href={this.state.recipeData.creator} target="blank">Pinterest</a></p> : this.state.recipeData.otherSite ? <p className="specCreator">{this.state.recipeData.creator}</p> : <p className="specCreator">Posted by {this.state.recipeData.creator}</p>}
                                {this.state.recipeData.link ? <a href={this.state.recipeData.link} target="blank"><p className="origin">See Source</p></a> : ""}
                                {this.state.recipeData.cooktime ? <p className="specCooktime">Takes {this.state.recipeData.cooktime}</p> : ""}
                                <p className="specDescription">{this.state.recipeData.description}</p>

                                <Row className="underline">
                                    <Col size="md-4 sm-12" id="ingrCol">
                                        <ul className="specIngredientList">
                                            {this.state.ingList}
                                        </ul>
                                        <br />
                                    </Col>
                                    <Col size="md-7 sm-12" id="dirCol">
                                        {this.state.recipeData.directions ? (
                                            <ol className="specDirectionList">
                                                {this.state.dirList}
                                            </ol>
                                        ) : <h3 className="noDirections">See source for directions</h3>}
                                        <br />
                                    </Col>
                                </Row>
                            </div>
                        )}

            </Container>




        )
    }


};

export default PrivateRecipeSpec;
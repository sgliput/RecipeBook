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
        tagArray: [],
        tagBtnArray: [],
        editTagBtnArray: [],
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
                    this.displayRecipe(res);
                }
            })
    }

    displayRecipe = res => {
        const tagBtnArray = res.data.tags.map(tag => (
            <button className="btn btn-info tagBtn" data-name={tag}>
                {tag}
            </button>));
        const editTagBtnArray = res.data.tags.map(tag => (
            <button className="btn btn-info tagBtn" data-name={tag}>
                {tag}
                <span className="deleteTag" data-name={tag} onClick={this.deleteTag}>&times;</span>
            </button>));
        this.setState({
            recipeData: res.data,
            recipeName: res.data.name,
            creator: res.data.creator,
            creatorID: res.data.creatorID,
            cooktime: res.data.cooktime,
            description: res.data.description,
            beenEdited: res.data.edited,
            dateSaved: res.data.dateSaved,
            tagArray: res.data.tags,
            tagBtnArray: tagBtnArray,
            editTagBtnArray: editTagBtnArray
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
        console.log(this.state.tagArray);
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

        this.setState({ editing: true, tagField: "" });
    };

    stopEdit = event => {
        event.preventDefault();
        this.setState({ editing: false });
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

    addTag = event => {
        const tag = event.target.value;
        const tagArray = this.state.tagArray;
        const tagBtnArray = this.state.tagBtnArray;
        const editTagBtnArray = this.state.editTagBtnArray;
        console.log("Index: " + tagArray.indexOf(tag));
        if (tagArray.indexOf(tag) === -1) {
            tagArray.push(tag);
            editTagBtnArray.push(
                <button className="btn btn-info tagBtn" data-name={tag}>
                    {tag}
                    <span className="deleteTag" data-name={tag} onClick={this.deleteTag}>&times;</span>
                </button>);
        }
        this.setState({ tagArray, tagBtnArray, tagField: tag });

        console.log(this.state.tagArray);
    }

    deleteTag = event => {
        const tag = event.target.dataset.name;
        console.log("Tag: " + tag);
        const tagArray = this.state.tagArray;
        const tagBtnArray = this.state.tagBtnArray;
        const editTagBtnArray = this.state.editTagBtnArray;
        const index = tagArray.indexOf(tag);
        console.log("Index: " + index);
        if (index > -1) {
            tagArray.splice(index, 1);
            editTagBtnArray.splice(index, 1);
        }
        this.setState({ tagArray, tagBtnArray, editTagBtnArray, tagField: "" });
        console.log(this.state.tagArray);
    }

    handlePrivateEdit = event => {
        event.preventDefault();
        const id = this.state.recipeData._id;
        const recipeName = this.state.recipeName;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        const tagArray = this.state.tagArray;
        let ingredients = this.state.ingredients;
        //forEach loop removes any empty values in the ingredients array
        ingredients.forEach(function (element, index) {
            if (element === "") {
                delete ingredients[index];
            }
        });
        //Converts the ingredients from an object to an array with no duplicates
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
        //Converts the directions from an object to an array with no duplicates
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
                directions: dirObjects,
                tags: tagArray
            };

            API.updateRecipe(id, editedRecipe)
                .then(res => {
                    console.log("Res for Edited:");
                    console.log(res);
                    this.displayRecipe(res);
                    this.setState({ editing: false });
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
                tags: tagArray,
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
                    this.displayRecipe(dbRecipe);
                    this.setState({ editing: false });
                    API.deleteUserRecipe(this.state.loggedInUserID, id)
                        .then(dbUser => {
                            console.log(dbUser);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser2 => {
                                    console.log(dbUser2);
                                })
                        })
                })
                .catch(err => console.log(err));
            //https://www.foodnetwork.com/recipes/food-network-kitchen/creamy-spinach-and-artichoke-chicken-skillet-3885792
        }
    }

    render() {
        return (

            <Container className="mainContainer">
                {this.state.recipeGone ? (<h3 className="sorry">Sorry, this recipe has been deleted by its original poster.</h3>) :

                    this.state.editing ? (
                        <section className="recipeForm">
                            <Row>
                                <button className="btn btn-info stopEditBtn" onClick={this.stopEdit}>Stop Editing</button>
                            </Row>
                            <Row>
                                <Col size="md-6">
                                    <h3 className="formInst">Editing <br /> {this.state.recipeName}</h3>
                                    <h4 className="editCreator">{this.state.recipeData.edited ? "Original: " : ""}{this.state.source === "Pinterest" ? "From Pinterest" : this.state.otherSite ? this.state.creator : this.state.recipeData.creatorID === this.state.loggedInUserID ? "Posted by You" : `By ${this.state.creator}`}</h4>

                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col size="md-2">
                                    <label className="control-label tagLabel">Tags:</label>
                                    <select className="form-control tagList" size="1" value={this.state.tagField} onChange={this.addTag}>
                                        <option defaultValue=""></option>
                                        <option value="Chicken">Chicken</option>
                                        <option value="Beef">Beef</option>
                                        <option value="Salad">Salad</option>
                                        <option value="Soup">Soup</option>
                                        <option value="Sandwich">Sandwich</option>
                                        <option value="Pasta">Pasta</option>
                                        <option value="Rice">Rice</option>
                                        <option value="Seafood">Seafood</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Brunch">Brunch</option>
                                        <option value="Dessert">Dessert</option>
                                        <option value="Baked Goods">Baked Goods</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Pastry">Pastry</option>
                                        <option value="Cookie">Cookie</option>
                                        <option value="Eggs">Eggs</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Fruit">Fruit</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Potatoes">Potatoes</option>
                                        <option value="Side Dish">Side Dish</option>
                                        <option value="Poultry">Poultry</option>
                                        <option value="Casserole">Casserole</option>
                                        <option value="Drinks">Drinks</option>
                                        <option value="Appetizer">Appetizer</option>
                                    </select>
                                </Col>
                                <Col size="md-10">
                                    <div className="tagsAdded">
                                        {this.state.editTagBtnArray}
                                    </div>
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
                                </Row>

                                <h2 className="specRecipeName">{this.state.recipeData.name}</h2>

                                <p className="specCreator">{this.state.recipeData.edited ? "Original: " : ""}{this.state.recipeData.source === "Pinterest" ? `From <a href=${this.state.recipeData.creator} target='blank'>Pinterest</a>` : this.state.recipeData.otherSite ? this.state.recipeData.creator : this.state.recipeData.creatorID === this.state.loggedInUserID ? "Posted by You" : `Posted by ${this.state.recipeData.creator}`}</p>


                                {this.state.recipeData.link ? <a href={this.state.recipeData.link} target="blank"><p className="origin">See Source</p></a> : ""}
                                {this.state.recipeData.cooktime ? <p className="specCooktime">Takes {this.state.recipeData.cooktime}</p> : ""}
                                <p className="specDescription">{this.state.recipeData.description}</p>
                                {this.state.tagBtnArray[0] !== undefined ? (
                                    <Row>

                                        <div className="specBtns">
                                            <p className="tagsSpecLabel">Tags:</p>
                                            <div className="tagBtns">
                                                {this.state.tagBtnArray}
                                            </div>
                                        </div>
                                    </Row>
                                ) : ""}

                                <Row>
                                    <Col size="md-4 sm-12" id="ingrCol">
                                        <h4 className="ingredientsTitle">Ingredients</h4>
                                        <ul className="specIngredientList">
                                            {this.state.ingList}
                                        </ul>
                                        <br />
                                    </Col>
                                    <Col size="md-7 sm-12" id="dirCol">
                                        <h4 className="directionsTitle">Directions</h4>
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
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import EditIngredientFields from "../EditIngredientFields";
import EditDirectionFields from "../EditDirectionFields";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import "./recipeSpec.css";

class RecipeSpec extends Component {
    state = {
        recipeData: {},
        recipeID: "",
        recipeName: "",
        creator: "",
        creatorID: "",
        cooktime: "",
        description: "",
        imgLink: "",
        tagField: "",
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
        editing: false,
        recipeGone: false,
        loggedInUserID: ""
    }

    componentDidMount() {
        this.setState({ loggedInUserID: sessionStorage.getItem('userID') });
        API.getRecipe(this.props.params)
            .then(res => {
                console.log(res.data);
                if (res.data === null) {
                    this.setState({ recipeGone: true });
                } else {
                    this.displayRecipe(res);

                    console.log(res.data.ingredients);
                    console.log(this.state.ingredients);
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
        console.log(res.data);
        this.setState({
            recipeData: res.data,
            recipeID: res.data._id,
            recipeName: res.data.name,
            creator: res.data.creator,
            creatorID: res.data.creatorID,
            cooktime: res.data.cooktime,
            description: res.data.description,
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
        if (res.data.imgLink) {
            this.setState({ imgLink: res.data.imgLink });
        }
        this.getIngredientList();
        this.getDirectionsList();
        console.log("Hello, sir!");
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
        //Changes this.state.recipeName to thecontent of the input box
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

    handleImgLinkChange = event => {
        //Changes this.state.description to the content of the input box
        this.setState({
            imgLink: event.target.value
        });
        console.log(this.state);
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

        //Changes this.state.directions to the current directions array
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

    handleEditSubmit = event => {
        event.preventDefault();
        const id = this.state.recipeData._id;
        const recipeName = this.state.recipeName;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        const imgLink = this.state.imgLink;
        const tagArray = this.state.tagArray;
        console.log(this.state.tagArray);
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

        const editedRecipe = {
            name: recipeName,
            cooktime: cooktime,
            description: description,
            ingredients: ingObjects,
            directions: dirObjects,
            tags: tagArray,
            imgLink: imgLink
        };
        console.log("Editedd Recipe");
        console.log(editedRecipe);

        API.updateRecipe(id, editedRecipe)
            .then(res => {
                console.log(res);
                this.displayRecipe(res);
                this.setState({ editing: false });
            })
            .catch(err => console.log(err));
    }

    addToPrivate = () => {
        API.updateUserRecipes(this.state.loggedInUserID, this.state.recipeID)
            .then(dbUser => {
                console.log(dbUser);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (

            <Container className="mainContainer">
                {this.state.recipeGone ? (<h3 className="sorry">Sorry, this recipe has been deleted by its original poster.</h3>) :

                    this.state.editing ? (
                        <section className="recipeForm">
                            <Row>
                                <button className="btn stopEditBtn" onClick={this.stopEdit}>Cancel Edit</button>
                            </Row>
                            <Row>
                                <Col size="md-6">
                                    <h3 className="formInst">Editing Public Version of <br /> {this.state.recipeName}</h3>
                                    {this.state.source === "Pinterest" ? <h4 className="editCreator">From Pinterest</h4> : this.state.otherSite ? <h4 className="editCreator">{this.state.creator}</h4> : this.state.creator ? <h4 className="editCreator">By {this.state.creator}</h4> : <h4 className="editCreator">By Anonymous (a.k.a. You)</h4>}

                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col size="md-2">
                                    <label className="control-label tagLabel">Tags:</label>
                                    <select className="form-control tagList" size="1" value={this.state.tagField} onChange={this.addTag}>
                                    <option className="defaultBlank" defaultValue=""></option>
                                <option value disabled>--Choose a Tag--</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Appetizer">Appetizer</option>
                                        <option value="Baked Goods">Baked Goods</option>
                                        <option value="BBQ">BBQ</option>
                                        <option value="Beans">Beans</option>
                                        <option value="Beef">Beef</option>
                                        <option value="Bread">Bread</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Brunch">Brunch</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Casserole">Casserole</option>
                                        <option value="Cheese">Cheese</option>
                                        <option value="Chicken">Chicken</option>
                                        <option value="Chocolate">Chocolate</option>
                                        <option value="Cookie">Cookie</option>
                                        <option value="Dessert">Dessert</option>
                                        <option value="Drinks">Drinks</option>
                                        <option value="Eggs">Eggs</option>
                                        <option value="Fish">Fish</option>
                                        <option value="Fruit">Fruit</option>
                                        <option value="Gluten-Free">Gluten-Free</option>
                                        <option value="Holiday">Holiday</option>
                                        <option value="Lamb">Lamb</option>
                                        <option value="Meat">Meat</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Pasta">Pasta</option>
                                        <option value="Pastry">Pastry</option>
                                        <option value="Pie">Pie</option>
                                        <option value="Pizza">Pizza</option>
                                        <option value="Pork">Pork</option>
                                        <option value="Potato">Potato</option>
                                        <option value="Poultry">Poultry</option>
                                        <option value="Rice">Rice</option>
                                        <option value="Salad">Salad</option>
                                        <option value="Sandwich">Sandwich</option>
                                        <option value="Seafood">Seafood</option>
                                        <option value="Side Dish">Side Dish</option>
                                        <option value="Soup">Soup</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Vegetarian">Vegetarian</option>
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
                                        <label>Total Time:</label>
                                        <input className="form-control cooktimeField" value={this.state.cooktime} onChange={this.handleCooktimeChange} />
                                        <br />
                                        <label>Description:</label>
                                        <textarea className="form-control descriptionField" rows="3" value={this.state.description} onChange={this.handleDescriptionChange} />
                                        <br />
                                        <label>Image URL:</label>
                                        <input className="form-control imgLinkField" value={this.state.imgLink} onChange={this.handleImgLinkChange} />
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
                                    <button className="btn editSubmit" onClick={this.handleEditSubmit}>Submit</button>
                                </Row>
                            </div>
                        </section>

                    ) : (
                            <div>

                                {this.state.creatorID === this.state.loggedInUserID ? (
                                    <Row>
                                        <Tooltip title="Edit Recipe">
                                            <IconButton className="editBtn">
                                                <EditIcon className="editInner" onClick={this.handleEdit} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Add to Your Recipe Book">
                                            <Link to={"/userRecipes/" + this.state.loggedInUserID} className="toPrivateLink">
                                                <IconButton className="addBtn">
                                                    <AddCircleIcon className="editInner" onClick={this.addToPrivate} />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                    </Row>
                                ) : this.state.loggedInUserID ? (
                                    <Row>
                                        <Tooltip title="Add to Your Recipe Book">
                                            <Link to={"/userRecipes/" + this.state.loggedInUserID} className="toPrivateLink">
                                                <IconButton className="addBtn2">
                                                    <AddCircleIcon className="editInner" onClick={this.addToPrivate} />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                    </Row>
                                ) : ""}


                                {this.state.loggedInUserID ? <h2 className="specRecipeNamePublic">{this.state.recipeData.name}</h2> : <h2 className="specRecipeNameUnlogged">{this.state.recipeData.name}</h2>}
                                {this.state.recipeData.source === "Pinterest" ? <p>From <a href={this.state.recipeData.creator} target="blank">Pinterest</a></p> : this.state.recipeData.otherSite ? <p className="specCreator">{this.state.recipeData.creator}</p> : this.state.recipeData.creator ? <p className="specCreator">Posted by {this.state.recipeData.creator}</p> : <p className="specCreator">Posted by Anonymous</p>}
                                {this.state.recipeData.link ? <a href={this.state.recipeData.link} target="blank"><p className="origin">See Source</p></a> : ""}
                                {this.state.recipeData.cooktime ? <p className="specCooktime">Takes {this.state.recipeData.cooktime}</p> : ""}
                                <p className="specDescription">{this.state.recipeData.description}</p>
                                {this.state.tagArray[0] !== undefined ? (
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

export default RecipeSpec;
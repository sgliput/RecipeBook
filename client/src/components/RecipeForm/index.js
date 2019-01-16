import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import IngredientFields from "../IngredientFields";
import DirectionFields from "../DirectionFields";
import API from "../../utils/API";
import "./recipeForm.css";

// This file exports the SearchForm component

class RecipeForm extends Component {
    state = {
        recipeName: "",
        name: "",
        cooktime: "",
        description: "",
        ingredients: {},
        IngNumberOfFields: 1,
        directions: {},
        DirNumberOfFields: 1,
        siteToScrape: "Food Network",
        urlToScrape: "",
        loggedInUserID: "",
        selectedOption: "public"
    }

    componentDidMount() {
        this.setState({ loggedInUserID: sessionStorage.getItem('userID') });
    }

    handleRecipeNameChange = event => {
        //Changes this.state.recipeName to the content of the input box
        this.setState({
            recipeName: event.target.value
        });
        console.log("Recipe Name: " + this.state.recipeName);
    };

    handleNameChange = event => {
        //Changes this.state.name to the content of the input box
        this.setState({
            name: event.target.value
        });
        console.log("User Name: " + this.state.name);
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
        console.log(this.state);
    };

    handleRadioChange = event => {
        this.setState({
          selectedOption: event.target.value
        });
        console.log(this.state);
      }

    ///////  Ingredient Fields Column  ////////////////////////

    IngredientChange = event => {
        const value = event.target.value;
        const id = event.target.id;
        console.log("Ingredient: " + id);
        const ingrs = this.state.ingredients;
        ingrs[id] = value;

        //Changes this.state.ingredients to the current ingredients object
        this.setState({
            ingredients: ingrs
        });
        console.log("Ingredient 1: " + this.state.ingredients[id]);
        console.log(this.state.ingredients);
    };

    IngFields = [
        <div id="ingredient1" key="1">
            <label>Ingredient 1:</label>
            <input className="form-control ingredient1" id="ingredient1" rows="3" value={this.state.ingredients.ingredient1} onChange={this.IngredientChange} />
            <br />
        </div>
    ]

    addIngredient = () => {
        const newID = "ingredient" + (this.state.IngNumberOfFields + 1);
        const newFieldClass = "ingredient" + (this.state.IngNumberOfFields + 1) + "Field form-control";

        this.IngFields.push(
            <div id={newID} key={this.state.IngNumberOfFields + 1}>
                <label>Ingredient {this.state.IngNumberOfFields + 1}:</label>
                <br />
                <input className={newFieldClass} rows="3" id={newID} value={this.state.ingredients[newID]} onChange={this.IngredientChange} />
                <br />
            </div>);
        this.setState({
            IngNumberOfFields: this.state.IngNumberOfFields + 1
        });
    }

    ///////  Direction Fields Column  ////////////////////////

    StepChange = event => {
        const value = event.target.value;
        const id = event.target.id;
        console.log("Step: " + id);
        const steps = this.state.directions;
        steps[id] = value;

        //Changes this.state.ingredient1 to the content of the input box
        this.setState({
            directions: steps
        });
        console.log(this.state.directions);
    };

    DirFields = [
        <div id="step1" key="1">
            <label>Step 1:</label>
            <textarea className="form-control step1Field" id="step1" rows="3" value={this.state.directions.step1} onChange={this.StepChange} />
            <br />
        </div>
    ]

    addStep = event => {
        const newID = "step" + (this.state.DirNumberOfFields + 1);
        const newFieldClass = "step" + (this.state.DirNumberOfFields + 1) + "Field form-control";

        this.DirFields.push(
            <div id={newID} key={this.state.DirNumberOfFields + 1}>
                <label>Step {this.state.DirNumberOfFields + 1}:</label>
                <br />
                <textarea className={newFieldClass} id={newID} rows="3" value={this.state.directions[newID]} onChange={this.StepChange} />
                <br />
            </div>);
        this.setState({
            DirNumberOfFields: this.state.DirNumberOfFields + 1
        });
        console.log(this.state.directions);

    }

    //////////////////////////////////////////

    handleSubmit = event => {
        event.preventDefault();
        const recipeName = this.state.recipeName;
        const userName = this.state.name;
        const creatorID = this.state.loggedInUserID;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        const ingredients = this.state.ingredients;
        const directions = this.state.directions;
        const fullRecipe = {
            name: recipeName,
            creator: userName,
            creatorID: creatorID,
            cooktime: cooktime,
            description: description,
            ingredients: ingredients,
            directions: directions
        };
        if (this.state.loggedInUserID) {
            API.saveRecipe(fullRecipe)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            console.log("Sorry");
        }

    }

    scrapeChange = event => {
        const siteToScrape = event.target.value;
        this.setState({ siteToScrape });
    }

    handleURLChange = event => {
        //Changes this.state.description to the content of the input box
        this.setState({
            urlToScrape: event.target.value
        });
        console.log("urlToScrape: " + this.state.urlToScrape);
    };

    handleURLSubmit = event => {
        event.preventDefault();
        if (this.state.siteToScrape === "Food Network") {
            axios.get(this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                const ingredients = [];
                const steps = [];
                //https://www.foodnetwork.com/recipes/food-network-kitchen/slow-cooker-chicken-chili-3361911

                const recipeName = $(".o-AssetTitle__a-HeadlineText").text().trim();
                const creator = $(".o-Attribution__a-Name").children().text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".o-AssetDescription__a-Description").text().trim();
                const cooktime = $(".m-RecipeInfo__a-Description--Total").text().trim();
                //const imageSrc = $(".m-MediaBlock__a-Image a-Image").attr("src");
                //const ingredients = $(".o-Ingredients__m-Body").children();
                const link = this.state.urlToScrape;

                // Now, we grab the headline, byline, tag, article link, and summary from every Feedcard element
                $(".o-Ingredients__a-Ingredient").each((i, element) => {

                    const ingredient = $(element).text().trim();

                    ingredients.push(ingredient);

                });

                $(".o-Method__m-Step").each((i, element) => {

                    const step = $(element).text().trim();

                    steps.push(step);

                });
                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }

                // //Removing BY and By from each byline
                // const cutByline1 = byline.replace("BY ", "");
                // const cutByline2 = cutByline1.replace("By ", "");
                // console.log("Byline: " + byline);

                // // Add the headline, byline, tag, article link, and summary, and save them as properties of the result object
                const scrapedRecipe = {
                    name: recipeName,
                    creator: creator,
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime,
                    //imageSrc: imageSrc,
                    ingredients: ingObject,
                    directions: steps,
                    link: link,
                    otherSite: true,
                    source: "Food Network",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            //
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }
                // //Push each result to the resultsarray
                // results.push(result);

                // //If all these have values, then the article information is added to the database (upserted if it is not already present)
                // if (headline && tag && articleLink && summary) {
                //     db.Article.updateOne({ headline: $(element).find("h1").text() }, result, { upsert: true })
                //         .then(dbArticles => {
                //             // View the added articles in the console
                //             console.log(dbArticles);
                //         })
                //         .catch(err => {
                //             // If an error occurred, log it
                //             console.log(err);
                //         });
                // }


            });
        } else if (this.state.siteToScrape === "Pinterest") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {


                const $ = cheerio.load(response.data);

                //https://www.pinterest.com/pin/202591683214899897/

                const parsed = JSON.parse($("#jsInit1").contents()).resourceDataCache[0].data;

                const recipeName = parsed.rich_metadata.recipe.name;
                const link = parsed.rich_metadata.url;
                const creator = this.state.urlToScrape;
                let cooktime = "";
                if (parsed.rich_metadata.recipe.cook_times.total) {
                    cooktime = parsed.rich_metadata.recipe.cook_times.total.m + " minutes";
                }
                const description = parsed.description;
                //const imageSrc = parsed.board.image_thumbnail_url;

                const ingredientArrays = parsed.rich_metadata.recipe.categorized_ingredients.map(Ing => {
                    const ings = Ing.ingredients.map(lowerIng => {
                        return lowerIng.amt + " " + lowerIng.name;
                    });
                    return ings;
                });
                const ingredients = [];
                for (let i = 0; i < ingredientArrays.length; i++) {
                    for (let j = 0; j < ingredientArrays[i].length; j++) {
                        ingredients.push(ingredientArrays[i][j]);
                    }
                }
                let scrapedRecipe = "";
                if (recipeName && creator && description && ingredients && link && cooktime) {
                    scrapedRecipe = {
                        name: recipeName,
                        creator: creator,
                        description: description,
                        cooktime: cooktime,
                        //imageSrc: imageSrc,
                        ingredients: ingredients,
                        link: link,
                        otherSite: true,
                        source: "Pinterest",
                        public: false
                    };
                } else if (recipeName && creator && description && ingredients && link) {
                    scrapedRecipe = {
                        name: recipeName,
                        creator: creator,
                        description: description,
                        //imageSrc: imageSrc,
                        ingredients: ingredients,
                        link: link,
                        otherSite: true,
                        source: "Pinterest",
                        public: false
                    };
                }
                console.log(scrapedRecipe);


                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                            .then(dbUser => {
                                console.log(dbUser);
                            })
                    })
                    .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }


            });
        }
    }

    render() {
        return (
            <Container className="mainContainer">
            {this.state.loggedInUserID ? (
            <Row>
                <Col size="md-8"></Col>
                <Col size="md-4">
            <Link to={"/userRecipes/" + this.state.loggedInUserID}>
                            <button className="btn btn-success formToPrivate">Your RecipeBook</button>
                        </Link>
                        </Col>
                </Row>) : ""}
                <section className="recipeForm">
                    <Row>
                        <Col size="md-3">
                            <h3 className="formInst">Input Your Recipe Below</h3>
                        </Col>
                        <Col size="md-9" id="dropdownCol">
                            <form className="form-horizontal">
                                <Row>
                                    <h5 className="siteToScrapeIntro">Or enter the URL from one of the below sites to import the recipe into your personal Recipe Book</h5>
                                </Row>
                                <Row>
                                    <Col size="md-4" id="dropdown">
                                        <div className="form-group">
                                            <label className="control-label siteToScrapeLabel">Website:</label>
                                            <select className="form-control siteToScrape" size="1" onChange={this.scrapeChange}>
                                                <option defaultValue="Food Network">Food Network</option>
                                                <option value="Epicurious">Epicurious</option>
                                                <option value="All Recipes">All Recipes</option>
                                                <option value="Food.com">Food.com</option>
                                                <option value="MyRecipes.com">MyRecipes.com</option>
                                                <option value="Tastee">Tastee</option>
                                                <option value="Yummly">Yummly</option>
                                                <option value="Simply Recipes">Simply Recipes</option>
                                                <option value="SeriousEats.com">SeriousEats.com</option>
                                                <option value="Pinterest">Pinterest</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col size="md-5">
                                        <label className="control-label urlToScrapeLabel">URL:</label>
                                        <input className="form-control urlToScrape" value={this.state.url} onChange={this.handleURLChange} />
                                    </Col>
                                    <Col size="md-3">
                                        <button className="btn btn-success submitURL" onClick={this.handleURLSubmit}>Submit</button>
                                    </Col>

                                </Row>
                            </form>
                        </Col>
                    </Row>
                    <br />
                    <div className="form-group">
                        <Row>
                            <Col size="md-4" id="firstFields">
                                <label>Name of Recipe:</label>
                                <input className="form-control recipeNameField" value={this.state.recipeName} onChange={this.handleRecipeNameChange} />
                                <br />
                                <label>Your Name:</label>
                                <input className="form-control nameField" value={this.state.name} onChange={this.handleNameChange} />
                                <br />
                                <label>Cook Time:</label>
                                <input className="form-control cooktimeField" value={this.state.cooktime} onChange={this.handleCooktimeChange} />
                                <br />
                                <label>Description:</label>
                                <textarea className="form-control descriptionField" rows="3" value={this.state.description} onChange={this.handleDescriptionChange} />
                                <br />
                            </Col>
                            <Col size="md-4" id="firstIngrCol">
                                <IngredientFields addIngredient={this.addIngredient} IngFields={this.IngFields} />
                            </Col>
                            <Col size="md-4" id="firstDirCol">
                                <DirectionFields addStep={this.addStep} DirFields={this.DirFields} />
                            </Col>
                        </Row>
                        <Row>
                            <br />
                            <Col size="md-2 sm-3">
                                <button className="btn btn-success recipeSubmit" onClick={this.handleSubmit}>Submit</button>
                            </Col>
                            <Col size="md-5 sm-6">
                                <form>
                                    
                                        <label className="radio-inline publicRadio">
                                            <input type="radio" value="public"
                                                checked={this.state.selectedOption === 'public'}
                                                onChange={this.handleRadioChange} />
                                            Public
      </label>
                                    
                                    
                                        <label className="radio-inline">
                                            <input type="radio" value="private"
                                                checked={this.state.selectedOption === 'private'}
                                                onChange={this.handleRadioChange} />
                                            Private
      </label>
                                    
                                </form>
                            </Col>

                        </Row>
                    </div>
                </section>

            </Container >
        );
    };
}

export default RecipeForm;
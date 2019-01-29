import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import { Col, Row, Container } from "../Grid";
import IngredientFields from "../IngredientFields";
import DirectionFields from "../DirectionFields";
import AddModal from "../Modal/addModal";
import API from "../../utils/API";
import "./recipeForm.css";

// This file exports the SearchForm component

class RecipeForm extends Component {
    state = {
        recipeName: "",
        name: "",
        cooktime: "",
        description: "",
        imgLink: "",
        tagField: "",
        tagArray: [],
        tagBtnArray: [],
        ingredients: {},
        IngNumberOfFields: 1,
        directions: {},
        DirNumberOfFields: 1,
        cursorLocation: "",
        currentFieldID: "",
        siteToScrape: "",
        urlToScrape: "",
        failedScrape: false,
        loggedInUserID: "",
        selectedOption: "public",
    }

    //Stores userID and userName in state immediately
    componentDidMount() {
        this.setState({
            loggedInUserID: sessionStorage.getItem('userID'),
            name: sessionStorage.getItem("userName")
        });
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

    handleImgLinkChange = event => {
        //Changes this.state.imgLink to the content of the input box
        this.setState({
            imgLink: event.target.value
        });
        console.log(this.state);
    };

    handleRadioChange = event => {
        //Changes whether the public or private radio button has been selected
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
        //Changes the value of the specific ingredient, based on the field's id value
        ingrs[id] = value;

        //Changes this.state.ingredients to the current ingredients object
        this.setState({
            ingredients: ingrs
        });
        console.log("Ingredient 1: " + this.state.ingredients[id]);
        console.log(this.state.ingredients);
    };

    //Array of ingredient fields, starts with one and can be added to
    IngFields = [
        <div id="ingredient1" key="1">
            <label>Ingredient 1:</label>
            <input className="form-control ingredient1" id="ingredient1" rows="3" value={this.state.ingredients.ingredient1} onChange={this.IngredientChange} autoComplete="off" />
            <br />
        </div>
    ]

    addIngredient = () => {
        const newID = "ingredient" + (this.state.IngNumberOfFields + 1);
        const newFieldClass = "ingredient" + (this.state.IngNumberOfFields + 1) + "Field form-control";
        console.log(document.activeElement);

        //Pushes to the IngFields array a new field that corresponds to a specific key/value pair in the ingredients object
        this.IngFields.push(
            <div key={this.state.IngNumberOfFields + 1}>
                <label>Ingredient {this.state.IngNumberOfFields + 1}:</label>
                <br />
                <input className={newFieldClass} id={newID} value={this.state.ingredients[newID]} onChange={this.IngredientChange} autoComplete="off" />
                <br />
            </div>);
        this.setState({
            IngNumberOfFields: this.state.IngNumberOfFields + 1
        });
        //Waits until new field has been added, then puts focus on it so the user can immediately start typing in the new field
        setTimeout(function () {
            console.log(document.getElementById(newID));
            document.getElementById(newID).focus();
        }, 100);
    }

    ///////  Direction Fields Column  ////////////////////////

    StepChange = event => {
        const value = event.target.value;
        const id = event.target.id;
        console.log("Step : " + id);
        // const cursorLocation = event.target.selectionStart;
        // console.log(cursorLocation);
        const steps = this.state.directions;
        //Changes the value of the specific step, based on the field's id value
        steps[id] = value;

        //Changes this.state.directions to the current steps object
        this.setState({
            directions: steps,
            currentFieldID: id
        });
        console.log(this.state.directions);
    };

    //<button className="btn btn-info addDegree" onClick={this.addDegree}>&deg;</button>

    //Array of direction fields, starts with one and can be added to
    DirFields = [
        <div id="step1" key="1">
            <label>Step 1: </label>
            <textarea className="form-control step1Field" id="step1" rows="3" value={this.state.directions.step1} onChange={this.StepChange} autoComplete="off" />
            <br />
        </div>
    ]

    addStep = event => {
        const newID = "step" + (this.state.DirNumberOfFields + 1);
        const newFieldClass = "step" + (this.state.DirNumberOfFields + 1) + "Field form-control";

        //Pushes to the DirFields array a new field that corresponds to a specific key/value pair in the ingredients object
        this.DirFields.push(
            <div key={this.state.DirNumberOfFields + 1}>
                <label>Step {this.state.DirNumberOfFields + 1}:</label>
                <br />
                <textarea className={newFieldClass} id={newID} rows="3" value={this.state.directions[newID]} onChange={this.StepChange} autoComplete="off" />
                <br />
            </div>);
        this.setState({
            DirNumberOfFields: this.state.DirNumberOfFields + 1
        });
        console.log(this.state.directions);
        //Waits until new field has been added, then puts focus on it so the user can immediately start typing in the new field
        setTimeout(function () {
            console.log(document.getElementById(newID));
            document.getElementById(newID).focus();
        }, 100);
    }

    //////////////// For dealing with tags ////////////////////

    addTag = event => {
        const tag = event.target.value;
        const tagArray = this.state.tagArray;
        const tagBtnArray = this.state.tagBtnArray;
        console.log("Index: " + tagArray.indexOf(tag));
        //Adds new tag and button if it is not empty and is not already in the array
        if (tagArray.indexOf(tag) === -1 && tag !== "") {
            tagArray.push(tag);
            tagBtnArray.push(
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
        const index = tagArray.indexOf(tag);
        console.log("Index: " + index);
        //Removes tag from tagArray and the corresponding button from the tagBtnArray
        if (index > -1) {
            tagArray.splice(index, 1);
            tagBtnArray.splice(index, 1);
        }
        this.setState({ tagArray, tagBtnArray, tagField: "" });
        console.log(this.state.tagArray);
    }


    //////////////////////////////////////////

    handleSubmit = event => {
        event.preventDefault();
        const recipeName = this.state.recipeName;
        const userName = this.state.name;
        const creatorID = this.state.loggedInUserID;
        const cooktime = this.state.cooktime;
        const description = this.state.description;
        let imgLink = "";
        //Ensures the imgLink is an actual image link ending with .jpg, .jpeg, or .png
        if (this.state.imgLink.endsWith(".jpg") || this.state.imgLink.endsWith(".png") || this.state.imgLink.endsWith(".jpeg")) {
            imgLink = this.state.imgLink;
        };
        const ingredients = this.state.ingredients;
        const directions = this.state.directions;
        const tagArray = this.state.tagArray;

        //Sets whether the recipe is to be public or private
        let isPublic;
        if (this.state.selectedOption === "public") {
            isPublic = true;
        } else {
            isPublic = false;
        }
        //All information gathered in one object
        const fullRecipe = {
            name: recipeName,
            creator: userName,
            creatorID: creatorID,
            cooktime: cooktime,
            description: description,
            imgLink: imgLink,
            ingredients: ingredients,
            directions: directions,
            tags: tagArray,
            public: isPublic
        };
        //If the user is logged in, the recipe is saved to the database
        if (this.state.loggedInUserID) {
            API.saveRecipe(fullRecipe)
                .then(dbRecipe => {
                    console.log(dbRecipe);
                    //The addModal is shown, displaying the recipe just added
                    this.props.showAddModal(dbRecipe.data._id);
                    //The new recipe's _id number is also added to the current user's private Recipe Book (their recipes array)
                    API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                        .then(dbUser => {
                            console.log(dbUser);
                        })
                })
                .catch(err => console.log(err));
        } else {
            console.log("Sorry");
        }

    }


    ///////////////////////// For scraping from other sites ////////////////////

    //Handles choosing a website from the dropdown
    scrapeChange = event => {
        const siteToScrape = event.target.value;
        this.setState({ siteToScrape });
    }

    handleURLChange = event => {
        //Changes this.state.urlToScrape to the content of the input box
        this.setState({
            urlToScrape: event.target.value
        });
        console.log("urlToScrape: " + this.state.urlToScrape);
    };

    //Handles submission of a URL to scrape a recipe from
    //Which axios call is triggered depends on the value of this.state.siteToScrape; they are more or less the same in scraping pertinent data and saving it to the database as a private recipe
    handleURLSubmit = event => {
        event.preventDefault();
        if (this.state.siteToScrape === "Food Network") {
            axios.get(this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                const ingredients = [];
                const steps = [];

                const recipeName = $(".o-AssetTitle__a-HeadlineText").text().trim();
                const creator = $(".o-Attribution__a-Name").children().text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".o-AssetDescription__a-Description").text().trim();
                const cooktime = $(".m-RecipeInfo__a-Description--Total").text().trim();
                const imageSrc = $(".m-MediaBlock__a-Image").attr("src");
                const link = this.state.urlToScrape;


                $(".o-Ingredients__a-Ingredient").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    ingredients.push(ingredient);
               });

                $(".o-Method__m-Step").each((i, element) => {
                    const step = $(element).text().trim();
                    steps.push(step);
                });

                //Stores the ingredients in an object like when a recipe is typed in
                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }

               //Gathers all recipe data into an object ready to submit to the database
                const scrapedRecipe = {
                    name: recipeName,
                    creator: creator,
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime,
                    imgLink: imageSrc,
                    ingredients: ingObject,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Food Network",
                    public: false
                };
                console.log(scrapedRecipe);
                //If the user is logged in, the scraped recipes is saved as a private recipe
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            //If a previous scrape failed, this removes the "Oops" message
                            this.setState({failedScrape: false});
                            //Shows the addModal displaying the recipe just added
                            this.props.showAddModal(dbRecipe.data._id);
                            //The new recipe's _id number is also added to the current user's private Recipe Book (their recipes array)
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }
            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
            // } else if (this.state.siteToScrape === "Pinterest") {
            //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
            //     console.log("url: " + this.state.urlToScrape);
            //     axios.get(proxyurl + this.state.urlToScrape).then(response => {


            //         const $ = cheerio.load(response.data);

            //         //https://www.pinterest.com/pin/202591683214899897/

            //         const parsed = JSON.parse($("#jsInit1").contents()).resourceDataCache[0].data;

            //         const recipeName = parsed.rich_metadata.recipe.name;
            //         const link = parsed.rich_metadata.url;
            //         const creator = this.state.urlToScrape;
            //         let cooktime = "";
            //         if (parsed.rich_metadata.recipe.cook_times.total) {
            //             cooktime = parsed.rich_metadata.recipe.cook_times.total.m + " minutes";
            //         }
            //         const description = parsed.description;
            //         //const imageSrc = parsed.board.image_thumbnail_url;

            //         const ingredientArrays = parsed.rich_metadata.recipe.categorized_ingredients.map(Ing => {
            //             const ings = Ing.ingredients.map(lowerIng => {
            //                 return lowerIng.amt + " " + lowerIng.name;
            //             });
            //             return ings;
            //         });
            //         const ingredients = [];
            //         for (let i = 0; i < ingredientArrays.length; i++) {
            //             for (let j = 0; j < ingredientArrays[i].length; j++) {
            //                 ingredients.push(ingredientArrays[i][j]);
            //             }
            //         }

            //         let scrapedRecipe = "";
            //         if (recipeName && creator && description && ingredients && link && cooktime) {
            //             scrapedRecipe = {
            //                 name: recipeName,
            //                 creator: creator,
            //                 description: description,
            //                 cooktime: cooktime,
            //                 //imgLink: imageSrc,
            //                 ingredients: ingredients,
            //                 tags: this.state.tagArray,
            //                 link: link,
            //                 otherSite: true,
            //                 source: "Pinterest",
            //                 public: false
            //             };
            //         } else if (recipeName && creator && description && ingredients && link) {
            //             scrapedRecipe = {
            //                 name: recipeName,
            //                 creator: creator,
            //                 description: description,
            //                 //imageSrc: imageSrc,
            //                 ingredients: ingredients,
            //                 tags: this.state.tagArray,
            //                 link: link,
            //                 otherSite: true,
            //                 source: "Pinterest",
            //                 public: false
            //             };
            //         }
            //         console.log(scrapedRecipe);


            //         if (this.state.loggedInUserID) {
            //             API.saveRecipe(scrapedRecipe)
            //                 .then(dbRecipe => {
            //                     console.log(dbRecipe);
            //                     this.setState({failedScrape: false});
            //                     this.props.showAddModal(dbRecipe.data._id);
            //                     API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
            //                         .then(dbUser => {
            //                             console.log(dbUser);
            //                         })
            //                 })
            //                 .catch(err => console.log(err));
            //         } else {
            //             console.log("Sorry");
            //         }


            //   }).catch(err => {
            //     console.log(err);
            //     this.setState({failedScrape: true});
            // });
        } else if (this.state.siteToScrape === "Epicurious") {
            axios.get(this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                const ingredients = [];
                const steps = [];

                const recipeName = $(".title-source").children("h1").text().trim();
                const creator = $(".contributor").text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".dek").children("p").text().trim();
                const cooktime = $("dd.total-time").text().trim();
                const imageSrc = $(".photo-wrap").children().first().attr("srcset");
                const link = this.state.urlToScrape;


                $("li.ingredient").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    ingredients.push(ingredient);
                });

                $("li.preparation-step").each((i, element) => {
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


                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator,
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime,
                    imgLink: imageSrc,
                    ingredients: ingObject,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Epicurious",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        } else if (this.state.siteToScrape === "Allrecipes") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                let ingredients = [];
                const steps = [];


                const recipeName = $("#recipe-main-content").text().trim();
                const creator = $(".submitter__name").text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".submitter__description").text().trim();
                const cooktime = $("time").last().children("span").text().trim();
                const imageSrc = $(".rec-photo").attr("src");
                const link = this.state.urlToScrape;


                $(".recipe-ingred_txt").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    if (ingredient !== "" && ingredient !== "Add all ingredients to list") {
                        ingredients.push(ingredient);
                    }
                });

                $(".recipe-directions__list--item").each((i, element) => {
                    const step = $(element).text().trim();
                    if (step !== "") {
                        steps.push(step);
                    }
                });

                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }


                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator + " / Allrecipes",
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime.split("h").join("hr").split("m").join("min"),
                    imgLink: imageSrc,
                    ingredients: ingredients,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Allrecipes",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        } else if (this.state.siteToScrape === "MyRecipes") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                let ingredients = [];
                const steps = [];

                const recipeName = $("h1.headline").text().trim();
                const creator = $(".author-name").text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".recipe-summary").children().children("p").text().trim();
                const cooktime = $(".recipe-meta-item").first().next().children(".recipe-meta-item-body").text().trim();
                const imageSrc = $(".lead-media").attr("data-src");
                const link = this.state.urlToScrape;


                $(".ingredients ul li").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    if (ingredient !== "") {
                        ingredients.push(ingredient);
                    }
                });

                $(".step").each((i, element) => {
                    const step = $(element).children("p").text().trim();
                    if (step !== "") {
                        steps.push(step);
                    }
                });

                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }


                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator + " / MyRecipes",
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime,
                    imgLink: imageSrc,
                    ingredients: ingredients,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "MyRecipes",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        } else if (this.state.siteToScrape === "Yummly") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                let ingredients = [];
                const steps = [];

                const recipeName = $(".recipe-title").text().trim();
                let creator = $(".attribution").text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".recipe-description").children("p").text().trim();
                const cooktime = $(".recipe-summary-item").first().next().children(".value").text().trim() + " " + $(".recipe-summary-item").first().next().children(".unit").text().trim();
                //const imageSrc = $(".recipe-image").attr("src");
                const link = this.state.urlToScrape;

                $(".IngredientLine").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    if (ingredient !== "") {
                        ingredients.push(ingredient);
                    }
                });

                $(".step").each((i, element) => {
                    const step = $(element).text().trim();
                    if (step !== "") {
                        steps.push(step);
                    }
                });

                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }
                if (!creator.includes("YUMMLY")) {
                    creator = creator + " / Yummly";
                };

                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator,
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime,
                    //imgLink: imageSrc,
                    ingredients: ingredients,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Yummly",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        } else if (this.state.siteToScrape === "Simply Recipes") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                let ingredients = [];
                const steps = [];

                const recipeName = $("#sr-recipe-callout").children("h2").text().trim();
                const creator = $(".author").text().trim();
                const creatorID = this.state.loggedInUserID;
                const description = $(".meta-description-content").text().trim();
                //Adds together the preptime and cooktime values to get total time
                let preptime = $(".preptime").text().trim();
                let cooktime = $(".cooktime").text().trim();
                preptime = preptime.split(" ");
                cooktime = cooktime.split(" ");
                let total = parseInt(preptime[0]) + parseInt(cooktime[0]);
                cooktime[0] = total;
                cooktime = cooktime.join(" ");

                const imageSrc = $(".featured-image").children("img").attr("src");
                const link = this.state.urlToScrape;


                $(".ingredient").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    if (ingredient !== "") {
                        ingredients.push(ingredient);
                    }
                });

                $("#sr-recipe-method div p").each((i, element) => {
                    const step = $(element).text().trim();
                    if (step !== "") {
                        steps.push(step);
                    }
                });

                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }


                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator + " / Simply Recipes",
                    creatorID: creatorID,
                    description: description,
                    cooktime: cooktime,
                    imgLink: imageSrc,
                    ingredients: ingredients,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Simply Recipes",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        } else if (this.state.siteToScrape === "Genius Kitchen") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                let ingredients = [];
                const steps = [];

                const recipeName = $(".recipe-header").children("h1").text().trim();
                const creator = $(".byline").children(".print-only-inline").text().trim();
                const creatorID = this.state.loggedInUserID;
                //Splits cooktime into an array (lots of white space and symbols) and gets only the last six values, rejoining them afterward (such as 50mins)
                let cooktime = $("td.time").text().trim();
                cooktime = cooktime.split("").slice(-6).join("");
                const link = this.state.urlToScrape;


                $(".ingredient-list li").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    if (ingredient !== "") {
                        ingredients.push(ingredient);
                    }
                });

                $(".directions-inner ol li").each((i, element) => {
                    const step = $(element).text().trim();
                    if (step !== "" && step !== "Submit a Correction") {
                        steps.push(step);
                    }
                });

                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }


                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator + " / Genius Kitchen",
                    creatorID: creatorID,
                    cooktime: cooktime,
                    ingredients: ingredients,
                    directions: steps,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Genius Kitchen",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        } else if (this.state.siteToScrape === "Serious Eats") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            console.log("url: " + this.state.urlToScrape);
            axios.get(proxyurl + this.state.urlToScrape).then(response => {

                const $ = cheerio.load(response.data);

                let ingredients = [];
                const steps = [];

                const recipeName = $(".recipe-title").text().trim();
                //For some reason, creator is a string with a duplicate value, so this regex gets rid of the duplicate
                let creator = $(".author-name").children(".name").text().trim();
                creator = creator.replace(/^(.+)\1+$/m, '$1');

                const creatorID = this.state.loggedInUserID;
                let description = $(".recipe-introduction-body").children("p").first().next().text().trim();

                if ($(".recipe-notes").children(".info").children("p").text().trim()) {
                    let notes = $(".recipe-notes").children(".info").children("p").text().trim();
                    description = description + " " + notes;
                }

                let cooktime = $(".recipe-about").children("li").first().next().next().children(".info").text().trim();
                const imageSrc = $(".se-pinit-image-container").children("img").attr("src");
                const link = this.state.urlToScrape;


                $(".ingredient").each((i, element) => {
                    const ingredient = $(element).text().trim();
                    if (ingredient !== "") {
                        ingredients.push(ingredient);
                    }
                });

                $(".recipe-procedure .recipe-procedure-text").each((i, element) => {
                    const step = $(element).text().trim();
                    if (step !== "") {
                        steps.push(step);
                    }
                });

                const ingObject = Object.assign({}, ingredients);
                let keys = Object.keys(ingObject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].replace(i, "ingredient" + i);
                    ingObject[key] = ingObject[keys[i]];
                    delete ingObject[i];
                }


                const scrapedRecipe = {
                    name: recipeName,
                    creator: "By " + creator + " / Serious Eats",
                    creatorID: creatorID,
                    cooktime: cooktime,
                    description: description,
                    ingredients: ingredients,
                    directions: steps,
                    imgLink: imageSrc,
                    tags: this.state.tagArray,
                    link: link,
                    otherSite: true,
                    source: "Serious Eats",
                    public: false
                };
                console.log(scrapedRecipe);
                if (this.state.loggedInUserID) {
                    API.saveRecipe(scrapedRecipe)
                        .then(dbRecipe => {
                            console.log(dbRecipe);
                            this.setState({failedScrape: false});
                            this.props.showAddModal(dbRecipe.data._id);
                            API.updateUserRecipes(this.state.loggedInUserID, dbRecipe.data._id)
                                .then(dbUser => {
                                    console.log(dbUser);
                                })
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Sorry");
                }

            }).catch(err => {
                console.log(err);
                this.setState({failedScrape: true});
            });
        }
    }

    render() {
        return (
            <Container className="mainContainer recipeFormContainer">
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
                                                <option className="defaultBlank" defaultValue=""></option>
                                                <option value disabled>--Choose a Site--</option>
                                                <option defaultValue="Food Network">Food Network</option>
                                                <option value="Epicurious">Epicurious</option>
                                                <option value="Allrecipes">Allrecipes</option>
                                                <option value="Genius Kitchen">Genius Kitchen</option>
                                                <option value="MyRecipes">MyRecipes</option>
                                                <option value="Yummly">Yummly</option>
                                                <option value="Simply Recipes">Simply Recipes</option>
                                                <option value="Serious Eats">Serious Eats</option>
                                                {/* <option value="Pinterest">Pinterest</option> */}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col size="md-5">
                                        <label className="control-label urlToScrapeLabel">URL:
                                        {/* If the URL cannot be scraped successfully, an "Oops" message appears next to the label. */}
                                        {this.state.failedScrape ? <span>&nbsp;&nbsp;&nbsp;Oops, try a different URL.</span> : ""}</label>
                                        <input className="form-control urlToScrape" value={this.state.url} onChange={this.handleURLChange} />
                                    </Col>
                                    <Col size="md-3">
                                    {this.state.siteToScrape && this.state.urlToScrape ? 
                                        <button className="btn submitURL" onClick={this.handleURLSubmit}>Submit</button>
                                        :
                                        <button disabled className="btn submitURL" onClick={this.handleURLSubmit}>Submit</button>}
                                    </Col>

                                </Row>
                            </form>
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
                                {this.state.tagBtnArray}
                            </div>
                        </Col>

                    </Row>
                    <br />
                    <div className="form-group">
                        <Row>
                            <Col size="md-4" id="firstFields">
                                <label>Name of Recipe:</label>
                                <input className="form-control recipeNameField" value={this.state.recipeName} onChange={this.handleRecipeNameChange} autoComplete="off" />
                                <br />
                                <label>Your Name:</label>
                                <input className="form-control nameField" value={this.state.name} onChange={this.handleNameChange} autoComplete="off" />
                                <br />
                                <label>Total Time:</label>
                                <input className="form-control cooktimeField" value={this.state.cooktime} onChange={this.handleCooktimeChange} autoComplete="off" />
                                <br />
                                <label>Description:</label>
                                <textarea className="form-control descriptionField" rows="3" value={this.state.description} onChange={this.handleDescriptionChange} autoComplete="off" />
                                <br />
                                <label>Have an image? Copy its URL below:</label>
                                <input className="form-control imgLinkField" value={this.state.imgLink} onChange={this.handleImgLinkChange} autoComplete="off" />
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
                            <Col size="md-2 sm-3" id="recipeSubmitCol">
                                <button className="btn recipeSubmit" onClick={this.handleSubmit}>Submit</button>
                            </Col>
                            <Col size="md-5 sm-6" id="publicPrivateCol">
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
                <AddModal userID={this.state.loggedInUserID} addedRecipe={this.props.addedRecipe} show={this.props.addModal} closeModal={this.props.closeModal} />
            </Container >
        );
    };
}

export default RecipeForm;
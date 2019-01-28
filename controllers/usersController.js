const db = require("../models");

// Defining methods for the recipesController
module.exports = {
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {
    db.User
      .findOne({ name: req.params.userName, password: req.params.pwd })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findID: function (req, res) {
    console.log("ID: " + req.params.id);
    db.User
      .findById(req.params.id).populate("recipes")
      .then(dbModel => {
        console.log("Hello");
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => {
        console.log("Goodbye");
        console.log(err);
        res.status(422).json(err)
      });
  },
  search: function (req, res) {
    console.log("ID: " + req.params.userID);
    console.log("Search Terms: " + req.params.searchTerms);
    db.User
      .findById(req.params.userID)
      .then(dbModel => {
        console.log("Is this working?");
        console.log(dbModel);
        db.Recipe
          .find(
            { $text: { $search: req.params.searchTerms } },
            { score: { $meta: "textScore" } }
          ).sort({ score: { $meta: "textScore" } })
          .then(dbRecipes => {
            console.log(dbRecipes);
            const matchRecipes = [];
            for (i = 0; i < dbRecipes.length; i++) {
              if (dbModel.recipes.indexOf(dbRecipes[i]._id) > -1) {
                matchRecipes.push(dbRecipes[i]);
              }
            }
            res.json(matchRecipes);
          })
      })
      .catch(err => {
        console.log("Goodbye");
        console.log(err);
        res.status(422).json(err)
      });
  },
  tagSearch: function (req, res) {
    console.log("ID: " + req.params.userID);
    console.log("Tag: " + req.params.tag);
    db.User
      .findById(req.params.userID)
      .then(dbModel => {
        console.log("Is this working?");
        console.log(dbModel);
        db.Recipe
          .find({ tags: req.params.tag })
          .sort({ dateSaved: -1 })
          .then(dbRecipes => {
            console.log(dbRecipes);
            const matchRecipes = [];
            for (i = 0; i < dbRecipes.length; i++) {
              if (dbModel.recipes.indexOf(dbRecipes[i]._id) > -1) {
                matchRecipes.push(dbRecipes[i]);
              }
            }
            res.json(matchRecipes);
          })
      })
      .catch(err => {
        console.log("Goodbye");
        console.log(err);
        res.status(422).json(err)
      });
  },
  findOneAndUpdate: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.userID }, { $addToSet: { recipes: req.params.recipeID } }, { new: true })
      .then(dbModel => {
        console.log("Yesssssssssssssssssssssss");
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeFromArray: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.userID }, { $pull: { recipes: req.params.recipeID } }, { new: true })
      .then(dbModel => {
        console.log("Noooooooooooooooooooo");
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findOne({ id: req.params.id })
      .then(dbModel => {
        dbModel.remove()
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  privateTagProportions: function (req, res) {
    const tagArray = ["Asian", "Appetizer", "Baked Goods", "BBQ", "Beans", "Beef", "Bread", "Breakfast", "Brunch", "Cake", "Casserole", "Cheese", "Chicken", "Chocolate", "Cookie", "Dessert", "Drinks", "Eggs", "Fish", "Fruit", "Gluten-Free", "Holiday", "Lamb", "Meat", "Mediterranean", "Mexican", "Pasta", "Pastry", "Pizza", "Pork", "Potato", "Poultry", "Rice", "Salad", "Sandwich", "Seafood", "Side Dish", "Soup", "Vegan", "Vegetarian"];
    const proportionArray = [];
    let arrayOfTags = [];

    const recursiveTagLoop = (recipes, num1) => {
      console.log("Hello!");
      console.log(proportionArray);
      //Loops through each id in the recipes array
      if (num1 < recipes.length) {
        db.Recipe
          .find({ _id: recipes[num1] })
          .then(dbModel2 => {
            console.log(dbModel2[0].tags);
            //Adds together the tag array of each recipe
            arrayOfTags = arrayOfTags.concat(dbModel2[0].tags);
            num1++;
            //Function calls itself again after increasing its iterator
            recursiveTagLoop(recipes, num1);

          })
          .catch(err => res.status(422).json(err))
          //Once we have an array of all the user's tags
      } else {
        console.log(arrayOfTags);
        //Loops through all the available tags
        for (var i = 0; i < tagArray.length; i++) {
          //If an individual tag is not among the user's tags, it adds 0 to the proportionArray
          if (arrayOfTags.indexOf(tagArray[i]) === -1) {
            proportionArray.push(0);
          } else {
            //If it is found, we find out how many times each tag was used by the user and push that to the proportionArray
            let count = 0;
            for (var j = 0; j < arrayOfTags.length; j++) {
              if (arrayOfTags[j] === tagArray[i]) {
                count++;
              }
              if (j === arrayOfTags.length - 1) {
                proportionArray.push(count);
              }
            }
          }
        }
        console.log(proportionArray);
        //setTimeout(function(){
        res.json(proportionArray);
        //}, 2000); 
      }
    }

    //Finds current user and loops through their tags
    db.User
      .findById(req.params.userID)
      .then(dbModel => {
        console.log("Is this working?");
        console.log(dbModel);
        console.log("UserID: " + req.params.userID);

        recursiveTagLoop(dbModel.recipes, 0);

      })



  }
};
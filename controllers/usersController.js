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
  }
};
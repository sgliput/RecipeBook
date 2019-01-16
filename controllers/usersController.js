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
      .findOne({ password: req.params.id })
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
  findOneAndUpdate: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.userID }, { $push: { recipes: req.params.recipeID } }, { new: true })
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
      .findOneAndUpdate({_id: req.params.userID }, { $pull: { recipes: req.params.recipeID }}, { new: true })
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
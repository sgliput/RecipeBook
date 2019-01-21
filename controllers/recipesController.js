const db = require("../models");


// Defining methods for the recipesController
module.exports = {
  findAll: function (req, res) {
    db.Recipe
      .find({ public: true })
      .sort({ dateSaved: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Recipe
      .findOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Recipe
      .create(req.body)
      .then(dbModel => {
        console.log(req.body);
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Recipe
      .findByIdAndRemove(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  search: function (req, res) {
    console.log("Search Terms: ")
    console.log(req.params.searchTerms);
    db.Recipe
      .find(
        { public: true, $text: { $search: req.params.searchTerms } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  tagSearch: function (req, res) {
    console.log("Tag: " + req.params.tag);
    db.Recipe
      .find({ public: true, tags: req.params.tag })
      .sort({ dateSaved: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
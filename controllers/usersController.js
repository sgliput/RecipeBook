const db = require("../models");

// Defining methods for the recipesController
module.exports = {
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => {
        console.log(req.body);
        console.log(dbModel);
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    db.User
      .findOne({password: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findOne({id: req.params.id})
      .then(dbModel => {
        dbModel.remove()})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
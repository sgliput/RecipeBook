const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const db = require("../../models");

findID = function (req, res) {
  console.log("ID: " + req.params.id);
  db.User
    //.findOne({_id: req.params.id}).populate("recipes")
    .findOne({ _id: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}

// Matches with "/api/users"
router.route("/")
  //.get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findOne)
  .put(usersController.update)
  .delete(usersController.remove);

router
  .route("/:userID/:recipeID")
  .get(usersController.findOneAndUpdate);

router
  .route("/userRecipes/:id")
  .post(usersController.findID);

module.exports = router;
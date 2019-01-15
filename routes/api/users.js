const router = require("express").Router();
const usersController = require("../../controllers/usersController");

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
  .get(usersController.findOneAndUpdate)
  .delete(usersController.removeFromArray);

router
  .route("/userRecipes/:id")
  .post(usersController.findID);

module.exports = router;
const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  //.get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/user/:id")
  .get(usersController.findOne)
  .put(usersController.update)
  .delete(usersController.remove);



router
  .route("/update/:userID/recipe/:recipeID")
  .get(usersController.findOneAndUpdate)
  .delete(usersController.removeFromArray);

router
  .route("/userRecipes/:id")
  .get(usersController.findID);

  router
    .route("users/:userID/recipes/:recipeID")


module.exports = router;
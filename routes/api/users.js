const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  //.get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/user/:id")
  .put(usersController.update)
  .delete(usersController.remove);

router
  .route("/userLogin/:userName/:pwd")
  .get(usersController.findOne)

router
  .route("/update/:userID/recipe/:recipeID")
  .get(usersController.findOneAndUpdate)
  .delete(usersController.removeFromArray);

router
  .route("/userRecipes/:id")
  .get(usersController.findID);

router
  .route("/userSearch/:userID/search/:searchTerms")
  .get(usersController.search);

router
  .route("/privateTagSearch/:userID/search/:tag")
  .get(usersController.tagSearch);

router
  .route("/privateTagProportions/:userID")
  .get(usersController.privateTagProportions);

module.exports = router;
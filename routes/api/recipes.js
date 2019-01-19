const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipes"
router.route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

// Matches with "/api/recipes/:id"
router
  .route("/find/:id")
  .get(recipesController.findById)

router
  .route("/update/:id")
  .put(recipesController.update);
  
router
  .route("/delete/:id")
  .delete(recipesController.remove);

router
  .route("/search/:searchTerms")
  .get(recipesController.search);

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  //id: { type: String, required: true, unique: true },
  creator: String,
  description: String,
  ingredients: Object,
  directions: Object,
  cooktime: String,
  tags: Array,
  dateSaved: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
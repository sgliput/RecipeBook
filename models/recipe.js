const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  //id: { type: String, required: true, unique: true },
  creator: String,
  creatorID: String,
  description: String,
  ingredients: Object,
  directions: Object,
  cooktime: String,
  tags: Array,
  otherSite: {type: Boolean, default: false},
  link: String,
  source: String,
  dateSaved: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
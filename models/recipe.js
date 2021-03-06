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
  imgLink: String,
  public: {type: Boolean, default: true},
  edited: {type: Boolean, default: false},
  deleted: {type: Boolean, default: false},
  otherSite: {type: Boolean, default: false},
  link: String,
  source: String,
  dateSaved: { type: Date, default: Date.now }
});

recipeSchema.index( { "$**": "text" } );

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
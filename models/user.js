const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    city: String,
    dateSaved: { type: Date, default: Date.now },
    recipes: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the recipe model
            ref: "recipe"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
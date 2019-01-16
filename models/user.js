const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, unique: false },
    password: { type: String, required: true, unique: false },
    state: { type: String, required: true },
    email: { type: String, required: true },
    dateSaved: { type: Date, default: Date.now },
    recipes: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the recipe model
            ref: "Recipe"
        }
    ]
});

userSchema.index({ name: 1, password: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
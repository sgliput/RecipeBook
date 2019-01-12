import axios from "axios";

export default {
  //Gets Google Book or Books with an API URL
  // getGoogleBook: function(URL) {
  //   return axios.get(URL);
  // },

  // Gets all recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets the recipe with the given id
  getRecipe: function(id) {
    return axios.get("/api/recipes/" + id);
  },
  // Deletes the recipe with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },


getUser: function(password) {
    return axios.get("/api/users/" + password);
  },
  getSpecUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  saveUser: function(newUser) {
    return axios.post("/api/users", newUser);
  },
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
};
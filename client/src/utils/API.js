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
    return axios.get("/api/recipes/find/" + id);
  },
  getPrivateRecipes: function(id) {
    return axios.get("/api/recipes", id);
  },
  // Deletes the recipe with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/delete/" + id);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  updateRecipe: function(id, recipeData) {
    return axios.put("/api/recipes/update/" + id, recipeData);
  },
  searchRecipes: function(searchTerms) {
    return axios.get("/api/recipes/search/" + searchTerms)
  },
  searchRecipesByTag: function(tag) {
    return axios.get("/api/recipes/tagSearch/" + tag)
  },


getUser: function(userName, password) {
    return axios.get("/api/users/userLogin/" + userName + "/" + password);
  },
  getUserByID: function(id) {
    return axios.get("/api/users/userRecipes/" + id);
  },
  updateUserRecipes: function(userID, recipeID) {
    return axios.get("/api/users/update/" + userID + "/recipe/" + recipeID);
  },
  deleteUserRecipe: function(userID, recipeID) {
    return axios.delete("/api/users/update/" + userID + "/recipe/" + recipeID);
  },
  saveUser: function(newUser) {
    return axios.post("/api/users", newUser);
  },
  deleteUser: function(id) {
    return axios.delete("/api/users/user/" + id);
  },
  searchPrivateRecipes: function(id, searchTerms) {
    return axios.get("/api/users/userSearch/" + id + "/search/" + searchTerms);
  },
  searchPrivateRecipesByTag: function(id, tag) {
    return axios.get("/api/users/privateTagSearch/" + id + "/search/" + tag);
  }
};
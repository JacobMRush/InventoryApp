const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({category: String, category_description: String});

Category.virtual("url").get(function() {
    return "/category" + this._id;
})

module.exports = mongoose.model("Category", Category);
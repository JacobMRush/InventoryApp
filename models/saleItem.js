const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Category = new Schema({category: String, category_description: String});

Category.virtual("url").get(function() {
    return "/category" + this._id;
});

const Item = new Schema({
    item_name: {type: String, required: true, maxLength: 150},
    item_description: {type: String, required: true, maxLength: 300},
    item_categories: [Category], // genre
    price: {type: Number, min: 10.00},
    number_in_stock: {type: Number, required: true, min: 0},
    item_publisher: {type: String, required: true},
    item_author: {type: String, required: true},
});

Item.virtual("url").get(function() {
    return "/manga/" + this._id;
})


module.exports = mongoose.model("Item", Item);
module.exports = mongoose.model("Category", Category);
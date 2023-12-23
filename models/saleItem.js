const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Item = new Schema({
    item_name: {type: String, required: true, maxLength: 150},
    item_description: {type: String, required: true, maxLength: 300},
    item_categories: [
        {
            category: String,
        }
    ],
    price: {type: Number, min: 10.00},
    number_in_stock: {type: Number, required: true, min: 0},
    item_publisher: {type: String, required: true},
    item_author: {type: String, required: true},
    item_picture_path: {type: String, required: true},
});


module.exports = mongoose.model("Item", Item);
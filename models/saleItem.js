const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Item = new Schema({
    item_name: {type: String, required: true, maxLength: 150},
    item_description: {type: String, required: true, maxLength: 300},
    //category - genre - publisher?
    //price
    //number in stock
    //"URL" ?
});


module.exports = mongoose.model("Item", Item);
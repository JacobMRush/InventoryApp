const mongoose = require('mongoose');
import Item from "../models/saleItem";

//get all items in the list sorted by publisher
exports.manga_list = function(req,res,next) { //used
    Item.find({item_title: {$ne: null}, item_publisher: {$ne: null}})
    .sort({item_publisher: 1})
    .exec((err, manga) => {
        if(err) return next(err);
        res.json(manga);
    });
}
//get a single item's details
exports.manga_details = function(req,res,next) { //used
    let mangaID = req.params.id;
    Item.findById(mangaID, (err,doc) => {
        if(err) console.log(err);
            res.json(doc);
    })
};
//get items based on category
exports.manga_category = function(req,res,next) {  //used
    let selectedCategory = req.params.category;
    Item.find({item_categories: {$elemMatch: {category: selectedCategory}}}, (err, docs) => {
        if(err) console.log(err);
        res.json(docs);
    });
}

//create item
exports.manga_create = function(req,res,next) { //used
    //create a new item via request body details?
    let itemdetails = req.body;
    let citem = new Item({item_name, item_description, item_categories, price, number_in_stock, item_publisher, item_author});
    citem.save();
};
//update item
exports.manga_update = function(req,res,next) {
    let mangaID = req.params.id;
    Item.findOneAndUpdate();

    //find item to update
    //change and update fields that are sent to us
    //create field/object if it does not already exist
};

//delete item
exports.manga_delete = function(req,res,next) {
    let mangaID = req.params.id;
    Item.findOneAndDelete()
};

exports.manga_replace = function(req,res,next) {
    let mangaID = req.params.id;
    Item.findOneAndReplace()
};

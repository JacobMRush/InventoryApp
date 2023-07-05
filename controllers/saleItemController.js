const mongoose = require('mongoose');
import Item from "../models/saleItem";

//get all items in the list sorted by publisher
exports.manga_list = function(req,res,next) {
    Item.find({item_title: {$ne: null}, item_publisher: {$ne: null}})
    .sort({item_publisher: 1})
    .exec((err, manga) => {
        if(err) return next(err);
        res.json(manga);
    });
}
//get a single item's details
exports.manga_details = function(req,res,next) {
    Item.findOne()
};

//create item
exports.manga_create = function(req,res,next) {
    Item.create();
};
//update item
exports.manga_update = function(req,res,next) {
    Item.findOneAndUpdate();
    //find item to update
    //change and update fields that are sent to us
    //create field/object if it does not already exist
};

//delete item
exports.manga_delete = function(req,res,next) {
    Item.findOneAndDelete()
};

exports.manga_replace = function(req,res,next) {
//replace item
    //delete item
    //create new one
    Item.findOneAndReplace()
};

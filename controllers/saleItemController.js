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
    //by url
    Item.findOne()
};
//get items based on category
exports.manga_category = function(req,res,next) {
    //by url - /category/${cat}
    let category = req.params.category;
    Item.find();
}

//create item
exports.manga_create = function(req,res,next) {
    //create a new item via request body details?
    let citem = new Item({item_name, item_description, item_categories, price, number_in_stock, item_publisher, item_author});
    
    citem.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log("New Item: " + citem);
      MangaItems.push(citem);
      cb(null, citem);
    });
};
//update item
exports.manga_update = function(req,res,next) {
    let mangaID = req.params._id;
    Item.findOneAndUpdate();

    //find item to update
    //change and update fields that are sent to us
    //create field/object if it does not already exist
};

//delete item
exports.manga_delete = function(req,res,next) {
    let mangaID = req.params._id;
    Item.findOneAndDelete()
};

exports.manga_replace = function(req,res,next) {
    let mangaID = req.params._id;
    Item.findOneAndReplace()
};
